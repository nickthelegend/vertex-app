import React, { useRef, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Carousel, { Pagination } from 'react-native-snap-carousel';

const { width: screenWidth } = Dimensions.get('window');

export default function AdDetails({ route }) {
  const { item } = route.params;
  const navigation = useNavigation();
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const renderItem = ({ item }) => (
    <View>
      <Image source={{ uri: item }} style={styles.image} />
    </View>
  );

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
        <Carousel
          ref={carouselRef}
          data={item.images}
          renderItem={renderItem}
          sliderWidth={screenWidth}
          itemWidth={screenWidth}
          layout={"default"}
          onSnapToItem={(index) => setActiveSlide(index)}
        />
        <Pagination
          dotsLength={item.images.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.paginationContainer}
          dotStyle={styles.dotStyle}
          inactiveDotStyle={styles.inactiveDotStyle}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />

        <View style={{ marginVertical: 20 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.name}>{item.productName}</Text>
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
              <Text style={styles.user}> {item.userFullName}</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "flex-end",
            }}
          >
            <Ionicons name="location-outline" size={18} color="#434048" />
            <Text style={styles.address}> {item.hostel}</Text>
          </View>
        </View>

        <View style={styles.separator} />

        <Text style={{ marginBottom: 10, fontFamily: "Montserrat", fontSize: 18 }}>
          Description
        </Text>
        <Text style={styles.description}>
          {item.description}
        </Text>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.callButton} onPress={()=>{Linking.openURL(`tel:${item.phoneNumber}`)}}>
          <Ionicons name="call-outline" size={33} color="#641dce" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.chatButton}>
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
    width: screenWidth,
    height: 300,
    borderRadius: 20,
    marginBottom: 20,
    marginVertical: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    resizeMode:'center'
  },
  paginationContainer: {
    paddingVertical: 8,
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: '#1c40bd',
  },
  inactiveDotStyle: {
    backgroundColor: '#434048',
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
    textAlign: "left",
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
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fefcff",
    borderTopWidth: 1,
    borderTopColor: "#dddddd",
  },
  chatButton: {
    backgroundColor: "#1c40bd",
    padding: 15,
    paddingHorizontal: "33%",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
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
    borderColor: "#ddd",
    borderStyle: "dotted",
    marginVertical: 20,
  },
});
