import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../services/config';
import { Skeleton } from 'moti/skeleton';

export default function MyOrders() {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const jsonObj = JSON.parse(userData);
        if (jsonObj.userId) {
          setCurrentUser(jsonObj.userId);
          const db = getFirestore(app);

          // Fetch user document
          const userDoc = await getDoc(doc(db, 'users', jsonObj.userId));
          if (userDoc.exists()) {
            const userOrders = userDoc.data().userOrders;

            // Fetch all orders details
            const ordersPromises = userOrders.map(async (orderId) => {
              const orderDoc = await getDoc(doc(db, 'orders', orderId));
              return orderDoc.exists() ? { orderId, ...orderDoc.data() } : null;
            });

            const ordersData = await Promise.all(ordersPromises);
            setOrders(ordersData.filter(order => order !== null));
          }
        }
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  const LoadingSkeleton = () => {
    const skeletonItems = Array.from({ length: 3 }).map((_, index) => (
      <View key={index} style={styles.orderContainer}>
        <Skeleton width={200} height={20} colorMode="light" style={styles.skeleton} />
        <Skeleton width={150} height={20} colorMode="light" style={styles.skeleton} />
        <Skeleton width={250} height={20} colorMode="light" style={styles.skeleton} />
        <Skeleton width={200} height={20} colorMode="light" style={styles.skeleton} />
        <Skeleton width={100} height={20} colorMode="light" style={styles.skeleton} />
        <Skeleton width={250} height={20} colorMode="light" style={styles.skeleton} />
        <View style={{ flexDirection: 'row', marginVertical: 10 }}>
          <Skeleton width={60} height={60} colorMode="light" style={styles.skeletonImage} />
          <View style={{ justifyContent: 'center' }}>
            <Skeleton width={100} height={20} colorMode="light" style={styles.skeleton} />
            <Skeleton width={50} height={20} colorMode="light" style={styles.skeleton} />
            <Skeleton width={70} height={20} colorMode="light" style={styles.skeleton} />
          </View>
        </View>
        <Skeleton width={100} height={20} colorMode="light" style={styles.skeleton} />
      </View>
    ));

    return <>{skeletonItems}</>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>My Orders</Text>
        <View></View>
      </View>

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.orderId}
          renderItem={({ item }) => (
            <View style={styles.orderContainer}>
              <Text style={styles.orderId}>Order ID: {item.orderId}</Text>
              <Text style={styles.orderStatus}>Status: {item.status}</Text>
              {item.deliveredBy && <Text style={styles.deliveredBy}>Delivered By: {item.deliveredBy}</Text>}
              {!item.deliveredBy && <Text style={styles.deliveredBy}>Looking For Delivery Agents Near You {item.deliveredBy}</Text>}
              <Text style={styles.orderAddress}>Address: {item.address}, Room No: {item.roomNo}</Text>
              <Text style={styles.orderPhone}>Phone No: {item.phoneNo}</Text>
              <FlatList
                data={item.orderDetails.cartItems}
                keyExtractor={(cartItem) => cartItem.name}
                renderItem={({ item: cartItem }) => (
                  <View style={styles.cartItem}>
                    <Image source={cartItem.image} style={styles.cartItemImage} />
                    <View style={styles.cartItemDetails}>
                      <Text style={styles.cartItemName}>{cartItem.name}</Text>
                      <Text style={styles.cartItemQuantity}>Quantity: {cartItem.quantity}</Text>
                      <Text style={styles.cartItemPrice}>Price: {cartItem.price}</Text>
                    </View>
                  </View>
                )}
              />
              <Text style={styles.orderTotal}>Total:  ₹{item.orderDetails.total}</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    justifyContent: 'space-between',
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 25,
    fontFamily: 'ComfortaaBold',
  },
  orderContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderStatus: {
    fontSize: 16,
    marginVertical: 5,
  },
  deliveredBy: {
    fontSize: 16,
    marginVertical: 5,
  },
  orderAddress: {
    fontSize: 16,
    marginVertical: 5,
  },
  orderPhone: {
    fontSize: 16,
    marginVertical: 5,
  },
  cartItem: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  cartItemImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  cartItemDetails: {
    justifyContent: 'center',
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemQuantity: {
    fontSize: 14,
    color: '#555',
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#555',
  },
  orderTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  skeleton: {
    marginBottom: 10,
  },
  skeletonImage: {
    borderRadius: 10,
    marginRight: 10,
  },
});
