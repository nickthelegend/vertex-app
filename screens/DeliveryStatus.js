import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { sendPushNotification } from '../utils/sendPushNotification';
import uuid from 'react-native-uuid'; // Import uuid

export default function DeliveryStatus() {
  const [orderDetails, setOrderDetails] = useState(null);
  const [nearbyUser, setNearbyUser] = useState(null);
  const navigation = useNavigation();
  const database = getDatabase();
  const firestore = getFirestore();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const orderData = await AsyncStorage.getItem('delivery');
      console.log(orderData)
      setOrderDetails(JSON.parse(orderData));
    };

    fetchOrderDetails();
  }, []);

  useEffect(() => {
    const usersRef = ref(database, 'users');
  
    const handleUserUpdate = async (snapshot) => {
      const users = snapshot.val();
      for (const userId in users) {
        const user = users[userId];
        if (user.isNearCanteen) {
          setNearbyUser(user);
  
          try {
            // Fetch the delivery agent's push token from Firestore
            const userDoc = await getDoc(doc(firestore, 'users', userId));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              const expoPushToken = userData.notificationToken;
  
              // Log the token
              console.log('Expo Push Token:', expoPushToken);
  
              // Generate a unique ID for the delivery request
              const deliveryRequestId = uuid.v4();
  
              // Create the delivery request in Firestore
              await setDoc(doc(firestore, 'deliveryRequests', deliveryRequestId), {
                status: 'pending',
                createdAt: new Date(),
                orderId: orderDetails.orderId,
                deliveryAgentId: userId,
              });
  
              // Log the delivery request creation
              console.log('Delivery request created:', deliveryRequestId);
  
              // Send push notification to the delivery agent
              await sendPushNotification(
                expoPushToken,
                'Delivery Request',
                'Would you like to deliver this order?',
                { deliveryRequestId }
              );
  
              // Log notification sending
              console.log('Push notification sent');
  
              // Listen for changes in Firestore
              const deliveryRequestRef = doc(firestore, 'deliveryRequests', deliveryRequestId);
              const unsubscribeRequest = onSnapshot(deliveryRequestRef, (docSnapshot) => {
                const deliveryRequest = docSnapshot.data();
                if (deliveryRequest.status === 'accepted') {
                  console.log('Delivery accepted');
                  off(usersRef); // Stop the listener
                } else if (deliveryRequest.status === 'declined') {
                  console.log('Delivery declined');
                  setNearbyUser(null); // Reset nearby user to check for another user
                }
              });
  
              return () => unsubscribeRequest();
            } else {
              console.log('User document does not exist:', userId);
            }
          } catch (error) {
            console.error('Error processing user update:', error);
          }
        }
      }
    };
  
    const unsubscribe = onValue(usersRef, handleUserUpdate);
  
    // Cleanup listener on unmount
    return () => off(usersRef, 'value', unsubscribe);
  }, [database, firestore, orderDetails]);
  

  if (!orderDetails) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Delivery Status</Text>
        <View></View>
      </View>
      <FlatList
        data={orderDetails.orderDetails.cartItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={item.image} style={styles.cartItemImage} />
            <View style={styles.cartItemDetails}>
              <Text style={styles.cartItemName}>{item.name}</Text>
              <Text style={styles.cartItemPrice}>₹{item.price}</Text>
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={styles.orderSummary}>
            <Text style={styles.orderSummaryText}>Subtotal: ₹{orderDetails.orderDetails.subtotal}</Text>
            <Text style={styles.orderSummaryText}>Delivery Charges: ₹{orderDetails.orderDetails.deliveryCharges}</Text>
            <Text style={styles.orderSummaryText}>Total: ₹{orderDetails.orderDetails.total}</Text>
          </View>
        )}
      />
      {nearbyUser && (
        <View style={styles.nearbyUserDetails}>
          <Text style={styles.nearbyUserText}>Nearby User Found:</Text>
          <Text style={styles.nearbyUserText}>Name: {nearbyUser.userFullName}</Text>
          <Text style={styles.nearbyUserText}>User ID: {nearbyUser.userId}</Text>
          <Text style={styles.nearbyUserText}>Latitude: {nearbyUser.latitude}</Text>
          <Text style={styles.nearbyUserText}>Longitude: {nearbyUser.longitude}</Text>
        </View>
      )}
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
  cartItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cartItemImage: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  cartItemDetails: {
    justifyContent: 'center',
  },
  cartItemName: {
    fontSize: 18,
  },
  cartItemPrice: {
    fontSize: 16,
    color: '#888',
  },
  orderSummary: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  orderSummaryText: {
    fontSize: 18,
    marginBottom: 5,
  },
  nearbyUserDetails: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  nearbyUserText: {
    fontSize: 18,
    marginBottom: 5,
  },
});
