import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, Dimensions,Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { app } from '../services/config';

const screenWidth = Dimensions.get("window").width;

export default function FilterScreenResources({ route }) {
  const navigation = useNavigation();
  const { year, department } = route.params;
  const [filteredItems, setFilteredItems] = useState([]);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchFilteredItems = async () => {
      try {
        const q = query(
          collection(db, 'sellAds'),
          where('category', '==', 'Resources'),
          where('year', '==', year),
          where('branch', '==', department)
        );
        const querySnapshot = await getDocs(q);
        const itemsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFilteredItems(itemsList);
      } catch (error) {
        console.error('Error fetching filtered items: ', error);
      }
    };

    fetchFilteredItems();
  }, [year, department]);

  const chunkArray = (array, chunkSize) => {
    return Array(Math.ceil(array.length / chunkSize))
      .fill()
      .map((_, index) => index * chunkSize)
      .map((begin) => array.slice(begin, begin + chunkSize));
  };

  const itemsInRows = chunkArray(filteredItems, 2);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Resources for {year} Year - {department}</Text>
        <View></View>
      </View>
      
      <FlatList
        data={itemsInRows}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item: row }) => (
          <View style={styles.rowContainer}>
            {row.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.itemContainer}
                onPress={() => navigation.navigate("AdDetail", { item })}
              >
                <Image
                  source={{ uri: item.images[0] }}
                  style={styles.itemImage}
                />
                  {/* <TouchableOpacity style={styles.favoriteButton}>
                    <Ionicons name="heart-outline" size={21} color="white" />
                  </TouchableOpacity> */}
                {/* </ImageBackground> */}
                <Text style={styles.itemText} numberOfLines={1} ellipsizeMode="tail">
                  {item.productName}
                </Text>
                <Text style={styles.itemCondition}>{item.condition}</Text>
                <View style={styles.buttonContainer}>
                  {item.giveaway ? <Text style={styles.itemPrice}>Free</Text> : <Text style={styles.itemPrice}>₹{item.price}</Text>}
                  <TouchableOpacity
                    style={[styles.button, styles.addToCartButton]}
                    onPress={() => navigation.navigate("Chat", { item })}
                  >
                    <Text style={styles.buttonText}>Chat</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
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
    marginHorizontal: 5,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  itemImage: {
    width: (screenWidth / 2) * 0.85,
    height: 150,
    borderRadius: 15,
    resizeMode: "cover",
    flexDirection: "row",
  },
  favoriteButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 50,
    padding: 10,
  },
  itemText: {
    fontSize: 18,
    fontFamily: "ComfortaaBold",
    marginTop: 10,
    textAlign: 'left',
    color: "#007bff",
  },
  itemCondition: {
    fontSize: 15,
    color: "#1c40bd",
    fontFamily: "ComfortaaBold",
    textAlign: 'left',
  },
  itemPrice: {
    fontSize: 18,
    color: "#1c40bd",
    fontFamily: "Montserrat",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: 'space-between',
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
    borderRadius: 20,
  },
});

