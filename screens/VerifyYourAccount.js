import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as Animatable from "react-native-animatable";
import LottieView from "lottie-react-native";
import { useFonts } from "expo-font";
import SPACING from "../utils/Spacing";
import CustomTextField from "../components/CustomTextField";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Spacing from "../utils/Spacing";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import LoadingIndicator from "../components/LoadingIndicator";
import loginUser from "../utils/api.js";
export default function VerifyYourAccount() {

    const navigation = useNavigation()
  
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
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ alignItems: "center", flex: 1, padding: 20, marginTop: 100 }}>
          <LottieView
            style={{ width: 300, height: 300 }}
            source={require("../assets/lottie/Register.json")}
            autoPlay
            loop
            onError={(error) => console.log("Lottie Error:", error)}
            onAnimationFinish={() => console.log("Animation Finished")}
          />
          <View style={{ alignItems: "center", marginBottom: 50 }}>
            <Text style={{ fontSize: SPACING * 3, fontFamily: "ComfortaaBold", textAlign: "center", marginBottom: 20 }}>
              Verify Your Account
            </Text>
            <View style={{ paddingHorizontal: 20 }}>
              <Text style={{ textAlign: "center", fontSize: 15 }}>
                To ensure the security of your account and comply with regulatory requirements, we need to verify your identity.
                <Text style={{ fontWeight: "bold" }}> You will be done in 5 mins!</Text>
              </Text>
            </View>
        </View>
       
          <View style={{ position: "absolute", bottom: 20, left: 0, right: 0 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#1F41BB",
                padding: 20,
                paddingHorizontal: 40,
                borderRadius: 10,
                marginHorizontal: 30,
              }}
              onPress={()=>{navigation.navigate('AccountDetails')}}
            >
              <Text style={{ textAlign: "center", color: "#fff", fontSize: 18, fontFamily: "Poppins-SemiBold" }}>
                Start Verification
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
  
}
