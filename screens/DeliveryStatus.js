import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function DeliveryStatus() {
  const [orderDetails, setOrderDetails] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const orderData = await AsyncStorage.getItem('delivery');
      setOrderDetails(JSON.parse(orderData));
    };

    fetchOrderDetails();
  }, []);

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
            <Image source={item.image } style={styles.cartItemImage} />
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
});
