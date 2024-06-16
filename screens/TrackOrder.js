import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../services/config";
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';

const GOOGLE_MAPS_APIKEY = 'AIzaSyACn5LbHpFrDZrJ9pkg1OLc4EkntvcmNsA'; // Replace with your actual API key

export default function TrackOrder({ route }) {
  const { orderId } = route.params;
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [agentLocation, setAgentLocation] = useState(null);
  const db = getFirestore(app);
  const rtdb = getDatabase(app);
  const navigation = useNavigation();
  const [region, setRegion] = useState({
    latitude: 17.493504,
    longitude: 78.391198,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        console.log("Fetching order details for orderId:", orderId);
        if (!orderId) {
          throw new Error("Order ID is not provided");
        }

        const docRef = doc(db, "orders", orderId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Order details found:", docSnap.data());
          setOrderDetails(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching order details:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        console.log("User location fetched:", location.coords);
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (error) {
        console.error("Error fetching user location:", error.message);
      }
    })();
  }, []);

  useEffect(() => {
    if (orderDetails) {
      const agentId = orderDetails.deliveredBy; // Assuming you have this in orderDetails
      console.log("Subscribing to agent location updates for agentId:", agentId);
      const agentLocationRef = ref(rtdb, `users/${agentId}`);

      const handleValueChange = (snapshot) => {
        const data = snapshot.val();
        console.log("Agent location data received:", data);
        if (data && data.latitude && data.longitude) {
          setAgentLocation({
            latitude: data.latitude,
            longitude: data.longitude,
          });
        } else {
          console.error("Invalid agent location data:", data);
        }
      };

      const unsubscribe = onValue(agentLocationRef, handleValueChange, (error) => {
        console.error("Error subscribing to agent location updates:", error.message);
      });

      return () => {
        console.log("Unsubscribing from agent location updates for agentId:", agentId);
        unsubscribe();
      };
    }
  }, [orderDetails]);

  if (loading || !userLocation || !agentLocation) {
    console.log("Loading state or missing user/agent location. Loading:", loading, "User location:", userLocation, "Agent location:", agentLocation);
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  console.log("Rendering MapView with user location:", userLocation, "and agent location:", agentLocation);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Track Order</Text>
        <View></View>
      </View>
      <MapView 
        style={styles.map}
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={region}

        rotateEnabled={false} // Disabling map rotation
      >
        <Marker coordinate={userLocation} title={"Your Location"}>
          <Image source={require('../assets/map_marker.png')} style={{width: 30, height: 30}} />
        </Marker>
        <Marker coordinate={agentLocation} title={"Delivery Agent"}>
          <Image source={require('../assets/delivery-boy.png')} style={{width: 30, height: 30}} />
        </Marker>
        <MapViewDirections
          origin={userLocation}
          destination={agentLocation}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="#1c40bd"
        />
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});
