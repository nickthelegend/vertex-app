import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import Spacing from "../utils/Spacing";
import { SafeAreaView } from "react-native-safe-area-context";

// Importing the images
import mapImage from '../images/map.png';
import deliveryMan from '../images/delivery-man.png';
import opportunity from '../images/opportunity.png';
import ads from '../images/ads.png';
import campus from '../images/campus.png';

// import other images as needed

const servicesData = [
  { id: '1', title: 'University Map', uri: mapImage },
  { id: '2', title: 'Order Food', uri: deliveryMan },
  { id: '3', title: 'Opportunities', uri: opportunity },
  { id: '4', title: 'Classifieds', uri: ads },
  { id: '5', title: 'Alumni Connection', uri: campus },
];

export default function ServicesScreen() {
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
