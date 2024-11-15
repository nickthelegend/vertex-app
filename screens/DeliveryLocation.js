import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { getFirestore, collection, doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { app } from '../services/config'; // Assuming you have a firebase config file
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';
import LoadingIndicator from '../components/LoadingIndicator';

export default function DeliveryLocation({ route }) {
  const { cartItems, subtotal, deliveryCharges, total , address,
    roomNo,
    phoneNo,} = route.params;
  const navigation = useNavigation();
  const [loadingVisible, setLoadingVisible] = useState(false); // State to control loading animation visibility
  const northEast = { latitude: 17.49617, longitude: 78.39486 };
  const southWest = { latitude: 17.490222, longitude: 78.386944 };
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserFullName, setCurrentUserFullName] = useState('');
  const [currentUserPhoneNumber, setCurrentUserPhoneNumber] = useState('');
  const [region, setRegion] = useState({
    latitude: 17.493504, // Center point within your boundaries
    longitude: 78.391198, // Center point within your boundaries
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const mapRef = useRef(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      const jsonObj = JSON.parse(userData);
      setCurrentUser(jsonObj.userId);
      setCurrentUserFullName(jsonObj.fullName);
      setCurrentUserPhoneNumber(jsonObj.phonenumber);
    };

    fetchCurrentUser();
  }, []);

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
      await mapRef.current.setMapBoundaries(northEast, southWest);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirmLocation = async () => {
    setLoadingVisible(true);

    const db = getFirestore(app);

    const orderId = uuid.v4();
    const newOrder = {
      orderId,
      userId: currentUser,
      deliveredBy: '', // Initially blank
      userFullName: currentUserFullName,
      status: 'placed', // Default status
      address: address,
      roomNo: roomNo,
      phoneNo: currentUserPhoneNumber,
      orderDetails: {
        latitude: region.latitude,
        longitude: region.longitude,
        cartItems: cartItems,
        subtotal: subtotal,
        deliveryCharges: deliveryCharges,
        total: total,
      },
    };

    try {
      // Add the order to the orders collection
      await setDoc(doc(collection(db, 'orders'), orderId), newOrder);

      // Update the user's document to include the new orderId in userOrders
      await updateDoc(doc(collection(db, 'users'), currentUser), {
        userOrders: arrayUnion(orderId),
      });

      // Clear the cart
      await AsyncStorage.setItem('cart', JSON.stringify([]));

      // Store the delivery item
      await AsyncStorage.setItem('delivery', JSON.stringify(newOrder));

      console.log('Order confirmed and stored in Firestore:', newOrder);
      setLoadingVisible(false)
      // Navigate to the DeliveryStatus page
      navigation.navigate('DeliveryStatus', { orderId,region });
    } catch (error) {
      console.error('Error confirming and storing order:', error);
      setLoadingVisible(false)
    }
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
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmLocation}>
        <Text style={styles.confirmButtonText}>Confirm Location</Text>
      </TouchableOpacity>
      {loadingVisible && <LoadingIndicator />}
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
