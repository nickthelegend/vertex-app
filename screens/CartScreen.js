import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-modal";

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [address, setAddress] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadCartItems();
    });
    return unsubscribe;
  }, [navigation]);

  const loadCartItems = async () => {
    try {
      const cart = await AsyncStorage.getItem("cart");
      const parsedCart = cart ? JSON.parse(cart) : [];
      setCartItems(parsedCart);
    } catch (error) {
      console.error(error);
    }
  };

  const updateQuantity = async (item, type) => {
    let updatedCartItems = [...cartItems];
    const itemIndex = updatedCartItems.findIndex(
      (cartItem) => cartItem.name === item.name
    );

    if (itemIndex > -1) {
      if (type === "increase") {
        updatedCartItems[itemIndex].quantity += 1;
      } else if (type === "decrease") {
        if (updatedCartItems[itemIndex].quantity > 1) {
          updatedCartItems[itemIndex].quantity -= 1;
        } else {
          updatedCartItems.splice(itemIndex, 1);
        }
      }
      await AsyncStorage.setItem("cart", JSON.stringify(updatedCartItems));
      setCartItems(updatedCartItems);
    }
  };

  const removeItem = async (item) => {
    let updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.name !== item.name
    );
    await AsyncStorage.setItem("cart", JSON.stringify(updatedCartItems));
    setCartItems(updatedCartItems);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <Image source={item.image} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>₹{item.price}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => updateQuantity(item, "decrease")}>
            <Ionicons name="remove-circle-outline" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.cartItemQuantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item, "increase")}>
            <Ionicons name="add-circle-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeItem(item)}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleSaveAddress = () => {
    setAddress(newAddress);
    toggleModal();
  };

  const subtotal = calculateSubtotal();
  const deliveryCharges = 50; // Fixed delivery charge
  const total = subtotal + deliveryCharges;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Cart</Text>
        <View></View>
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Your cart is empty.</Text>
        </View>
      ) : (
        <View style={styles.cartContent}>
          <TouchableOpacity onPress={toggleModal}>
            <View style={styles.addressContainer}>
              <Text>Delivery Location</Text>
              {address && roomNo ? (
                <>
                  <Text style={styles.addressText}>{address}</Text>
                  <Text style={styles.addressText}>Room No: {roomNo}</Text>
                  <Text style={styles.addressText}>Phone No: {phoneNo}</Text>
                </>
              ) : (
                <Text style={styles.editAddressText}>Edit Address</Text>
              )}
            </View>
          </TouchableOpacity>

          <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Edit Delivery Address</Text>
              <TextInput
                style={styles.addressInput}
                value={newAddress}
                onChangeText={setNewAddress}
                placeholder="Enter new address"
              />
              <TextInput
                style={styles.addressInput}
                value={roomNo}
                onChangeText={setRoomNo}
                placeholder="Enter room no"
              />
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveAddress}
              >
                <Text style={styles.saveButtonText}>Save Address</Text>
              </TouchableOpacity>
            </View>
          </Modal>

          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.cartItemsContainer}
          />
          <View style={styles.summaryContainer}>
            <Text style={styles.summaryText}>Subtotal: ₹{subtotal}</Text>
            <Text style={styles.summaryText}>
              Delivery Charges: ₹{deliveryCharges}
            </Text>
            <Text style={styles.summaryText}>Total: ₹{total}</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.orderButton,
              { backgroundColor: address && roomNo ? "#1c40bd" : "#d3d3d3" },
            ]}
            onPress={() =>
              address && roomNo && navigation.navigate("DeliveryLocation", {
                cartItems,
                subtotal,
                deliveryCharges,
                total,
                address,
                roomNo,
                phoneNo,
              })
            }
            disabled={!address || !roomNo}
          >
            <Text style={styles.orderButtonText}>Next: Delivery Location</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

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
  cartContent: {
    flex: 1,
  },
  addressContainer: {
    margin: 10,
  },
  addressText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 21,
  },
  editAddressText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 21,
    color: "#1c40bd",
  },
  cartItemsContainer: {
    padding: 10,
  },
  cartItemContainer: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cartItemImage: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginRight: 10,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 18,
    fontFamily: "ComfortaaBold",
    marginBottom: 5,
  },
  cartItemPrice: {
    fontSize: 16,
    color: "#1c40bd",
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  cartItemQuantity: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  removeButton: {
    alignSelf: "flex-start",
    backgroundColor: "#ff4d4d",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  summaryContainer: {
    padding: 20,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#dddddd",
  },
  summaryText: {
    fontSize: 18,
    marginBottom: 5,
    fontFamily: "Poppins-SemiBold",
  },
  orderButton: {
    backgroundColor: "#1c40bd",
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  orderButtonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartText: {
    fontSize: 18,
    color: "#777777",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: "ComfortaaBold",
    marginBottom: 20,
  },
  addressInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#d5d5d5",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    fontFamily: "Poppins-SemiBold",
  },
  saveButton: {
    backgroundColor: "#1c40bd",
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: "white",
    fontFamily: "Poppins-SemiBold",
  },
});

export default CartScreen;
