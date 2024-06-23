import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import SPACING from '../utils/Spacing';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook for navigation
import { Ionicons } from "@expo/vector-icons";

export default function HomeHeader({ userFullName, userProfilePic }) {
  const navigation = useNavigation();

  const handleSearchPress = () => {
    // Redirect to the search page
    navigation.navigate('SearchPage'); // Replace 'SearchPage' with the name of your search page
  };

  const handleNotificationsPress = () => {
    // Redirect to the notifications page
    navigation.navigate('NotificationsPage'); // Replace 'NotificationsPage' with the name of your notifications page
  };

  const handleMessagesPress = () => {
    // Redirect to the messages page
    navigation.navigate('MessagesPage'); // Replace 'MessagesPage' with the name of your messages page
  };

  const handleOpenDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity onPress={handleOpenDrawer}>
          <Image
            source={userProfilePic}
            style={{
              height: SPACING * 5,
              width: SPACING * 5,
              borderRadius: SPACING * 2,
              marginRight: SPACING * 2,
              // Adjust the specific distance between avatar and text
            }}
          />
        </TouchableOpacity>

        {userFullName && (
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: SPACING * 2.7,
              color: "#1e40bc",
              fontFamily: "ComfortaaBold",
              width: 300, // Adjust the width of the text container
            }}
          >
            Hello, {userFullName}
          </Text>
        )}

        {!userFullName && (
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: SPACING * 2.7,
              color: "#1e40bc",
              fontFamily: "ComfortaaBold",
              width: 300, // Adjust the width of the text container
            }}
          >
            Home
          </Text>
        )}
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          style={{
            marginRight: SPACING * 2,
          }}
          onPress={handleSearchPress} // Corrected the onPress handler
        >
          <Image
            source={require("../assets/icons/search.png")}
            style={{
              width: 24,
              height: 24,
              resizeMode: "contain",
              tintColor: "black",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginRight: SPACING * 2,
          }}
          onPress={handleNotificationsPress} // Corrected the onPress handler
        >
          <Ionicons name="notifications" size={24} color="black" />
        </TouchableOpacity>

        {/* <TouchableOpacity 
            onPress={handleMessagesPress}
            >
              <Image
                source={require("../assets/icons/message.png")}
                style={{
                  width: 24,
                  height: 24,
                  resizeMode: "contain",
                  tintColor: "black",
                }}
              />
            </TouchableOpacity> */}
      </View>
    </View>
  );
}
