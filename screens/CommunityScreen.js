import React from "react";
import { View, Text,Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacing from "../utils/Spacing";
import { TouchableOpacity } from "react-native-gesture-handler";
import CommunityTopic from "../components/CommunityTopic";

const handleOpenDrawer = () => {
  navigation.openDrawer();
};
export default function CommunityScreen() {
  return (
    <SafeAreaView>
      <View style={{ paddingVertical: Spacing, paddingHorizontal: Spacing }}>
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

            <Text
              style={{
                fontSize: SPACING * 2.7,
                color: "#1e40bc",
                fontFamily: "ComfortaaBold",
              }}
            >
              Hello, {userFullName}
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              style={{
                marginRight: SPACING * 2,
              }}
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
        <View
          style={{
            marginLeft: 15,
            marginTop: 10
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            Explore communities by topic
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              marginVertical: 5 ,
            }}
          >
            <CommunityTopic text={"Anime"}/>
            <CommunityTopic text={"Art"}/>
            <CommunityTopic text={"Business & Finance"}/>
            <CommunityTopic text={"Education & Carrer"}/>
            <CommunityTopic text={"Games"}/>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
