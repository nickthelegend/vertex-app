import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image
} from "react-native";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { app } from "../services/config";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const DeliveryAgentScreen = ({ route }) => {
  const { orderId } = route.params;
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const db = getFirestore(app);
  const navigation = useNavigation()
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (!orderId) {
          throw new Error("Order ID is not provided");
        }

        const docRef = doc(db, "orders", orderId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setOrderDetails(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching order details: ", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!orderDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No order details found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Order Details</Text>
        <View></View>
      </View>

      <View style={styles.container}>
      <Text style={styles.label}>Order ID: {orderDetails.orderId}</Text>
      <Text style={styles.label}>
        Customer Name: {orderDetails.userFullName}
      </Text>
      <Text style={styles.label}>
        Delivery Address: {orderDetails.address}
      </Text>
      <Text style={styles.label}>
       Room Number: {orderDetails.roomNo}
      </Text>
      <Text style={styles.label}>
        Latitude: {orderDetails.orderDetails.latitude}
      </Text>
      <Text style={styles.label}>
        Longitude: {orderDetails.orderDetails.longitude}
      </Text>
      <Text style={styles.label}>Status: {orderDetails.status}</Text>
      <Text style={styles.label}>Phone: {orderDetails.phoneNo}</Text>
      
      <FlatList
        data={orderDetails.orderDetails.cartItems}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (<View style={styles.cartItem}>
            <Image source={item.image} style={styles.cartItemImage} />
            <View style={styles.cartItemDetails}>
              <Text style={styles.cartItemName}>{item.name}</Text>
              <Text style={styles.cartItemPrice}>₹{item.price}</Text>
              <Text style={styles.cartItemPrice}>Qty: {item.quantity}</Text>
              <Text style={styles.cartItemPrice}>Price: {item.quantity} x {item.price} = ₹{item.quantity * item.price} </Text>
            </View>
          </View>
        )}
        style={styles.itemList}
      />
      <Text style={styles.totalAmount}>
        Subtotal: ₹{orderDetails.orderDetails.subtotal}
      </Text>
      <Text style={styles.totalAmount}>
        Delivery Charges: ₹{orderDetails.orderDetails.deliveryCharges}
      </Text>
      <Text style={styles.totalAmount}>
        Total Amount: ₹{orderDetails.orderDetails.total}
      </Text>

      <TouchableOpacity style={styles.confirmButton} onPress={()=>{navigation.navigate("OrderLocation", {deliveryLocation : {latitude:orderDetails.orderDetails.latitude, longitude: orderDetails.orderDetails.longitude }})}}>
        <Text style={styles.confirmButtonText}>Show directions</Text>
      </TouchableOpacity>


      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f2",
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: "#555",
  },
  itemContainer: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  itemName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  itemDetails: {
    fontSize: 16,
    color: "#666",
  },
  itemList: {
    marginBottom: 20,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "right",
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

export default DeliveryAgentScreen;
