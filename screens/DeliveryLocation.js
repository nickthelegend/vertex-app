import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function DeliveryLocation({ navigation }) {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);
      setRegion({
        ...region,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const onRegionChangeComplete = (region) => {
    setRegion(region);
  };

  const handleConfirmLocation = () => {
    console.log('Selected coordinates:', region.latitude, region.longitude);
  };

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
