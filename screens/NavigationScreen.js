// NavigationScreen.js

import React from "react";
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
const Drawer = createDrawerNavigator();

function NavigationScreen() {
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
        
      {/* Add Feedback screen with Ionicons */}
      <Drawer.Screen
          name="Feedback"
          component={FeedbackScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="chatbox" color={color} size={size} />
            ),
          }}
        />
        {/* Add Terms of Service screen with Ionicons */}
        <Drawer.Screen
          name="Terms Of Service"
          component={TermsOfServiceScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="document-text" color={color} size={size} />
            ),
          }}
        />
        {/* Add Contact Us screen with Ionicons */}
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
