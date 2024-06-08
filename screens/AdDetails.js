import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function AdDetails({ route }) {
  const { item } = route.params;
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Ad Details</Text>
        <View></View>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={item.image} style={styles.image} />

        <View style={{ marginVertical: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>₹{item.price}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text style={styles.itemCondition}>{item.condition}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="person-outline" size={18} color="#434048" />
              <Text style={styles.user}> {item.user}</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: 'flex-end'
            }}
          >
            <Ionicons name="location-outline" size={18} color="#434048" />
            <Text style={styles.address}> {item.address}</Text>
          </View>
        </View>

        <View style={styles.separator} />

        <Text
          style={{ marginBottom: 10, fontFamily: "Montserrat", fontSize: 18 }}
        >
          Description
        </Text>
        <Text style={styles.description}>
          This is a detailed description of the {item.name}. It is a delicious
          dish made with the freshest ingredients and cooked to perfection. Our{" "}
          {item.name} features a delightful combination of flavors, including
          savory spices, aromatic herbs, and succulent meats/vegetables
          (depending on the dish). Each bite offers a symphony of tastes that
          will tantalize your taste buds and leave you craving for more. Our
          skilled chefs meticulously prepare each component of the dish to
          ensure optimum flavor and texture. Whether you're a fan of hearty
          meals or seeking a lighter option, our {item.name} caters to all
          palates. Indulge in the rich, creamy sauce (if applicable) that
          complements the main ingredients, adding depth and richness to every
          bite. Accompanied by a side of fluffy rice/piping hot bread, our{" "}
          {item.name} is a complete meal that satisfies your hunger and delights
          your senses. Whether you're dining alone or with loved ones, our{" "}
          {item.name} promises a culinary experience that you won't soon forget.
          Treat yourself to a gastronomic adventure and savor the exquisite
          flavors of our signature dish today!
        </Text>
      </ScrollView>

      <View style={styles.buttonContainer}>
        
        <TouchableOpacity
          style={styles.callButton}
          // onPress={callSeller}
        >
          <Ionicons name="call-outline" size={33} color="#641dce" />
          {/* <Text style={styles.buttonText}>Call</Text> */}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.chatButton}
          // onPress={chatWithSeller}
        >
          <Ionicons name="chatbubbles-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Chat</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
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
  headerText: {
    fontSize: 25,
    fontFamily: "ComfortaaBold",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 50,
    marginBottom: 20,
    marginVertical: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  name: {
    fontSize: 35,
    color: "#333",
    fontFamily: "Poppins-SemiBold",
  },
  itemCondition: {
    fontSize: 21,
    color: "#1c40bd",
    fontFamily: "ComfortaaBold",
    textAlign: 'left',
    color: '#434048',
    marginBottom: 10,
  },
  price: {
    fontSize: 35,
    color: "#1c40bd",
    marginBottom: 20,
    fontWeight: "600",
    fontFamily: "Montserrat",
  },
  user: {
    fontSize: 18,
    color: "#434048",
    fontFamily: "ComfortaaBold",
  },
  address: {
    fontSize: 18,
    color: "#434048",
    fontFamily: "ComfortaaBold",
  },
  description: {
    fontSize: 18,
    color: "#666",
    lineHeight: 24,
    textAlign: "justify",
  },
  buttonContainer: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems:'center',
    padding: 20,
    backgroundColor: "#fefcff",
    borderTopWidth: 1,
    borderTopColor: "#dddddd",
  },
  chatButton: {
    backgroundColor: "#1c40bd",
    padding: 15,
    paddingHorizontal:'33%',
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent:'center',
    marginLeft:10
  },
  callButton: {
    backgroundColor: "#e5d8fa",
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 21,
    fontFamily: "Poppins-SemiBold",
    marginLeft: 10,
  },
  separator: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dotted',
    marginVertical: 20,
  },
});
