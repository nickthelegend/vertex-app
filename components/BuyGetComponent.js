import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

export default function BuyGetComponent() {
  const navigation = useNavigation();
  const vegItems = [
    {
      name: "Electric Guitar",
      image: require("../assets/temp/electric_guitar.jpg"),
      price: 150,
      condition: "Okay Condition",
      user: 'Batu Honey Vardhan',
      address: 'Kinnera Hostel',
      category:'',
      subCatYear:'',
      subCatBranch: '',

    },
    {
      name: "Algorithms Set of 3 Books",
      image: require("../assets/temp/algorithims.jpg"),
      price: 120,
      condition: "Like New",
    },
    {
      name: "Data Structures 2nd Edition",
      image: require("../assets/temp/datastructuresandalgo.jpg"),
      condition: 'Poor',
      price: 'Free',
    },
    {
      name: "MTB Cycle Black",
      image: require("../assets/temp/cycle.jpg"),
      condition: "Good Condition",
      price: 100,
    },
  ];

  const chunkArray = (array, chunkSize) => {
    return Array(Math.ceil(array.length / chunkSize))
      .fill()
      .map((_, index) => index * chunkSize)
      .map((begin) => array.slice(begin, begin + chunkSize));
  };

  const itemsInRows = chunkArray(vegItems, 2);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.buySellContent}>
          <Text style={styles.buySellTitle}>What do you want to buy/sell?</Text>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={24} color="#aaa" style={{ marginRight: 10 }} />
            <TextInput
              placeholder="Search By Books, Gadgets, Etc..."
              style={{ flex: 1, fontSize: 18 }}
            />
          </View>

          <Text style={styles.categoryHeader}>Categories</Text>
          <View style={styles.categoriesContainer}>
            <TouchableOpacity style={[styles.categoryButton, styles.firstCategory]} onPress={()=>{navigation.navigate("CategoryBooks")}}>
              <Ionicons name="book-outline" size={24} color="#333" />
              <Text style={styles.categoryText}>Books</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Ionicons name="phone-portrait-outline" size={24} color="#333" />
              <Text style={styles.categoryText}>Gadgets</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Ionicons name="school-outline" size={24} color="#333" />
              <Text style={styles.categoryText}>Resources</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Ionicons name="ellipsis-horizontal-outline" size={24} color="#333" />
              <Text style={styles.categoryText}>Misc</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.recentlyAddedContainer}>
            <Text style={styles.recentlyAddedTitle}>Recently Added</Text>
            <TouchableOpacity>
              <Text style={styles.showMoreButton}>Show More</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.classifiedsContainer}>
            {itemsInRows.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.rowContainer}>
                {row.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.itemContainer}
                    onPress={() => navigation.navigate("AdDetail", { item })}
                  >
                    <ImageBackground
                      source={item.image}
                      style={[styles.itemImage, { borderRadius: 50 }]}
                    >
                      <TouchableOpacity style={[styles.button, styles.favoriteButton]}>
                        <Ionicons name="heart-outline" size={21} color="white" />
                      </TouchableOpacity>
                    </ImageBackground>
                    <Text
                      style={styles.itemText}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.name}
                    </Text>
                    <Text style={styles.itemCondition}>{item.condition}</Text>
                    <View style={styles.buttonContainer}>
                    {item.price == "Free" ?<Text style={styles.itemPrice}>Free</Text> : <Text style={styles.itemPrice}>₹{item.price}</Text>}

                      <TouchableOpacity
                        style={[styles.button, styles.addToCartButton]}
                        onPress={() => addToCart(item)}
                      >
                        <Text style={styles.buttonText}>Chat</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </View>
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  content: {
    flex: 1,
  },
  buySellContent: {
    flex: 1,
    marginVertical: 20,
  },
  buySellTitle: {
    fontSize: 35,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 20,
    flexWrap: "wrap",
    paddingHorizontal:10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    backgroundColor: "#efefef",
    padding: 10,
    margin: 10,
  },
  categoryHeader: {
    fontFamily: "Montserrat",
    fontSize: 18,
  },
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
  },
  categoryButton: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    width: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginHorizontal: 5,
  },
  firstCategory: {
    marginLeft: 0,
  },
  categoryText: {
    fontSize: 16,
    color: "#333",
    marginTop: 10,
  },
  recentlyAddedContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  recentlyAddedTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  showMoreButton: {
    fontSize: 16,
    color: "#007bff",
  },
  classifiedsContainer: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: "row",
    marginBottom: 10,
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 15,
    // alignItems: "center",
    marginHorizontal: 5,
    elevation: 10,
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
    flexDirection: "row",
  },
  itemText: {
    width: (screenWidth / 2) * 0.85,
    fontSize: 18,
    fontFamily: "ComfortaaBold",
    marginTop: 10,
    textAlign:'left',
    color: "#007bff",
  },
  itemCondition: {
    fontSize: 15,
    color: "#1c40bd",
    fontFamily: "ComfortaaBold",
    textAlign:'left',
    color:'#434048'

  },
  itemPrice: {
    fontSize: 30,
    color: "#1c40bd",
    fontFamily: "Montserrat",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent:'space-between'
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
    paddingHorizontal: 20,
    borderRadius:20,
  },
  favoriteButton: {
    position: "absolute",
    bottom: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 50,
    padding: 10,
  },
});

