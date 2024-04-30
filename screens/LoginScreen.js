import React from "react";
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

export default function LoginScreen() {
  const navigation = useNavigation();

  const handleCreateAccount = () => {
    navigation.navigate("Register");
  };

  const hangleLogin = () => {
    navigation.navigate("Register");
  };
  const deviceWidth = Dimensions.get("window").width;

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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      enabled
      keyboardVerticalOffset={30}
    >
      <ScrollView>
        <View>
          <Animatable.View
            animation="slideInRight"
            style={{ alignItems: "center" }}
          >
            <LottieView
              style={{
                width: 400,
                height: 400,
              }}
              source={require("../assets/lottie/Login.json")}
              autoPlay
              loop
            />
          </Animatable.View>
          <View style={{}}>
            <View
              style={{ marginLeft: SPACING * 2, marginHorizontal: SPACING * 3 }}
            >
              <Text
                style={{
                  fontSize: SPACING * 5,
                  fontFamily: "ComfortaaBold",
                  fontWeight: 300,
                }}
              >
                Login
              </Text>
            </View>

            <View
              style={{
                marginLeft: SPACING * 2,
                marginHorizontal: SPACING * 3,
                marginVertical: 10,
              }}
            >
              <CustomTextField
                hint="Roll Number"
                drawableStart={
                  <AntDesign name="idcard" size={24} color="black" />
                }
              />

              <CustomTextField
                hint="Password"
                secureTextEntry={true}
                drawableStart={
                  <MaterialIcons name="password" size={24} color="black" />
                }
              />
              <View
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <Text
                  style={{
                    marginVertical: SPACING * 1,
                    marginHorizontal: SPACING,
                    color: "#1F41BB",
                    fontFamily: "Poppins-SemiBold",
                  }}
                >
                  Forgot Password?
                </Text>
              </View>

              <View>
                <CustomButton text="Login" onPress={hangleLogin} />
              </View>

              <View>
                <TouchableOpacity style={{}} onPress={handleCreateAccount}>
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#000",
                      fontFamily: "Poppins-SemiBold",
                      fontSize: SPACING * 1.6,
                    }}
                  >
                    Create an Account
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
