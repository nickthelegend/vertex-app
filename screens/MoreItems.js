import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { getFirestore, collection, query, orderBy, startAfter, getDocs, limit } from 'firebase/firestore';
import { app } from '../services/config';
import { SafeAreaView } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("window").width;

export default function MoreItems() {
  const navigation = useNavigation();
  const [items, setItems] = useState([]);
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const db = getFirestore(app);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async (startAfterDoc = null) => {
    setLoading(true);
    try {
      let q;
      if (startAfterDoc) {
        q = query(collection(db, 'sellAds'), orderBy('dateCreated', 'desc'), startAfter(startAfterDoc), limit(10));
      } else {
        q = query(collection(db, 'sellAds'), orderBy('dateCreated', 'desc'), limit(10));
      }
      const querySnapshot = await getDocs(q);
      const itemsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setItems(prevItems => [...prevItems, ...itemsList]);
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
    } catch (error) {
      console.error('Error fetching items: ', error);
    }
    setLoading(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate("AdDetail", { item })}
    >
      <ImageBackground
        source={{ uri: item.images[0] }}
        style={styles.itemImage}
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
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Recently Added</Text>
        <View>
            
        </View>
      </View>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.rowContainer}
        onEndReached={() => {
          if (!loading && lastVisible) {
            fetchItems(lastVisible);
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <Text>Loading...</Text> : null}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 25,
    fontFamily: 'ComfortaaBold',
  },
  backButton: {
    marginRight: 10,
  },
  chatButton: {
    backgroundColor: "#1c40bd",
    padding: 10,
    borderRadius: 20,
  },
  rowContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemContainer: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 15,
    marginHorizontal: 5,
    marginVertical: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: screenWidth / 2 - 20,
  },
  itemImage: {
    width: "100%",
    height: 150,
    borderRadius: 15,
    resizeMode: "cover",
    flexDirection: "row",
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
    color: '#434048'
  },
  itemPrice: {
    fontSize: 18,
    color: "#1c40bd",
    fontFamily: "Montserrat",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: 'space-between'
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
  favoriteButton: {
    position: "absolute",
    bottom: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 50,
    padding: 10,
  },
});
