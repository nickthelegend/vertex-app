import React, { useRef, useState,useEffect } from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, Image, Text, Dimensions,Platform } from "react-native";
import { Marker, Callout } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Animated } from 'react-native';
import { markers,hostelMarker,healthMarker } from "../model/mapData";
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
  {
    featureType: "administrative",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels",
    stylers: [
      {
        visibility: "simplified",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels",

    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "water",
    stylers: [
      {
        color: "#84afa3",
      },
      {
        lightness: 52,
      },
    ],
  },
  {
    stylers: [
      {
        saturation: -17,
      },
      {
        gamma: 0.36,
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        color: "#3f518c",
      },
    ],
  },
];



// const allMarkers = [...markers,...healthMarker,...hostelMarker]

const getImageForMarker = (marker) => {
  if (marker.hasOwnProperty("shortCut")) {
    switch (true) {
      case marker.shortCut.includes("Health Care Center"):
        return require("../assets/map_health_marker.png");
      case marker.shortCut.includes("Hostel"):
        return require("../assets/map_hostel_marker.png");
      // Add more cases for other marker types as needed
      default:
        return require("../assets/map_marker.png"); // Default marker image
    }
  } else {
    return require("../assets/map_marker.png"); // Default marker image
  }
};
export default function UniversityMap() {

  const navigation = useNavigation()
  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);
  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= markers.length) {
        index = markers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if( mapIndex !== index ) {
          mapIndex = index;
          const { coordinate } = markers[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: 0.00080, // or any smaller value
longitudeDelta: 0.00080, // or any smaller value
            },
            1000
          );
        }
      }, 500);
    });
  });

  const interpolations = markers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      ((index + 1) * CARD_WIDTH),
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp"
    });

    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = (markerID * CARD_WIDTH) + (markerID * 20); 
    if (Platform.OS === 'ios') {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({x: x, y: 0, animated: true});
  }

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  // const mapRef = useRef(null);
  const [region, setRegion] = useState({
    latitude: 17.493504, // Center point within your boundaries
    longitude: 78.391198, // Center point within your boundaries
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const onRegionChangeComplete = async (newRegion) => {
    const adjustedRegion = {
      ...newRegion,
      latitudeDelta: Math.min(newRegion.latitudeDelta, maxLatitudeDelta),
      longitudeDelta: Math.min(newRegion.longitudeDelta, maxLongitudeDelta),
    };

    setRegion(adjustedRegion);

    try {
      const boundaries = await _map.current.getMapBoundaries();
      // Perform any checks or logic here if needed with the boundaries

      await _map.current.setMapBoundaries(northEast, southWest);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          // paddingBottom: 10,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          padding: 15,
          borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
          // justifyContent: "space-between",

        }}
      >
        <TouchableOpacity onPress={()=>{navigation.goBack()}}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>

        <View style={{alignItems:"center",flex:1}}>
        <Text
          style={{
            fontSize: 10 * 2.5,
            marginLeft: 10,
            fontFamily: "ComfortaaBold",
          }}
        >
          University Map
        </Text>
        </View>
        
        {/* <TouchableOpacity
              style={{
                marginRight: 10 * 2,
              }}
            >
              <Image
                source={require("../assets/icons/search.png")}
                style={{
                  width: 24,
                  height: 24,
                  resizeMode: "contain",
                  tintColor: "black",
                }}
              />
            </TouchableOpacity> */}
      </View>
      <MapView
        ref={_map}
        style={styles.map}
        region={region}
        maxZoomLevel={35}
        onRegionChangeComplete={onRegionChangeComplete}
        customMapStyle={mapStyle}
        
      >
        {markers.map((marker, index) => (
  <Marker
    key={index}
    coordinate={marker.coordinate}
    title={marker.title}
    description={marker.description}
    onPress={(e)=>onMarkerPress(e)}
  >
    <Animated.View style={{ alignItems: "center" }}>
      <Animated.Image
        source={getImageForMarker(marker)}
        style={styles.marker}
      />
      <Text style={{ fontSize: 12, textAlign: "center" }}>{marker.shortCut}</Text>
    </Animated.View>
    {/* <Callout>
      <View style={styles.callout}>
        <Text style={styles.calloutTitle}>{marker.title}</Text>
        <Text>{marker.description}</Text>
      </View>
    </Callout> */}
  </Marker>


))}

        
      </MapView>
      <View style={styles.searchBox}>
        <TextInput 
          placeholder="Search here"
          placeholderTextColor="#000"
          autoCapitalize="none"
          style={{flex:1,padding:0}}
        />
        <Image
                source={require("../assets/icons/search.png")}
                style={{
                  width: 24,
                  height: 24,
                  resizeMode: "contain",
                  tintColor: "black",
                }}
              />
      </View>

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
          right: SPACING_FOR_CARD_INSET
        }}
        contentContainerStyle={{
          paddingHorizontal: Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                }
              },
            },
          ],
          {useNativeDriver: true}
        )}
      >
        {markers.map((marker, index) =>(
          <View style={styles.card} key={index}>
            <Image 
              source={marker.image}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>{marker.title}</Text>
              {/* <StarRating ratings={marker.rating} reviews={marker.reviews} /> */}
              <Text numberOfLines={1} style={styles.cardDescription}>{marker.description}</Text>
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => {}}
                  style={[styles.signIn, {
                    borderColor: '#FF6347',
                    borderWidth: 1
                  }]}
                >
                  <Text style={[styles.textSign, {
                    color: '#FF6347'
                  }]}>Order Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBox: {
    position:'absolute', 
    marginTop: 100, 
    flexDirection:"row",
    backgroundColor: '#fff',
    width: '90%',
    alignSelf:'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  callout: {
    width: 150,
    padding: 5,
  },
  calloutTitle: {
    fontWeight: "bold",
  },
  marker: {
    width: 30,
    height: 30,
    
  },
  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  endPadding: {
    paddingRight: width - CARD_WIDTH,
  },
  card: {
    // padding: 10,
    elevation: 2,
    backgroundColor: "#FFF",
    borderRadius:20,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 12,
    // marginTop: 5,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width:50,
    height:50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: 'center',
    marginTop: 5
  },
  signIn: {
      width: '100%',
      padding:5,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 3
  },
  textSign: {
      fontSize: 14,
      fontWeight: 'bold'
  }
});
