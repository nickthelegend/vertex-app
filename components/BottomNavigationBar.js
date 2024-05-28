import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, PixelRatio,Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";

// Function to convert pixels to dp
const scaleSize = (size) => {
  const ratio = size / 375; // Design dimension width (for example, iPhone 11 width)
  const newSize = PixelRatio.roundToNearestPixel(ratio * Dimensions.get("window").width);
  return newSize;
};

export default function BottomNavigationBar() {
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // Check if the screen is focused

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconButtons}
        onPress={() => navigateToScreen("Home")}
      >
        <Ionicons
          name="home"
          size={scaleSize(24)}
          color={isFocused ? "#1e40bc" : "black"} // Change color when focused
        />
        <Text style={{ color: isFocused ? "#1e40bc" : "black" }}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.iconButtons}
        onPress={() => navigateToScreen("CommunityScreen")}
      >
        <Ionicons
          name="people"
          size={scaleSize(24)}
          color={isFocused ? "#1e40bc" : "black"} // Change color when focused
        />
        <Text style={{ color: isFocused ? "#1e40bc" : "black" }}>
          Community
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          top: scaleSize(-50),
          left: scaleSize(-10),
          justifyContent: "center",
          alignItems: "center",
          ...styles.shadow,
        }}
        onPress={() => navigateToScreen("PostScreen")}
      >
        <View
          style={{
            width: scaleSize(70),
            height: scaleSize(70),
            borderRadius: scaleSize(35),
            backgroundColor: "#1d40bd",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../assets/icons/add.png")}
            style={{
              width: "50%",
              height: "50%",
              tintColor: "white",
            }}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.iconButtons}
        onPress={() => navigateToScreen("ServicesScreen")}
      >
        <Ionicons
          name="briefcase"
          size={scaleSize(24)}
          color={isFocused ? "#1e40bc" : "black"} // Change color when focused
        />
        <Text style={{ color: isFocused ? "#1e40bc" : "black" }}>Services</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.iconButtons}
        onPress={() => navigateToScreen("ChatScreen")}
      >
        <Ionicons
          name="chatbubbles"
          size={scaleSize(24)}
          color={isFocused ? "#1e40bc" : "black"} // Change color when focused
        />
        <Text style={{ color: isFocused ? "#1e40bc" : "black" }}>Chats</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: scaleSize(20),
    paddingBottom: scaleSize(10),
    paddingTop: scaleSize(20),
    borderRadius: scaleSize(50),
    marginHorizontal: scaleSize(20),
    borderTopWidth: scaleSize(1),
    borderTopColor: "#ccc",
  },
  iconButtons: {
    flexDirection: "column",
    alignItems: "center",
  },
  emptySpace: {
    width: scaleSize(24),
  },
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: scaleSize(10),
    },
    shadowOpacity: 0.25,
    shadowRadius: scaleSize(3.5),
    elevation: scaleSize(5),
  },
});
