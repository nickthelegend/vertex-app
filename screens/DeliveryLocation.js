import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function DeliveryLocation({ navigation }) {
  const northEast = { latitude: 17.49617, longitude: 78.39486 };
  const southWest = { latitude: 17.490222, longitude: 78.386944 };

  const [region, setRegion] = useState({
    latitude: 17.493504, // Center point within your boundaries
    longitude: 78.391198, // Center point within your boundaries
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const mapRef = useRef(null);

  const onRegionChangeComplete = async (newRegion) => {
    const maxLatitudeDelta = 0.01;
    const maxLongitudeDelta = 0.01;
    
    const adjustedRegion = {
      ...newRegion,
      latitudeDelta: Math.min(newRegion.latitudeDelta, maxLatitudeDelta),
      longitudeDelta: Math.min(newRegion.longitudeDelta, maxLongitudeDelta),
    };

    setRegion(adjustedRegion);

    try {
      const boundaries = await mapRef.current.getMapBoundaries();
      await mapRef.current.setMapBoundaries(northEast, southWest);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmLocation = () => {
    console.log('Selected coordinates:', region.latitude, region.longitude);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        ...region,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Select Delivery Location</Text>
        <View></View>
      </View>
      <MapView
        ref={mapRef}
        style={styles.map}
        region={region}
        onRegionChangeComplete={onRegionChangeComplete}
        showsUserLocation={true}
        showsMyLocationButton={true}
        rotateEnabled={false} // Disabling map rotation
      />
      <View style={styles.markerFixed}>
        <Image style={styles.marker} source={require('../assets/map_marker.png')} />
      </View>
      <View style={styles.centerDot} />
      {/* <View style={styles.coordinatesContainer}>
        <Text style={styles.coordinatesText}>Latitude: {region.latitude}</Text>
        <Text style={styles.coordinatesText}>Longitude: {region.longitude}</Text>
      </View> */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmLocation}>
        <Text style={styles.confirmButtonText}>Confirm Location</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
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
  },
  markerFixed: {
    left: '50%',
    position: 'absolute',
    top: '50%',
    marginLeft: -24,
    marginTop: -48,
  },
  marker: {
    height: 48,
    width: 48,
  },
  centerDot: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 8,
    height: 8,
    backgroundColor: 'red',
    borderRadius: 4,
    marginLeft: -4,
    marginTop: -4,
  },
  coordinatesContainer: {
    position: 'absolute',
    bottom: 100,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  coordinatesText: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 5,
    borderRadius: 5,
  },
  confirmButton: {
    backgroundColor: "#1c40bd",
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
  },
});
