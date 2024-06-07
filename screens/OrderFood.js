import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground,
} from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;
export const vegItems = [
  {
    name: "Paneer Tikka",
    image: require("../assets/temp/paneer_tikka.jpg"),
    price: 150,
  },
  {
    name: "Veg Biryani",
    image: require("../assets/temp/veg_biryani.jpg"),
    price: 120,
  },
  { name: "Salad", image: require("../assets/temp/salad.jpg"), price: 80 },
  {
    name: "Veg Burger",
    image: require("../assets/temp/veg_burger.jpg"),
    price: 100,
  },
];

const nonVegItems = [
  "Chicken Curry",
  "Fish Fry",
  "Mutton Biryani",
  "Prawn Fry",
];
const iceCreamItems = ["Vanilla", "Chocolate", "Strawberry", "Butterscotch"];
const coolDrinksItems = ["Coke", "Pepsi", "Sprite", "Fanta"];

export default function OrderFood({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState("Veg");

  let itemsToDisplay;
  switch (selectedCategory) {
    case "Veg":
      itemsToDisplay = vegItems;
      break;
    case "Non Veg":
      itemsToDisplay = nonVegItems;
      break;
    case "IceCream":
      itemsToDisplay = iceCreamItems;
      break;
    case "Cool Drinks":
      itemsToDisplay = coolDrinksItems;
      break;
    default:
      itemsToDisplay = [];
  }

  // Function to chunk the array into arrays of two items each
  const chunkArray = (array, chunkSize) => {
    return Array(Math.ceil(array.length / chunkSize))
      .fill()
      .map((_, index) => index * chunkSize)
      .map((begin) => array.slice(begin, begin + chunkSize));
  };

  // Chunk the items into arrays of two
  const itemsInRows = chunkArray(itemsToDisplay, 2);
  // const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Order Food</Text>

          <TouchableOpacity style={{}}>
            <Ionicons name="cart-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            borderRadius: 15,
            backgroundColor: "#efefef",
            padding: 10,
            margin: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="search"
            size={24}
            color="#aaa"
            style={{ marginRight: 10 }}
          />
          <TextInput
            placeholder="What food is on your mind?"
            style={{ flex: 1, fontSize: 18 }} // Adjust the width of TextInput to take remaining space
          />
        </View>
        <View style={styles.categoriesContainer}>
          <TouchableOpacity
            onPress={() => setSelectedCategory("Veg")}
            style={[
              styles.categoryButton,
              selectedCategory === "Veg" && styles.categoryButtonSelected,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === "Veg" && styles.categoryTextSelected,
              ]}
            >
              Veg
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedCategory("Non Veg")}
            style={[
              styles.categoryButton,
              selectedCategory === "Non Veg" && styles.categoryButtonSelected,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === "Non Veg" && styles.categoryTextSelected,
              ]}
            >
              Non Veg
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedCategory("IceCream")}
            style={[
              styles.categoryButton,
              selectedCategory === "IceCream" && styles.categoryButtonSelected,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === "IceCream" && styles.categoryTextSelected,
              ]}
            >
              IceCream
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedCategory("Cool Drinks")}
            style={[
              styles.categoryButton,
              selectedCategory === "Cool Drinks" &&
                styles.categoryButtonSelected,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === "Cool Drinks" &&
                  styles.categoryTextSelected,
              ]}
            >
              Cool Drinks
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
        >
          {itemsInRows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.rowContainer}>
              {row.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.itemContainer}
                  onPress={() => navigation.navigate("FoodDetail", { item })}
                >
                  <ImageBackground
                    source={item.image}
                    style={[styles.itemImage, { borderRadius: 50 }]}
                  >
                    <TouchableOpacity
                      style={[styles.button, styles.favoriteButton]}
                    >
                      <Ionicons name="heart-outline" size={21} color="white" />
                    </TouchableOpacity>
                    {/* Rest of your content */}
                  </ImageBackground>
                  <Text style={styles.itemText}>{item.name}</Text>
                  <Text style={styles.itemPrice}>₹{item.price}</Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[styles.button, styles.addToCartButton]}
                    >
                      <Text style={styles.buttonText}>Add to Cart</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </ScrollView>
        <View style={{ margin: 15 }}>
          <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20 }}>
            Popular Items
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexDirection: "row" }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                padding: 10,
                // elevation:1,
                borderRadius: 20,
                borderWidth: 1,
                marginRight: 20,
              }}
            >
              <View>
                <Image
                  source={require("../assets/temp/paneer_tikka.jpg")}
                  style={{ height: 80, width: 80, borderRadius: 50 }}
                  resizeMode="cover"
                />
              </View>
              <View style={{ marginLeft: 20 }}>
                <Text style={{ fontFamily: "ComfortaaBold", fontSize: 18 }}>
                  Paneer TIkka
                </Text>
                <Text style={{ fontFamily: "Montserrat", color: "#1c40bd" }}>
                  ₹80
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                padding: 10,
                // elevation:1,
                borderRadius: 20,
                borderWidth: 1,
                marginRight: 20,
              }}
            >
              <View>
                <Image
                  source={require("../assets/temp/veg_biryani.jpg")}
                  style={{ height: 80, width: 80, borderRadius: 50 }}
                  resizeMode="cover"
                />
              </View>
              <View style={{ marginLeft: 20 }}>
                <Text style={{ fontFamily: "ComfortaaBold", fontSize: 18 }}>
                  Veg Biryani
                </Text>
                <Text style={{ fontFamily: "Montserrat", color: "#1c40bd" }}>
                  ₹120
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </ScrollView>
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
  categoriesContainer: {
    flexDirection: "row",
    paddingLeft: 10,
    marginVertical: 10,
  },
  categoryButton: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#e7f1ff",
    marginRight: 10,
  },
  categoryButtonSelected: {
    borderColor: "#1d40bd",
    backgroundColor: "#1d40bd",
  },
  categoryText: {
    fontSize: 16,
    color: "#000",
  },
  categoryTextSelected: {
    color: "#fff",
  },
  scrollView: {
    paddingHorizontal: 10,
  },
  rowContainer: {
    flexDirection: "row",
    // justifyContent: 'space-around',
    marginBottom: 10,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 15,
    alignItems: "center",
    marginHorizontal: 5,
    elevation: 10, // Adjust the elevation as needed for the desired shadow effect
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    paddingBottom: 20,
    paddingTop: 20,
  },
  itemImage: {
    width: (screenWidth / 2) * 0.85,
    height: 150,
    borderRadius: 40,
    resizeMode: "cover",
    // flex:1,
    flexDirection: "row",
  },
  itemText: {
    fontSize: 18,
    fontFamily: "ComfortaaBold",
    marginTop: 10,
    color: "#007bff",
  },
  itemPrice: {
    fontSize: 35,
    color: "#1c40bd",
    fontFamily: "Montserrat",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  addToCartButton: {
    backgroundColor: "#1c40bd",
    marginRight: 5,
    paddingHorizontal: 35,
  },
  favoriteButton: {
    position: "absolute",
    bottom: 10,
    // : 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Adjust the background color and opacity as needed
    borderRadius: 50, // Makes the button round
    padding: 10,
  },
});
