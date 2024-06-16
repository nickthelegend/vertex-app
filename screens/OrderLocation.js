import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';

const GOOGLE_MAPS_APIKEY = 'AIzaSyACn5LbHpFrDZrJ9pkg1OLc4EkntvcmNsA'; // replace with your API key

export default function OrderLocation({ route }) {
  const { deliveryLocation } = route.params;
  const navigation = useNavigation();
  const [origin, setOrigin] = useState(null);
  const [region, setRegion] = useState({
    latitude: 17.493504,
    longitude: 78.391198,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  useEffect(() => {
    let locationSubscription;

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setOrigin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000, // Update every 5 seconds
          distanceInterval: 10, // Update every 10 meters
        },
        (newLocation) => {
          setOrigin({
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude
          });
          setRegion({
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        }
      );
    })();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Order Location</Text>
        <View></View>
      </View>
      
      {origin && (
        <MapView 
          style={styles.map}
          region={region}
          rotateEnabled={false} // Disabling map rotation
        >
          <Marker coordinate={origin} title={"Origin"}>
            <Image source={require('../assets/delivery-boy.png')} style={{width: 30, height: 30}} />
          </Marker>
          <Marker coordinate={deliveryLocation} title={"Destination"}>
            <Image source={require('../assets/map_marker.png')} style={{width: 30, height: 30}} />
          </Marker>
          <MapViewDirections
            origin={origin}
            destination={deliveryLocation}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="#1c40bd"
          />
        </MapView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
    justifyContent: "space-between",
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 25,
    fontFamily: "ComfortaaBold",
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  marker: {
    width: 30,
    height: 30,
  },
});
