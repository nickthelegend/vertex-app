import React,{useState,useRef,useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Platform
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
import LoadingIndicator from '../components/LoadingIndicator';
import { loginUser } from '../utils/FireBaseFunctions';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

// function handleRegistrationError(errorMessage) {
//   alert(errorMessage);
//   throw new Error(errorMessage);
// }

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  // if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      // handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      // handleRegistrationError('Project ID not found');
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e) {
      // handleRegistrationError(`${e}`);
    }
  // } 
  
  
  // else {
  //   handleRegistrationError('Must use physical device for push notifications');
  // }
}



export default function LoginScreen() {
  const navigation = useNavigation();
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [rollNumberError, setRollNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loadingVisible, setLoadingVisible] = useState(false); // State to control loading animation visibility
  const [registrationTriggered, setRegistrationTriggered] = useState(false); // New state variable to control registration trigger
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(undefined);
  const notificationListener = useRef();
  const responseListener = useRef();


  const handleCreateAccount = () => {
    navigation.navigate("Register");
  };

  const hangleLogin = async() => {
    setLoadingVisible(true);
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log("Login Clicked");
    if (!rollNumber.trim()) {
      setRollNumberError('Please enter Roll Number');
      setRegistrationTriggered(true);
      setLoadingVisible(false);
      return;
    } else {
      setRollNumberError('');
    }

// Validate Password
if (password.length < 6) {
  setPasswordError('Password must be at least 6 characters long');
  setRegistrationTriggered(true);
  setLoadingVisible(false);
  return;
} else {
  setPasswordError('');
}
try {
  // Call the registerUser function with the input values
  
  registerForPushNotificationsAsync()
      .then(async(token) => {
        if (token) {
          setExpoPushToken(token);
          // Register user with the push token              
          await loginUser(rollNumber,password,token);
          sendPushNotification(token)
          // navigation.navigate('VerifyYourAccount');
      setLoadingVisible(false);
        }
      })
      .catch(error => {
        console.error('Error getting push token:', error);
        setExpoPushToken(`${error}`);
      });
  // console.log('User registration successful:', response.user.sessionId);
  // showToast('success', 'User registered successfully'); // Show success toast
  // Optionally, navigate to another screen upon successful registration
  navigation.navigate('NavigationScreen');
} catch (error) {
  console.error('User registration failed:', error);
  // showToast('error', 'User registration failed'); // Show error toast
  setLoadingVisible(false);

  setPasswordError('Incorrect Password')

}
setLoadingVisible(false);


console.log('Roll:', rollNumber);

console.log('Password:', password);



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
                onChangeText={setRollNumber}
              />

<CustomTextField hint="Password" secureTextEntry={true} value={password} onChangeText={setPassword} drawableStart={<MaterialIcons name="password" size={24} color="black" />} />
              {passwordError ? <Text style={{ color: 'red' }}>{passwordError}</Text> : null}
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
      {loadingVisible && <LoadingIndicator />}

    </KeyboardAvoidingView>
  );
}
