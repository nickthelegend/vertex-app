import React, { useRef, useState, useEffect } from "react";
import MapView from "react-native-maps";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  Platform,
} from "react-native";
import { Marker, Callout } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Animated } from "react-native";
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

const markers = [
  {
    coordinate: {
      latitude: 17.493151222175904,
      longitude: 78.39227845034713,
    },
    title: "Computer Science Department",
    shortCut: "CSE",
    description: "This is Our Department",
  },
  {
    coordinate: {
      latitude: 17.491934965193217,
      longitude: 78.39155620052485,
    },
    title: "Auditorium",
    shortCut: "Auditorium",
    description: "This is a Auditorium",
  },
  {
    coordinate: {
      latitude: 17.493072520469138,
      longitude: 78.39123143495418,
    },
    title: "Classroom Complex",
    shortCut: "CRC",
    description: "This is classroom for all the first years",
  },
  {
    coordinate: {
      latitude: 17.494827055645057,
      longitude: 78.39035603931258,
    },
    title: "Civil Department",
    shortCut: "Civil",
    description: "This is Civil Department",
  },
  {
    coordinate: {
      latitude: 17.49444038944259,
      longitude: 78.39116207230877,
    },
    title: "Mechanical Department",
    shortCut: "Mechanical Department",
    description: "This is Mechanical Department",
  },
  {
    coordinate: {
      latitude: 17.493648919184682,
      longitude: 78.39239755800763,
    },
    title: "Electrical and Electronics Communication Department",
    shortCut: "ECE",
    description: "This is ECE Department",
  },
  {
    coordinate: {
      latitude: 17.494645205773796,
      longitude: 78.39221232141526,
    },
    title: "School of Information Technology",
    shortCut: "SIT",
    description: "This is School of Information Technology",
  },
  {
    coordinate: {
      latitude: 17.49548793324025,
      longitude: 78.39137668305989,
    },
    title: "Library",
    shortCut: "Library",
    description: "This is Library",
  },
  {
    coordinate: {
      latitude: 17.49643943695675,
      longitude: 78.39245290193816,
    },
    title: "Administration Department",
    shortCut: "Administration Department",
    description: "This is Administartion Department",
  },
  {
    coordinate: {
      latitude: 17.495842240036183,
      longitude: 78.39173944110695,
    },
    title: "Metalurgy",
    shortCut: "Metalurgy",
    description: "This is Metalurgy Department",
  },
  {
    coordinate: {
      latitude: 17.495982456319314,
      longitude: 78.39220224592374,
    },
    title: "Examination Branch",
    shortCut: "Examination Branch",
    description: "This is Examination Branch",
  },
  {
    coordinate: {
      latitude: 17.495804488013018,
      longitude: 78.39331284907593,
    },
    title: "UGC",
    shortCut: "UGC",
    description: "This is UGC",
  },
  {
    coordinate: {
      latitude: 17.495147437680277,
      longitude: 78.39117747987686,
    },
    title: "EEE",
    shortCut: "EEE",
    description: "This is EEE Department",
  },
  {
    coordinate: {
      latitude: 17.4936196040711,
      longitude: 78.3931051692599,
    },
    title: "JHUB",
    shortCut: "JHUB",
    description: "This is JHUB",
  },
];

const healthMarker = [
  {
    coordinate: {
      latitude: 17.491595492579705,
      longitude: 78.39096090442793,
    },
    title: "JNTU Health Care Center",
    shortCut: "Health Care Center",
    description: "This is JNTU Healthcare center",
  },
];
const hostelMarker = [
  {
    coordinate: {
      latitude: 17.49175821828631,
      longitude: 78.38850247961263,
    },
    title: "Gowthami Boys Hostel",
    shortCut: "Gowthami Boys Hostel",
    description: "This is Gowthami Boys Hostel",
  },

  {
    coordinate: {
      latitude: 17.491196318907352,
      longitude: 78.38820862861242,
    },
    title: "Manjeera Boys Hostel",
    shortCut: "Manjeera Boys Hostel",
    description: "This is Manjeera Boys Hostel",
  },
  {
    coordinate: {
      latitude: 17.49037770592337,
      longitude: 78.38836526014047,
    },
    title: "Kinnera Boys Hostel",
    shortCut: "Kinnera Boys Hostel",
    description: "This is Kinnera Boys Hostel",
  },
  {
    coordinate: {
      latitude: 17.49019288986208,
      longitude: 78.38935324767853,
    },
    title: "International Students Hostel",
    shortCut: "International Students Hostel",
    description: "This is International Students Hostel",
  },
  {
    coordinate: {
      latitude: 17.48992200043257,
      longitude: 78.38963067891845,
    },
    title: "RSQ2 Hostel",
    shortCut: "RSQ2 Hostel",
    description: "This is RSQ2 Hostel",
  },
  {
    coordinate: {
      latitude: 17.494861459228897,
      longitude: 78.39365736880102,
    },
    title: "Kamala & Gayathri Girls Hostel",
    shortCut: "Kamala & Gayathri Girls Hostel",
    description: "This is Kamala & Gayathri Girls Hostel",
  },
];

const allMarkers = [...markers, ...healthMarker, ...hostelMarker];

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
  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);
  useEffect(async () => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= allMarkers.length) {
        index = allMarkers.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordinate } = allMarkers[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: 0.0008, // or any smaller value
              longitudeDelta: 0.0008, // or any smaller value
            },
            350
          );
        }
      }, 10);
    });
  });

  const interpolations = allMarkers.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp",
    });

    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === "ios") {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  };

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  const mapRef = useRef(null);
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
      const boundaries = await mapRef.current.getMapBoundaries();
      // Perform any checks or logic here if needed with the boundaries

      await mapRef.current.setMapBoundaries(northEast, southWest);
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
          paddingBottom: 10,
          borderBottomLeftRadius: 40,
          borderBottomRightRadius: 40,
          // justifyContent: "space-between",
        }}
      >
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 10 * 2.5,
            marginLeft: 10,
            fontFamily: "ComfortaaBold",
          }}
        >
          University Map
        </Text>
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
        {allMarkers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          >
            <Animated.View style={{ alignItems: "center" }}>
              <Animated.Image
                source={getImageForMarker(marker)}
                style={styles.marker}
              />
              <Text style={{ fontSize: 12, textAlign: "center" }}>
                {marker.shortCut}
              </Text>
            </Animated.View>
            <Callout>
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>{marker.title}</Text>
                <Text>{marker.description}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search here"
          placeholderTextColor="#000"
          autoCapitalize="none"
          style={{ flex: 1, padding: 0 }}
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
          right: SPACING_FOR_CARD_INSET,
        }}
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === "android" ? SPACING_FOR_CARD_INSET : 0,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        {allMarkers.map((marker, index) => (
          <View style={styles.card} key={index}>
            <Image
              source={marker.image}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>
                {marker.title}
              </Text>
              {/* <StarRating ratings={marker.rating} reviews={marker.reviews} /> */}
              <Text numberOfLines={1} style={styles.cardDescription}>
                {marker.description}
              </Text>
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => {}}
                  style={[
                    styles.signIn,
                    {
                      borderColor: "#FF6347",
                      borderWidth: 1,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: "#FF6347",
                      },
                    ]}
                  >
                    Order Now
                  </Text>
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
    position: "absolute",
    marginTop: 100,
    flexDirection: "row",
    backgroundColor: "#fff",
    width: "90%",
    alignSelf: "center",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#ccc",
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
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
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
    width: 50,
    height: 50,
  },
  marker: {
    width: 30,
    height: 30,
  },
  button: {
    alignItems: "center",
    marginTop: 5,
  },
  signIn: {
    width: "100%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  textSign: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
