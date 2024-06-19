import React, { useState } from "react";
import { View, Image, Text, ImageBackground, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Spacing from "../utils/Spacing";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons"; // Import FontAwesome5 icon set from Expo
import { MaterialIcons } from "@expo/vector-icons"; // Import MaterialIcons icon set from Expo
import { useNavigation } from "@react-navigation/native";

import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome icon set from Expo
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for icons
import { logoutUser } from "../utils/FireBaseFunctions";
import LogoutModal from "./LogoutModal";

const CustomDrawer = ({ userId, fullName, ...props }) => {
  console.log("fullName=>", fullName);
  const navigation = useNavigation();
  const handlePress = () => {
    // Navigate to the ProfileScreen within the stack navigator
    navigation.navigate("ProfileScreen");
  };
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.drawerContent}
      >
        <ImageBackground
          source={require("../assets/images/background.jpg")}
          style={{
            ...styles.drawerHeader,
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../assets/images/Avatar.png")}
              style={styles.avatar}
            />
            <View
              style={{
                flexDirection: "column",
              }}
            >
              <Text
                style={styles.userName}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {fullName}
              </Text>
              <Text style={{ color: "#fff", marginTop: -10, marginBottom: 10 }}>
                {userId}
              </Text>
            </View>

            {/* <Text style={styles.userCoins}>300 Coins</Text> */}
          </View>
          <TouchableOpacity
            style={{
              borderRadius: 20,
              overflow: "hidden", // Make sure to add this to prevent gradient overflow
            }}
            onPress={handlePress}
          >
            <LinearGradient
              colors={["#1d40bd", "#5075FA"]}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                alignItems: "center",
                justifyContent: "center",
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
                My Profile
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </ImageBackground>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                padding: Spacing * 2,
              }}
            >
              <FontAwesome5
                name="trophy"
                size={30}
                color="gold"
                style={{ marginRight: 8 }}
              />
              <Text style={{ fontSize: 24, marginRight: 8, color: "#000" }}>
                5
              </Text>
              <Text style={{ fontSize: 12, marginRight: 8, color: "#a6a6a6" }}>
                Achievements
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                padding: Spacing * 2,
              }}
            >
              <FontAwesome
                name="calendar"
                size={30}
                color="black"
                style={{ marginRight: 8 }}
              />

              <Text style={{ fontSize: 24, marginRight: 8, color: "#000" }}>
                11m 14d{" "}
              </Text>
              <Text style={{ fontSize: 12, marginRight: 8, color: "#a6a6a6" }}>
                Vertex Age
              </Text>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity>
            <View style={{ flexDirection: "column", alignItems: "center" ,padding: Spacing*2}}>
            <FontAwesome5 name="coins" size={30} color="black" style={{ marginRight: 8 }} />

              <Text style={{ fontSize: 24, marginRight: 8,color: '#000' }}>23 coins </Text>
              <Text style={{ fontSize: 12, marginRight: 8,color: '#a6a6a6' }}>Vertex Age</Text>
            </View>
          </TouchableOpacity> */}
        </View>

        <View style={styles.drawerItemsContainer}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Settings");
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: Spacing * 2,
            }}
          >
            <Ionicons name="settings" color={"black"} size={24} />
            <Text style={{ fontFamily: "Comfortaa", marginLeft: 10 }}>
              {" "}
              Settings
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            await logoutUser().then(() =>
              navigation.reset({
                index: 0, // Set the index of the screen to navigate to
                routes: [{ name: "Login" }], // Set the route to navigate to (Login screen)
              })
            );
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: Spacing * 2,
            }}
          >
            <Ionicons name="log-out" color={"black"} size={24} />
            <Text style={{ fontFamily: "Comfortaa", marginLeft: 10 }}>
              {" "}
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.footerText}>Made With ❤️ In JNTU</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    backgroundColor: "#1d40bd",
  },
  drawerHeader: {
    padding: Spacing * 2,
    // justifyContent: "center",
    // alignItems: "center",
  },
  avatar: {
    borderRadius: Spacing * 20,
    height: Spacing * 10,
    width: Spacing * 10,
    marginBottom: Spacing * 2,
    marginRight: Spacing,
  },
  userName: {
    fontFamily: "Comfortaa",
    fontSize: Spacing * 4,
    color: "#fff",
    width: 150,
  },
  userCoins: {
    marginTop: -10,
    fontFamily: "Comfortaa",
    fontSize: Spacing * 2,
    color: "#fff",
  },
  drawerItemsContainer: {
    backgroundColor: "#fff",
    paddingTop: Spacing * 2,
  },
  footer: {
    padding: Spacing * 2,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  footerText: {
    fontFamily: "Comfortaa",
  },
});

export default CustomDrawer;
