// NavigationScreen.js

import React,{useState, useEffect} from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BottomTabNavigator from "../screens/BottomTabNavigator"; // Import your existing bottom tabs navigator
import ProfileScreen from "./ProfileScreen";
import SettingsScreen from "./SettingsScreen";
import SignOutScreen from "./SignOutScreen";
import CustomDrawer from "../components/CustomDrawer";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for icons
import AboutScreen from "./AboutScreen";
import FeedbackScreen from "./FeedBackScreen";
import ContactUsScreen from "./ContactUsScreen";
import TermsOfServiceScreen from './TermsOfServiceScreen'
import LogoutModal from "../components/LogoutModal";
import * as Location from 'expo-location';
import * as geolib from 'geolib';
// import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import { app } from '../services/config'

import AsyncStorage from '@react-native-async-storage/async-storage';

const database = getDatabase(app);

const canteen = { latitude: 17.494301782035425, longitude: 78.39279772477056 };

const Drawer = createDrawerNavigator();

function NavigationScreen() {
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [region, setRegion] = useState({
    latitude: 17.490271631314606,
    longitude: 78.3893836575882,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isNearCanteen, setIsNearCanteen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserFullName, setCurrentUserFullName] = useState('');
  
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData !== null) {
          const jsonObj = JSON.parse(userData);
          console.log(jsonObj)
          setCurrentUser(jsonObj.userId);
          setCurrentUserFullName(jsonObj.fullName);
        } else {
          console.log("No user data found in AsyncStorage");
        }
      } catch (error) {
        console.error("Failed to fetch user data from AsyncStorage", error);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const setupGeofencing = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission to access location was denied');
          return;
        }

        let { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
        if (backgroundStatus !== 'granted') {
          Alert.alert('Permission to access background location was denied');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location.coords);
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });

        Location.watchPositionAsync({ distanceInterval: 10 }, (newLocation) => {
          const coords = newLocation.coords;
          setCurrentLocation(coords);
          const nearCanteen = checkIfNearCanteen(coords);
          storeLocationInDatabase(coords, nearCanteen);
        });

        setInterval(async () => {
          const location = await Location.getCurrentPositionAsync({});
          const coords = location.coords;
          setCurrentLocation(coords);
          const nearCanteen = checkIfNearCanteen(coords);
          storeLocationInDatabase(coords, nearCanteen);
        }, 30000);
      } catch (error) {
        console.error('Error initializing geofencing:', error);
      }
    };

    setupGeofencing();
  }, [currentUser, currentUserFullName]);

  const checkIfNearCanteen = (coords) => {
    const distance = geolib.getDistance(coords, canteen);
    const isNear = distance <= 100; // 50 meters radius
    setIsNearCanteen(isNear);
    console.log('checkIfNearCanteen=>', isNear);
    return isNear;
  };

  const storeLocationInDatabase = (coords, isNearCanteen) => {
    const { latitude, longitude } = coords;
    const lastTime = new Date().toISOString();
    if (currentUser && currentUserFullName) {
      console.log(currentUser);
      set(ref(database, 'users/' + currentUser), {
        latitude,
        longitude,
        lastTime,
        userId: currentUser,
        userFullName: currentUserFullName,
        isNearCanteen
      });
    } else {
      console.warn('userId or userFullName is empty, data not saved to database.');
    }
  };

  const toggleLogoutModal = () => {
    setIsLogoutModalVisible(!isLogoutModalVisible);
  };

  const handleLogout = () => {
    // Implement logout logic here
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {
          marginLeft: -20,
          fontFamily: 'Comfortaa'
        },
        drawerActiveTintColor: '#fff',
        drawerActiveBackgroundColor: '#1d40bd',
        drawerInactiveTintColor: '#333'
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="information-circle" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="chatbox" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Terms Of Service"
        component={TermsOfServiceScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="document-text" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Contact Us"
        component={ContactUsScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="call" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default NavigationScreen;