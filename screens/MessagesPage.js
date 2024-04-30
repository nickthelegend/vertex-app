import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  Platform,
  ScrollView
} from "react-native";
import Spacing from "../utils/Spacing";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook for navigation
import CustomTextField from "../components/CustomTextField";
import SPACING from "../utils/Spacing";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomButton from "../components/CustomButton";
import MyButtonGroup from "../components/MyButtonGroup";
import ChatMessage from "../components/ChatMessage";
const dpToPixels = (dp) => {
  const scale = Platform.OS === "ios" ? 2 : 1;
  return dp * scale;
};

export default function MessagesPage() {
    const [activeButton, setActiveButton] = useState('inbox'); // State to track active button

  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };

  const padding = dpToPixels(17); // 17dp
  const borderRadius = dpToPixels(8); // 8dp
  const fontSize = dpToPixels(16); // 16dp
  const handleInbox = () => {};
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
    <SafeAreaView>
      <View
        style={{ paddingVertical: Spacing * 4, paddingHorizontal: Spacing * 2 }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={handleGoBack}>
            <Image
              source={require("../assets/icons/back.png")}
              style={{
                width: 30,
                height: 30,
              }}
            />
          </TouchableOpacity>

          <Text
            style={{
              fontSize: Spacing * 2.5,
              marginLeft: Spacing * 1.5,
              fontFamily: "ComfortaaBold",
            }}
          >
            Chats
          </Text>
        </View>
        <View
          style={{
            marginTop: SPACING,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: SPACING * 1,
              borderRadius: SPACING * 2,
              borderWidth: 3,
              borderColor: "#79a3ff",
              marginVertical: SPACING,
              backgroundColor: "#f1f4ff",
            }}
          >
            <View style={{ marginRight: 5 }}>
              <View
                style={{
                  borderRightWidth: 1,
                  borderRightColor: "gray",
                  paddingRight: 5,
                }}
              >
                <Image
                  source={require("../assets/icons/search.png")}
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
              </View>
            </View>

            <TextInput
              style={{
                flex: 1,
                paddingHorizontal: 1,
                fontSize: SPACING * 1.8,
                fontFamily: "Montserrat",
                color: "black",
                fontWeight: "100",
              }}
              placeholder={"Search"}
            />
          </View>
        </View>

        <MyButtonGroup/>


        <ScrollView >
              <ChatMessage/>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
