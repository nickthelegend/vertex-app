import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import { useFonts } from 'expo-font';
import SPACING from '../utils/Spacing';
import { useNavigation } from '@react-navigation/native';
export default function OnBoardingScreen() {

  const navigation = useNavigation();
  const handleDone = () => {
    navigation.navigate('Login')
  }
  const doneButton = ({ ...props }) => {


    return (<TouchableOpacity styles={ styles.doneButton} {...props}>

          <Text>Done     </Text>

    </TouchableOpacity>)
  }
  const [fontsLoaded] = useFonts({
    'AudioWideFont': require('../fonts/Audiowide-Regular.ttf'),
    'Comfortaa': require('../fonts/Comfortaa-VariableFont_wght.ttf'),
    'Montserrat': require('../fonts/Montserrat-Bold.ttf')
  });

  if (!fontsLoaded) {
    // Return a loading indicator or null until fonts are loaded
    return null;
  }

  return (


    <View style={{ flex: 1, alignItems: 'center', justifyContent: "center" }}>
      <Onboarding
      bottomBarHighlight={false}
        onDone={handleDone}
        onSkip={handleDone}
        DoneButtonComponent={doneButton}
        containerStyles={{ justifyContent: 'center', alignContent: 'center', paddingHorizontal: SPACING * 5 }}
        pages={[
          {
            backgroundColor: '#fff',
            image: (<LottieView style={styles.lottie} source={require("../assets/lottie/Welcome.json")} autoPlay loop />),
            title: <Text style={styles.title}>Welcome</Text>,
            subtitle: <Text style={styles.desc}>Welcome to Vertex, where paths converge and necessities merge. Join us for a journey of seamless exploration and endless possibilities!</Text>,
          },
          {
            backgroundColor: '#fff',
            image: (<LottieView style={styles.lottie} source={require("../assets/lottie/Connecting People.json")} autoPlay loop={true} />),
            title: <Text style={styles.title}>Connecting People</Text>,
            subtitle: <Text style={styles.desc}>Uniting minds, fostering friendships, sparking collaboration across the vibrant spectrum of campus life at your fingertips.</Text>,
          },
          {
            backgroundColor: '#fff',
            image: (<LottieView style={styles.lottie} source={require("../assets/lottie/Community.json")} autoPlay loop={true} />),
            title: <Text style={styles.title}>Community</Text>,
            subtitle: <Text style={styles.desc}>At Vertex's community hub, users share, help, and chat. Engage in discussions, share insights, and connect seamlessly.</Text>,
          },
          {
            backgroundColor: '#fff',
            image: (<LottieView style={styles.lottie} source={require("../assets/lottie/Register.json")} autoPlay loop={true} />),
            title: <Text style={styles.title}>Register Now</Text>,
            subtitle: <Text style={styles.desc}>Join Vertex: Connect with peers, share resources, and embark on a journey of community collaboration and support together..</Text>,
          },
        ]}
      />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottie: {
    width: 300,
    height: 400,
  },
  desc: { fontSize: SPACING * 1.7, fontFamily: 'Comfortaa', marginBottom: SPACING, textAlign: 'center' },
  title: { fontSize: SPACING * 4, fontFamily: 'Montserrat', marginBottom: SPACING, textAlign: 'center' },
  doneButton:{
      padding: SPACING*2,
      backgroundColor: '#e75627',
      borderBottomRightRadius:"100%",
      borderTopLeftRadius:"100%",
      marginRight:SPACING*3,
      paddingHorizontal:SPACING*3,
      flex:1
  }
});