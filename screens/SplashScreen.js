import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";
import { useFonts } from "expo-font";
import COLORS from "../utils/Colors.js";
import SPACING from "../utils/Spacing.js";
import * as Animatable from "react-native-animatable";
import SignupComponent from "../components/SignupComponent.js";
// import ConnectionStatus from "../utils/FireBaseConfig.js";

export default function SplashScreen({ navigation }) {
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    AudioWideFont: require("../fonts/Audiowide-Regular.ttf"),
    Comfortaa: require("../fonts/Comfortaa-VariableFont_wght.ttf"),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("OnBoarding"); // Replace 'NextScreen' with the name of your next screen
    }, 3000); // 3000 milliseconds = 3 seconds

    // Clear the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [navigation]);
  if (!fontsLoaded) {
    // Return a loading indicator or null until fonts are loaded
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.background,
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Animatable.View style={{ width: SPACING * 16, height: SPACING * 16 }}>
          <Image
            source={require("../assets/Group 103.png")}
            style={{ resizeMode: "contain", width: "100%", height: "100%" }}
          />
        </Animatable.View>
        <View style={{ alignItems: "center" }}>
          <Animatable.Text
            animation="flash"
            iterationCount="infinite"
            style={{ fontSize: SPACING * 8, fontFamily: "AudioWideFont" }}
          >
            Vertex
          </Animatable.Text>
          <Text style={{ fontFamily: "Comfortaa", fontWeight: "condensed" }}>
            Where Paths Converge and Necessities Merge
          </Text>
          {/* <ConnectionStatus/> */}
        </View>
        <SignupComponent/>
      </View>

      {/* Footer
            <View style={{position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'gray', paddingVertical: 10,alignItems:'center',justifyContent:'center'}}>
            <Text style={{textAlign: 'center', color: 'white'}}>Made with <PulseHeart/> in Hyderabad</Text>

            
            </View> */}
    </View>
  );
}
