import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const DeliveryAgentScreen = ({ route }) => {
  const { orderId } = route.params;
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Fetch order details using orderId
    // This is a placeholder for the actual data fetching logic
    const fetchOrderDetails = async () => {
      // Example data, replace this with your data fetching logic
      const orderData = {
        orderId: '12345',
        customerName: 'John Doe',
        deliveryAddress: '123 Main St, Springfield, USA',
        items: [
          { id: '1', name: 'Pizza', quantity: 2, price: 10 },
          { id: '2', name: 'Burger', quantity: 1, price: 5 },
        ],
        totalAmount: 25,
      };
      setOrderDetails(orderData);
    };

    fetchOrderDetails();
  }, [orderId]);

  if (!orderDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order Details</Text>
      <Text style={styles.label}>Order ID: {orderDetails.orderId}</Text>
      <Text style={styles.label}>Customer Name: {orderDetails.customerName}</Text>
      <Text style={styles.label}>Delivery Address: {orderDetails.deliveryAddress}</Text>
      <FlatList
        data={orderDetails.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDetails}>Quantity: {item.quantity}</Text>
            <Text style={styles.itemDetails}>Price: ${item.price}</Text>
          </View>
        )}
      />
      <Text style={styles.totalAmount}>Total Amount: ${orderDetails.totalAmount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  itemContainer: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDetails: {
    fontSize: 16,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default DeliveryAgentScreen;
