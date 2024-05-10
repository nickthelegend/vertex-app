import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacing from "../utils/Spacing";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import CommunityTopic from "../components/CommunityTopic";
import currentUserProfilePic from "../assets/images/Avatar.png";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

export default function CommunityScreen() {
  const navigation = useNavigation();
  const handleOpenDrawer = () => {
    navigation.openDrawer();
  };
  const DATA = [
    { id: "1", title: "Item 1", members: "242", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { id: "2", title: "Item 2", members: "213", description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { id: "3", title: "Item 3", members: "534", description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." },
    { id: "4", title: "Item 4", members: "434", description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." },
    { id: "5", title: "Item 5", members: "134", description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
    
    // Add more items as needed
  ];
  
  const renderItem = ({ item }) => (
    <View
      style={{
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        borderColor: "#000",
        borderRadius: 15,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={require("../assets/images/Avatar.png")}
          style={{
            width: 35,
            height: 35,
            borderRadius: 20,
            marginRight: 5,
          }}
        />
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <Text
            style={{
              fontWeight: 700,
              // fontSize:12
            }}
          >
            {item.title}
          </Text>
          <Text
            style={
              {
                // fontWeight: 700,
                // fontSize:12
              }
            }
          >
            {item.members} members
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          {/* <TouchableOpacity>
            <LinearGradient
              colors={["#1d40bd", "#5075FA"]}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 5,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "Comfortaa",
                }}
              >
                Join
              </Text>
            </LinearGradient>
          </TouchableOpacity> */}
        </View>
      </View>

      <View>
       <Text>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingVertical: Spacing, paddingHorizontal: Spacing }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <TouchableOpacity onPress={handleOpenDrawer}>
            <Image
              source={currentUserProfilePic}
              style={{
                height: Spacing * 5,
                width: Spacing * 5,
                borderRadius: Spacing * 2,
                marginRight: Spacing * 2,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: Spacing * 2.7,
              fontFamily: "ComfortaaBold",
            }}
          >
            Communities
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontWeight: "bold" }}>
            Explore communities by topic
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginVertical: 5,
            }}
          >
            <CommunityTopic text={"Anime"} />
            <CommunityTopic text={"Art"} />
            <CommunityTopic text={"Business & Finance"} />
            <CommunityTopic text={"Coding"} />
            <CommunityTopic text={"Education & Carrer"} />
            <CommunityTopic text={"Games"} />
            <CommunityTopic text={"Food & Drinks"} />
            <CommunityTopic text={"Music"} />
            <CommunityTopic text={"Internet Culture"} />
            <CommunityTopic text={"Movies & TV"} />
            <CommunityTopic text={"Technology"} />
            <CommunityTopic text={"Sports"} />
            <CommunityTopic text={"Vehicles"} />
            <CommunityTopic text={"News"} />
            <CommunityTopic text={"Politics"} />
            <CommunityTopic text={"Websites"} />
          </View>
          <View style={{}}>
            <Text
              style={{
                fontFamily: "ComfortaaBold",
                fontSize: 20,
                marginBottom: 15,
              }}
            >
              Your Communities
            </Text>
            <FlatList
              data={DATA}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  communityContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    // backgroundColor: "red",
  },
  box: {
    width: "30%",
    height: "20%",
    aspectRatio: 2, // Adjust aspect ratio to make it rectangular
    backgroundColor: "lightblue",
    marginVertical: Spacing * 0.5,
    marginHorizontal: Spacing * 0.4,
  },
});
