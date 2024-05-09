import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import Spacing from "../utils/Spacing";
import { SafeAreaView } from "react-native-safe-area-context";
const servicesData = [
  { id: '1', title: 'Ride' },
  { id: '2', title: 'Eats' },
  { id: '3', title: 'Freight' },
  { id: '4', title: 'Business' },
  { id: '5', title: 'Transit' },
];

export default function ServicesScreen() {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={{ flex: item.id === '5' ? 0.5 : 1, margin: 10, backgroundColor: '#fff', borderRadius: 10, height: 110, justifyContent: 'flex-end' }}>
      <Text style={{ alignSelf: 'flex-start', marginLeft: 10, marginBottom: 10 }}>{item.title}</Text>
    </TouchableOpacity>
  );
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: Spacing }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: Spacing * 2.5,
              marginLeft: Spacing * 1.5,
              fontFamily: "ComfortaaBold",
            }}
          >
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
