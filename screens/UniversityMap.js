import React, { useRef, useState, useEffect } from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, Image, Text, Dimensions, Platform, TextInput, TouchableOpacity } from "react-native";
import { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Animated } from 'react-native';
import { markers } from "../model/mapData";  // Assumes all markers (including hostelMarker and healthMarker) are combined in this array
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
const northEast = { latitude: 17.49617, longitude: 78.39486 };
const southWest = { latitude: 17.490222, longitude: 78.386944 };
const maxLatitudeDelta = 0.008;
const maxLongitudeDelta = 0.008;

const mapStyle = [
  // Map styles here
];

const getImageForMarker = (marker) => {
  if (marker.hasOwnProperty("shortCut")) {
    switch (true) {
      case marker.shortCut.includes("Health Care Center"):
        return require("../assets/map_health_marker.png");
      case marker.shortCut.includes("Hostel"):
        return require("../assets/map_hostel_marker.png");
      default:
        return require("../assets/map_marker.png");
    }
  } else {
    return require("../assets/map_marker.png");
  }
};

export default function UniversityMap() {
  const navigation = useNavigation();
  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);
  
  const [searchInput, setSearchInput] = useState("");
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [region, setRegion] = useState({
    latitude: 17.493504,
    longitude: 78.391198,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const interpolations = filteredMarkers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 2, 1],  // Increase the scale to 2 for the selected marker
      extrapolate: "clamp",
    });

    return { scale };
  });

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      if (index >= filteredMarkers.length) {
        index = filteredMarkers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordinate } = filteredMarkers[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: 0.00080,
              longitudeDelta: 0.00080,
            },
            1000
          );
        }
      }, 500);
    });
  }, [filteredMarkers]);

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;
    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }
    _scrollView.current.scrollTo({ x, y: 0, animated: true });
  };

  const _map = useRef(null);
  const _scrollView = useRef(null);

  const onRegionChangeComplete = async (newRegion) => {
    const adjustedRegion = {
      ...newRegion,
      latitudeDelta: Math.min(newRegion.latitudeDelta, maxLatitudeDelta),
      longitudeDelta: Math.min(newRegion.longitudeDelta, maxLongitudeDelta),
    };
    setRegion(adjustedRegion);
    try {
      const boundaries = await _map.current.getMapBoundaries();
      await _map.current.setMapBoundaries(northEast, southWest);
    } catch (error) {
      console.error(error);
    }
  };

  const onMapReady = async () => {
    try {
      if (_map.current) {
        await _map.current.setMapBoundaries(northEast, southWest);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (text) => {
    setSearchInput(text);
    const results = markers.filter(marker =>
      marker.title.toLowerCase().includes(text.toLowerCase()) ||
      marker.description.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredMarkers(results);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <View style={{ alignItems: "center", flex: 1 }}>
          <Text style={styles.headerTitle}>University Map</Text>
        </View>
      </View>
      <MapView
        ref={_map}
        style={styles.map}
        region={region}
        maxZoomLevel={35}
        onRegionChangeComplete={onRegionChangeComplete}
        customMapStyle={mapStyle}
        onMapReady={onMapReady}
        showsUserLocation={true}
      >
        {filteredMarkers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
            onPress={(e) => onMarkerPress(e)}
          >
            <Animated.View style={{ alignItems: "center" }}>
              <Animated.Image
                source={getImageForMarker(marker)}
                style={[styles.marker, { transform: [{ scale: interpolations[index].scale }] }]}
              />
              <Text style={styles.markerText}>{marker.shortCut}</Text>
            </Animated.View>
          </Marker>
        ))}
      </MapView>
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search here"
          placeholderTextColor="#000"
          autoCapitalize="none"
          style={{ flex: 1, padding: 0 }}
          value={searchInput}
          onChangeText={handleSearch}
        />
        <Image
          source={require("../assets/icons/search.png")}
          style={styles.searchIcon}
        />
      </View>
      {filteredMarkers.length > 0 && (
        <Animated.ScrollView
          ref={_scrollView}
          horizontal
          pagingEnabled
          scrollEventThrottle={1}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 20}
          snapToAlignment="center"
          style={styles.scrollView}
          contentInset={{
            top: 0,
            left: SPACING_FOR_CARD_INSET,
            bottom: 0,
            right: SPACING_FOR_CARD_INSET,
          }}
          contentContainerStyle={{
            paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: mapAnimation } } }],
            { useNativeDriver: true }
          )}
        >
          {filteredMarkers.map((marker, index) => (
            <View style={styles.card} key={index}>
              <Image
                source={marker.image}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardTitle}>{marker.title}</Text>
                <Text numberOfLines={1} style={styles.cardDescription}>{marker.description}</Text>
                <View style={styles.button}>
                  <TouchableOpacity
                    onPress={() => {}}
                    style={[styles.signIn, { borderColor: '#FF6347', borderWidth: 1 }]}
                  >
                    <Text style={[styles.textSign, { color: '#FF6347' }]}>Order Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </Animated.ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  headerTitle: {
    fontSize: 25,
    marginLeft: 10,
    fontFamily: "ComfortaaBold",
  },
  map: { width: "100%", height: "100%" },
  marker: { width: 30, height: 30 },
  markerText: { fontSize: 12, textAlign: "center" },
  searchBox: {
    position: 'absolute',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    flexDirection: "row",
    backgroundColor: '#fff',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  searchIcon: { width: 20, height: 20 },
  scrollView: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  card: {
    elevation: 2,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: 'hidden',
  },
  cardImage: { flex: 3, width: '100%', height: '100%', alignSelf: 'center' },
  textContent: { flex: 2, padding: 10 },
  cardTitle: { fontSize: 12, marginTop: 5, fontWeight: 'bold' },
  cardDescription: { fontSize: 12, color: '#444' },
  button: { alignItems: 'center', marginTop: 5 },
  signIn: { width: '100%', padding: 5, justifyContent: 'center', alignItems: 'center', borderRadius: 3 },
  textSign: { fontSize: 14, fontWeight: 'bold' },
});
