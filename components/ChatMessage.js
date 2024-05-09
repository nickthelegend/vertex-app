import React from "react";
import { View, Text, Image, Touchable } from "react-native";
import { useFonts } from "expo-font";
import Spacing from "../utils/Spacing";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
export default function ChatMessage({name,newMessages,profilePic}) {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    AudioWideFont: require("../fonts/Audiowide-Regular.ttf"),
    Comfortaa: require("../fonts/Comfortaa-VariableFont_wght.ttf"),
    ComfortaaBold: require("../fonts/Comfortaa-Bold.ttf"),
    Montserrat: require("../fonts/Montserrat-Bold.ttf"),
    "Poppins-SemiBold": require("../fonts/Poppins-SemiBold.ttf"),
  });

  if (!fontsLoaded) {
    // Return a loading indicator or null until fonts are loaded
    return null;
  }
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("SendMessage");
      }}
    >
      <View
        style={{
          marginBottom: 10,
          borderBottomColor: "#1e41bc",
          borderBottomWidth: 1,
          paddingBottom:5
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            source={{uri: profilePic}}
            style={{
              width: 65,
              height: 65,
              marginRight: Spacing * 1,
            }}
          />
          <View>
            <Text
              style={{
                fontFamily: "ComfortaaBold",
                fontSize: Spacing * 1.6,
              }}
            >
              {name}
            </Text>
            <Text
              style={{
                color: "#f92382",
              }}
            >
              {newMessages ? `${newMessages} New Messages` : 'Seen Yesterday'}
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              alignItems: "flex-end",
            }}
          >
            <Image
              source={require("../assets/icons/camera.png")}
              style={{
                width: 30,
                height: 30,
                resizeMode: "contain",
              }}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
