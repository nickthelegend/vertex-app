import React, { useState, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
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
import TermsOfServiceScreen from "./TermsOfServiceScreen";
import LogoutModal from "../components/LogoutModal";
import * as Location from "expo-location";
import * as geolib from "geolib";
// import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from "firebase/database";
import { app } from "../services/config";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  updateDoc
} from "firebase/firestore";


import AsyncStorage from "@react-native-async-storage/async-storage";
import * as TaskManager from "expo-task-manager";
import * as Notifications from "expo-notifications";

// import * as Location from 'expo-location';r
const LOCATION_TASK_NAME = "com.nickthelegend.MyProject";
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error(error);
    return;
  }
  if (data) {
    const { locations } = data;
    const location = locations[0];
    if (location) {
      // Fetch the current user info from AsyncStorage
      const userData = await AsyncStorage.getItem("user");
      const currentUser = userData ? JSON.parse(userData) : null;
      if (currentUser) {
        const database = getDatabase(app);
        const coords = location.coords;
        const canteen = {
          latitude: 17.494301782035425,
          longitude: 78.39279772477056,
        };

        const distance = geolib.getDistance(coords, canteen);
        const isNearCanteen = distance <= 100; // 100 meters radius
        console.log("isNearCanteen=>", isNearCanteen);
        const lastTime = new Date().toISOString();

        await set(ref(database, "users/" + currentUser.userId), {
          latitude: coords.latitude,
          longitude: coords.longitude,
          lastTime,
          userId: currentUser.userId,
          userFullName: currentUser.fullName,
          isNearCanteen,
        });
      }
    }
  }
});

const startLocationUpdates = async () => {
  const { status: foregroundStatus } =
    await Location.requestForegroundPermissionsAsync();
  if (foregroundStatus !== "granted") {
    Alert.alert("Permission to access location was denied");
    return;
  }

  const { status: backgroundStatus } =
    await Location.requestBackgroundPermissionsAsync();
  if (backgroundStatus !== "granted") {
    Alert.alert("Permission to access background location was denied");
    return;
  }

  await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
    accuracy: Location.Accuracy.High,
    timeInterval: 10000, // 2 minutes in milliseconds
    distanceInterval: 0, // Minimum distance in meters between location updates
    foregroundService: {
      notificationTitle: "Location Tracking",
      notificationBody: "We are tracking your location in the background",
      notificationColor: "#1d40bd",
    },
  });
};

const Drawer = createDrawerNavigator();

function NavigationScreen() {
  const navigation = useNavigation();
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
  const [currentUserFullName, setCurrentUserFullName] = useState("");
  useEffect(() => {
    // Set notification categories for delivery requests
    Notifications.setNotificationCategoryAsync('delivery_request', [
      {
        identifier: 'accept',
        buttonTitle: 'Accept',
        options: { opensAppToForeground: true },
      },
      {
        identifier: 'decline',
        buttonTitle: 'Decline',
        options: { opensAppToForeground: false },
      },
    ]);
  
    // Handle notification responses
    // Define and add the response listener
  const responseListener = Notifications.addNotificationResponseReceivedListener(
    async (response) => {
      const { deliveryRequestId, orderId } = response.notification.request.content.data;
      console.log("data=>",deliveryRequestId)
      const firestore = getFirestore();

      console.log("Notification received:", response);

      if (response.actionIdentifier === 'accept') {
        console.log("User clicked accept for deliveryRequestId:", deliveryRequestId);

        const deliveryRequestRef = doc(firestore, 'deliveryRequests', deliveryRequestId);
        try {
          await updateDoc(deliveryRequestRef, {
            status: 'accepted',
            // responderId: currentUser,
          });
          console.log("Delivery request accepted:", deliveryRequestId);

          navigation.navigate('DeliveryAgentScreen', { deliveryRequestId });
        } catch (error) {
          console.error("Error updating delivery request to accepted:", error);
        }
      } else if (response.actionIdentifier === 'decline') {
        console.log("User clicked decline for deliveryRequestId:", deliveryRequestId);

        const deliveryRequestRef = doc(firestore, 'deliveryRequests', deliveryRequestId);
        try {
          await updateDoc(deliveryRequestRef, {
            status: 'declined',
            responderId: currentUser.userId,
          });
          console.log("Delivery request declined:", deliveryRequestId);
        } catch (error) {
          console.error("Error updating delivery request to declined:", error);
        }
      }
    }
  );
  
    // Request notification permissions
    const requestPermissions = async () => {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
    };
  
    requestPermissions();
  
    return () => {
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);
  

  useEffect(() => {
    startLocationUpdates();
  }, []);
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
          fontFamily: "Comfortaa",
        },
        drawerActiveTintColor: "#fff",
        drawerActiveBackgroundColor: "#1d40bd",
        drawerInactiveTintColor: "#333",
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
