import * as React from 'react';
import { View, Text, StyleSheet, PixelRatio, Dimensions,Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { useFonts } from "expo-font";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NextScreen from '../screens/NextScreen';
import CommunityScreen from '../screens/CommunityScreen';
import ServicesScreen from '../screens/ServicesScreen';
import ChatScreen from '../screens/ChatScreen';
import PostScreen from '../screens/PostScreen';
import HomeScreen from './HomeScreen';
import scaleSize from '../utils/ScaleSize';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Tab = createBottomTabNavigator();
const CustomTabBarButton = ({ children, onPress }) => { // Add curly braces here
    return ( // Add return statement here
      <TouchableOpacity
        style={{
          top: scaleSize(-30),
          justifyContent: "center",
          alignItems: "center",
          ...styles.shadow,
        }}
        onPress={onPress}
      >
        <View
          style={{
            width: scaleSize(70),
            height: scaleSize(70),
            borderRadius: scaleSize(35),
            backgroundColor: "#1d40bd",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </View>
      </TouchableOpacity>
    ); // Add closing parenthesis here
  } // Add closing curly brace here
  
export default function BottomTabNavigator() {
    const isFocused = useIsFocused(); // Check if the screen is focused
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
    <Tab.Navigator
  screenOptions={({ route }) => ({
    "tabBarActiveTintColor": "#1e40bc",
  "tabBarInactiveTintColor": "black",
  "tabBarShowLabel": false,
  "tabBarStyle": [
    {
      "display": "flex",
      'height' : scaleSize(60),
      'borderRadius': scaleSize(15),
      'marginHorizontal': scaleSize(10),
      ...styles.shadow
    },
    null
  ],
    headerShown: false, // Hide header for all screens
    // tabBarIcon: ({ color, size }) => {
    //   let iconName;

    //   if (route.name === 'HomeScreen') {
    //     iconName = isFocused ? 'home' : 'home-outline';
    //   } else if (route.name === 'Community') {
    //     iconName = isFocused ? 'people' : 'people-outline';
    //   } else if (route.name === 'Services') {
    //     iconName = isFocused ? 'briefcase' : 'briefcase-outline';
    //   } else if (route.name === 'Chat') {
    //     iconName = isFocused ? 'chatbubbles' : 'chatbubbles-outline';
    //   } else if (route.name === 'Post') {
    //     iconName = 'add-circle-outline';
    //   }

    //   return <Ionicons name={iconName} size={size} color={color} />;
    // },
  })}
  
  
>
  {/* Add Tab.Screen components here */}

  <Tab.Screen
  name="HomeScreen"
  component={HomeScreen}
  options={({ color, size }) => ({
    tabBarIcon: ({ color, size, focused }) => (
         
      <TouchableOpacity>
        <View style={styles.tabIcon}>
          <Image
            source={require("../assets/icons/myvertex.png")}
            style={{
              width: scaleSize(size),
              height: scaleSize(size),
              tintColor: focused ? '#1e40bc' : 'black',
            }}
          />
          <Text style={[styles.tabText, { color: focused ? '#1e40bc' : 'black' }]}>My Vertex</Text>
        </View>
      </TouchableOpacity>
    ),
  })}
/>

<Tab.Screen
  name="Community"
  component={CommunityScreen}
  options={({ color, size }) => ({
    tabBarIcon: ({ color, size, focused }) => (
         
      <TouchableOpacity>
        <View style={styles.tabIcon}>
          <Image
            source={require("../assets/icons/community.png")}
            style={{
              width: scaleSize(size +2),
              height: scaleSize(size),
              tintColor: focused ? '#1e40bc' : 'black',
            }}
          />
          <Text style={[styles.tabText, { color: focused ? '#1e40bc' : 'black' }]}>Communities</Text>
        </View>
      </TouchableOpacity>
    ),
  })}
/>
  <Tab.Screen
    name="Post"
    component={PostScreen}
    options={{
      tabBarIcon: ({ color, size }) => (
          <Image
            source={require("../assets/icons/add.png")}
            style={{
              width: "50%",
              height: "50%",
              tintColor: "white",
            }}
          />
      ),
      tabBarButton: (props)=>(
        <CustomTabBarButton {...props}/>
      )
    }}
  />
  <Tab.Screen
  name="Services"
  component={ServicesScreen}
  options={({ color, size }) => ({
    tabBarIcon: ({ color, size, focused }) => (
         
      <TouchableOpacity>
        <View style={styles.tabIcon}>
          <Image
            source={require("../assets/icons/services.png")}
            style={{
              width: scaleSize(size +2),
              height: scaleSize(size),
              tintColor: focused ? '#1e40bc' : 'black',
            }}
          />
          <Text style={[styles.tabText, { color: focused ? '#1e40bc' : 'black' }]}>Services</Text>
        </View>
      </TouchableOpacity>
    ),
  })}
/>
<Tab.Screen
  name="Chat"
  component={ChatScreen}
  options={({ color, size }) => ({
    tabBarIcon: ({ color, size, focused }) => (
         
      <TouchableOpacity>
        <View style={styles.tabIcon}>
          <Image
            source={require("../assets/icons/chats.png")}
            style={{
              width: scaleSize(size +2),
              height: scaleSize(size),
              tintColor: focused ? '#1e40bc' : 'black',
            }}
          />
          <Text style={[styles.tabText, { color: focused ? '#1e40bc' : 'black' }]}>Chats</Text>
        </View>
      </TouchableOpacity>
    ),
  })}
/>
  
</Tab.Navigator>

  );
}

const styles = StyleSheet.create({
    tabIcon: {
      alignItems: 'center',
    },
    tabText: {
      fontSize: scaleSize(10),
      marginTop: scaleSize(4),
      fontFamily: 'Comfortaa'
    },
    shadow: {
        shadowColor: "#7F5DF0",
        shadowOffset: {
          width: 0,
          height: scaleSize(10),
        },
        shadowOpacity: 0.25,
        shadowRadius: scaleSize(3.5),
        elevation: scaleSize(5),
      },
    }
)