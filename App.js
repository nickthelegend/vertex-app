import 'react-native-gesture-handler';
import 'expo-linear-gradient';
import React from 'react';
// import ImagePicker from 'react-native-image-crop-picker';
import { AppRegistry } from 'react-native';
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
import ChatScreen from './components/ChatScreen';
import PostScreen from './screens/PostScreen';
import NavigationScreen from './screens/NavigationScreen';
import ProfileScreen from './screens/ProfileScreen';
import SendMessage from './screens/SendMessage'
import VerificationScreen from './screens/VerificationScreen';
import VerifyYourAccount from './screens/VerifyYourAccount';
import AccountDetails from './screens/AccountDetails';
import 'react-native-get-random-values'
import SettingsScreen from './screens/SettingsScreen';
import { useFonts } from "expo-font";
import CommunityPage from './screens/CommunityPage';
import UniversityMap from './screens/UniversityMap';
import OrderFood from './screens/OrderFood';
import FoodDetail from './screens/FoodDetail';
import CartScreen from './screens/CartScreen';
import OpportunitiesScreen from './screens/OpportunitiesScreen';
import MarketPlace from './screens/MarketPlace';
import AdDetails from './screens/AdDetails';
import CategoryBooks from './screens/CategoryBooks';
import FilterScreen from './screens/FilterScreen';
import CreateSellAd from './screens/CreateSellAd';
import SendMessageScreen from './screens/SendMessageScreen';
import DeliveryLocation from './screens/DeliveryLocation';
import DeliveryStatus from './screens/DeliveryStatus';

const Stack = createStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    AudioWideFont: require("./fonts/Audiowide-Regular.ttf"),
    Comfortaa: require("./fonts/Comfortaa-VariableFont_wght.ttf"),
    ComfortaaBold: require("./fonts/Comfortaa-Bold.ttf"),
    Montserrat: require("./fonts/Montserrat-Bold.ttf"),
    "Poppins-SemiBold": require("./fonts/Poppins-SemiBold.ttf"),
    Baumans: require('./fonts/Baumans/Baumans-Regular.ttf'),
    'Lato-Bold': require('./fonts/Lato/Lato-Bold.ttf'),
    'Lato-Regular': require('./fonts/Lato/Lato-Regular.ttf'),
    NotoSansGrantha: require('./fonts/Noto_Sans_Grantha/NotoSansGrantha-Regular.ttf'),
    NotoSansKawi: require('./fonts/Noto_Sans_Kawi/NotoSansKawi-VariableFont_wght.ttf')



  });

  if (!fontsLoaded) {
    // Return a loading indicator or null until fonts are loaded
    return null;
  }
  return (
    <NavigationContainer>
    
      <Stack.Navigator initialRouteName="OrderFood" screenOptions={({ route }) => ({
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
        <Stack.Screen name="Verification" component={VerificationScreen}/>
        <Stack.Screen name="VerifyYourAccount" component={VerifyYourAccount}/>
        <Stack.Screen name="AccountDetails" component={AccountDetails}/>
        <Stack.Screen name="Settings" component={SettingsScreen}/>
        <Stack.Screen name="CommunityPage" component={CommunityPage}/>
        <Stack.Screen name="UniversityMap" component={UniversityMap}/>
        <Stack.Screen name="OrderFood" component={OrderFood}/>
        <Stack.Screen name="FoodDetail" component={FoodDetail}/>
        <Stack.Screen name="CartScreen" component={CartScreen} />
        <Stack.Screen name="OpportunitiesScreen" component={OpportunitiesScreen}/>
        <Stack.Screen name="MarketPlace" component={MarketPlace}/>
        <Stack.Screen name="AdDetail" component={AdDetails}/>
        <Stack.Screen name="CategoryBooks" component={CategoryBooks}/>
        <Stack.Screen name="FilterScreen" component={FilterScreen}/>
        <Stack.Screen name="CreateSellAd" component={CreateSellAd}/>
        <Stack.Screen name="SendMessageScreen" component={SendMessageScreen}/>
        <Stack.Screen name="DeliveryLocation" component={DeliveryLocation} />
        <Stack.Screen name="DeliveryStatus" component={DeliveryStatus} />

        {/* <Stack.Screen name="PostScreen" compornt */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
