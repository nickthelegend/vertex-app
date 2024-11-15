import React, { useState,useEffect,useRef  } from 'react';
import { View, Text, StyleSheet, Dimensions, KeyboardAvoidingView, ScrollView, TouchableOpacity, Platform  } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';
import { useFonts } from 'expo-font';
import SPACING from '../utils/Spacing';
import CustomTextField from '../components/CustomTextField';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Spacing from '../utils/Spacing';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
// import { registerUser, loginUser } from '../utils/api';
import { showToast } from '../components/Toast'; // Import the showToast function
import LoadingIndicator from '../components/LoadingIndicator';
import { registerUser } from '../utils/FireBaseFunctions';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
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

function handleRegistrationError(errorMessage) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
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
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}


export default function RegisterScreen() {
  
  









  const navigation = useNavigation();
  const [rollNumber, setRollNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rollNumberError, setRollNumberError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loadingVisible, setLoadingVisible] = useState(false); // State to control loading animation visibility
  const [registrationTriggered, setRegistrationTriggered] = useState(false); // New state variable to control registration trigger
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(undefined);
  const notificationListener = useRef();
  const responseListener = useRef();



  const toLogin = () => {
    navigation.goBack();

  }

  const handleRegister = async () => {


    setLoadingVisible(true);
    
    // Simulate registration process (replace this with your actual registration logic)
    await new Promise(resolve => setTimeout(resolve, 2000));
    

      

    // Validate Roll Number
    if (!rollNumber.trim()) {
      setRollNumberError('Please enter Roll Number');
      setRegistrationTriggered(true);
      setLoadingVisible(false);
      return;
    } else {
      setRollNumberError('');
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setEmailError('Please enter a valid email address');
      setRegistrationTriggered(true);
      setLoadingVisible(false);
      return;
    } else {
      setEmailError('');
    }

    // Validate Phone Number
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.trim())) {
      setPhoneError('Please enter a valid phone number');
      setRegistrationTriggered(true);
      setLoadingVisible(false);
      return;
    } else {
      setPhoneError('');
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

      registerForPushNotificationsAsync()
      .then(token => {
        if (token) {
          setExpoPushToken(token);
          // Register user with the push token
          const userInfo = {
            username: rollNumber,
            password: password,
            email: email,
            phonenumber: phone,
            notificationToken: token,
            // Add other user info fields as needed
          };
          registerUser(userInfo).catch(error => {
            console.error('Error registering user:', error.message);
          });

          sendPushNotification(token)
          navigation.navigate('VerifyYourAccount');
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
      

    } catch (error) {
      console.error('User registration failed:', error);

      if(error.message == "Email already exists"){

        setEmailError(error.message)

      }

      if(error.message == "Username already exists"){

        setRollNumberError(error.message);

      }
      setLoadingVisible(false);

      // showToast('error', 'User registration failed'); // Show error toast
    }

    console.log('Register button pressed');
    console.log('Roll Number:', rollNumber);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Password:', password);



  }
  const deviceWidth = Dimensions.get('window').width;

  const [fontsLoaded] = useFonts({
    'AudioWideFont': require('../fonts/Audiowide-Regular.ttf'),
    'Comfortaa': require('../fonts/Comfortaa-VariableFont_wght.ttf'),
    'ComfortaaBold': require('../fonts/Comfortaa-Bold.ttf'),
    'Montserrat': require('../fonts/Montserrat-Bold.ttf'),
    'Poppins-SemiBold': require('../fonts/Poppins-SemiBold.ttf'),

  });

  if (!fontsLoaded) {
    // Return a loading indicator or null until fonts are loaded
    return null;
  }
  return (
    
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled keyboardVerticalOffset={30}>
      <ScrollView>
        <View>
          <Animatable.View animation="slideInRight" style={{ alignItems: 'center' }}>
            <LottieView style={{
              width: 400,
              height: 400,
            }} source={require("../assets/lottie/Register.json")} autoPlay loop />
          </Animatable.View>

          <View style={{}}>

            <View style={{ marginLeft: SPACING * 2, marginHorizontal: SPACING * 3, }}>

              <Text style={{ fontSize: SPACING * 5, fontFamily: 'ComfortaaBold', fontWeight: 300 }}>Register</Text>


            </View>

            <View style={{ marginLeft: SPACING * 2, marginHorizontal: SPACING * 3, marginVertical: 10 }}>

              <CustomTextField hint="Roll Number" value={rollNumber} onChangeText={setRollNumber} drawableStart={<AntDesign name="idcard" size={24} color="black" />} />
              {rollNumberError ? <Text style={{ color: 'red' }}>{rollNumberError}</Text> : null}
              <CustomTextField hint="Email" value={email} onChangeText={setEmail} drawableStart={<MaterialIcons name="email" size={24} color="black" />} />
              {emailError ? <Text style={{ color: 'red' }}>{emailError}</Text> : null}
              <CustomTextField numericKeyboard={true} hint="Phone" value={phone} onChangeText={setPhone} drawableStart={<MaterialIcons name="phone" size={24} color="black" />} />
              {phoneError ? <Text style={{ color: 'red' }}>{phoneError}</Text> : null}
              <CustomTextField hint="Password" secureTextEntry={true} value={password} onChangeText={setPassword} drawableStart={<MaterialIcons name="password" size={24} color="black" />} />
              {passwordError ? <Text style={{ color: 'red' }}>{passwordError}</Text> : null}




              <Animatable.View animation={registrationTriggered ? 'shake' : ''}>
                <CustomButton text="Register" onPress={handleRegister} />
              </Animatable.View>



              <View>

                <TouchableOpacity style={{}} onPress={toLogin}>



                  <Text style={{ textAlign: 'center', color: "#000", fontFamily: 'Poppins-SemiBold', fontSize: SPACING * 1.6 }} >Already a member ?</Text>

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


const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
});