import 'react-native-gesture-handler';
import 'expo-linear-gradient';
import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import OnBoardingScreen from './screens/OnBoardingScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import MessagesPage from './screens/MessagesPage';
import CommunityScreen from './screens/CommunityScreen';
import ServicesScreen from './screens/ServicesScreen';
import ChatScreen from './screens/ChatScreen';
import PostScreen from './screens/PostScreen';
import NavigationScreen from './screens/NavigationScreen';
import ProfileScreen from './screens/ProfileScreen';
import SendMessage from './screens/SendMessage'
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    
      <Stack.Navigator initialRouteName="Register" screenOptions={({ route }) => ({
        headerShown: false,
        ...(route.name === 'CommunityScreen' || route.name === 'ServicesScreen' || route.name === 'ChatScreen' || route.name === 'PostScreen'
          ? { ...TransitionPresets.FadeFromBottomAndroid }
          : { ...TransitionPresets.SlideFromRightIOS }
        ),
      })}>
          
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MessagesPage" component={MessagesPage} />
        <Stack.Screen name="CommunityScreen" component={CommunityScreen} />
        <Stack.Screen name="ServicesScreen" component={ServicesScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="PostScreen" component={PostScreen} />
        <Stack.Screen name="NavigationScreen" component={NavigationScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="SendMessage" component={SendMessage} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
