import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FoodDetail({ route }) {
  const { item } = route.params;
  const navigation = useNavigation();
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const addToCart = async () => {
    try {
      const cart = await AsyncStorage.getItem('cart');
      let cartItems = cart ? JSON.parse(cart) : [];
      
      const existingItemIndex = cartItems.findIndex(cartItem => cartItem.name === item.name);
      if (existingItemIndex > -1) {
        // If the item already exists in the cart, update its quantity
        cartItems[existingItemIndex].quantity += quantity;
      } else {
        // If the item is not in the cart, add it
        cartItems.push({ ...item, quantity });
      }

      await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
      Alert.alert('Success', 'Item added to cart');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while adding the item to the cart');
    }
  };
  
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Food</Text>
        <TouchableOpacity style={{}} onPress={() => navigation.navigate("CartScreen")}>
          <Ionicons name="cart-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={item.image} style={styles.image} />
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={decrementQuantity} style={styles.quantityButton}>
            <Ionicons name="remove" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={incrementQuantity} style={styles.quantityButton}>
            <Ionicons name="add" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{marginVertical:20}}>

        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
        <Text style={styles.name}>{item.name}</Text>

        <View style={{flexDirection:'row',alignItems:'center'}}>
        <Ionicons
        size={24}
        color="gold"
        name="star"
        />
        <Text>(4.5/5)</Text>
        </View>
        
        </View>
        <Text style={styles.price}>₹{item.price}</Text>
        
        </View>
        <Text style={{marginBottom:10,fontFamily:'Montserrat',fontSize:18}}>
            Description
        </Text>
        <Text style={styles.description}>
  This is a detailed description of the {item.name}. It is a delicious dish made with the freshest ingredients and cooked to perfection. Our {item.name} features a delightful combination of flavors, including savory spices, aromatic herbs, and succulent meats/vegetables (depending on the dish). Each bite offers a symphony of tastes that will tantalize your taste buds and leave you craving for more.
  
  Our skilled chefs meticulously prepare each component of the dish to ensure optimum flavor and texture. Whether you're a fan of hearty meals or seeking a lighter option, our {item.name} caters to all palates. Indulge in the rich, creamy sauce (if applicable) that complements the main ingredients, adding depth and richness to every bite.
  
  Accompanied by a side of fluffy rice/piping hot bread, our {item.name} is a complete meal that satisfies your hunger and delights your senses. Whether you're dining alone or with loved ones, our {item.name} promises a culinary experience that you won't soon forget. Treat yourself to a gastronomic adventure and savor the exquisite flavors of our signature dish today!
</Text>

      </ScrollView>

      <TouchableOpacity 
        style={styles.addButton}
        onPress={addToCart}
      >
        <Text style={styles.addButtonText}>Add to cart</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fafafa',
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
  headerText: {
    fontSize: 25,
    fontFamily: "ComfortaaBold",
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 50,
    marginBottom: 20,
    marginVertical: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  name: {
    fontSize: 35,
    color: '#333',
    fontFamily:'Poppins-SemiBold'
  },
  price: {
    fontSize: 35,
    color: '#1c40bd',
    marginBottom: 20,
    fontWeight: '600',
    fontFamily: "Montserrat",
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 30,
    padding: 10,
    alignSelf: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    paddingHorizontal:20
  },
  quantityButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 10,
  },
  quantityText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 18,
    color: '#666',
    lineHeight: 24,
    textAlign: 'justify',
  },
  addButton: {
    backgroundColor:"#1c40bd", 
    padding: 15,
    position:'absolute', 
    bottom: 15, 
    left: 0, 
    right: 0,
    alignItems: 'center', 
    justifyContent: 'center',
    borderRadius: 15,
    marginHorizontal:20
  },
  addButtonText: {
    color:'#fff', 
    fontSize: 21, 
    fontFamily:'Poppins-SemiBold'
  }
});
