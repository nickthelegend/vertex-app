import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import Spacing from "../utils/Spacing";
import { SafeAreaView } from "react-native-safe-area-context";

// Importing the images
import mapImage from '../images/map.png';
import deliveryMan from '../images/delivery-man.png';
import opportunity from '../images/opportunity.png';
import ads from '../images/ads.png';
import myorders from '../images/myorders.png';
import mydelivery from '../images/mydelivery.jpg'
import { useNavigation } from "@react-navigation/native";

// import other images as needed

const servicesData = [
  { id: '1', title: 'University Map', uri: mapImage,route: "UniversityMap" },
  { id: '2', title: 'Order Food', uri: deliveryMan , route: "OrderFood" },
  { id: '3', title: 'Opportunities', uri: opportunity, route: "OpportunitiesScreen" },
  { id: '4', title: 'Marketplace', uri: ads, route: "MarketPlace" },
  { id: '5', title: 'My Orders', uri: myorders , route: "MyOrders"},
  { id: '5', title: 'My Delivery', uri: mydelivery , route: "MyDelivery"},

];


export default function ServicesScreen() {

  const navigation = useNavigation();
  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={{ 
        flex: item.id === '5' ? 0.5 : 1, 
        margin: 10, 
        backgroundColor: '#fff', 
        borderRadius: 10, 
        height: 110, 
        justifyContent: 'flex-end', 
        padding: 10 
      }}
      onPress={()=>{
        navigation.navigate(item.route)
      }}
    >
      <Text style={{ alignSelf: 'flex-start', marginBottom: 10 }}>{item.title}</Text>
      {item.uri ? (
        <Image 
          source={item.uri} 
          style={{ width: 40, height: 40, position: 'absolute', bottom: 10, right: 10 }} 
          resizeMode="contain" 
        />
      ) : null}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: Spacing }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: Spacing * 2.5, marginLeft: Spacing * 1.5, fontFamily: "ComfortaaBold" }}>
            Services
          </Text>
        </View>
        <FlatList
          style={{ flex: 1 }}
          data={servicesData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
}
