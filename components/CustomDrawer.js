import React, { useState,useEffect} from "react";
import { View, Image, Text, ImageBackground, StyleSheet, Switch, Alert } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import Spacing from "../utils/Spacing";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { logoutUser } from "../utils/FireBaseFunctions";
import LogoutModal from "./LogoutModal";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import * as geolib from "geolib";

const database = getDatabase(app);

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
          acceptingOrders:true
        });
      }
    }
  }
});

const CustomDrawer = ({ userId, fullName, ...props }) => {
  const [isOrderToggleOn, setIsOrderToggleOn] = useState(true);
  const navigation = useNavigation();


  useEffect(() => {
    const checkIfTaskIsRunning = async () => {
      const isTaskRunning = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
      setIsOrderToggleOn(isTaskRunning);
    };
    checkIfTaskIsRunning();
  }, []);

  const handlePress = () => {
    navigation.navigate("ProfileScreen");
  };

  const handleToggleChange = async () => {
    const newToggleState = !isOrderToggleOn;
    setIsOrderToggleOn(newToggleState);
    if (!isOrderToggleOn) {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.High,
        timeInterval: 10000, // Update every 10 seconds
        distanceInterval: 0, // Update for every meter
      });
      // await set(ref(database, "users/" + userId + "/acceptingOrders"), true);

      console.log("Location tracking started");
    } else {

      try {

        const userData = await AsyncStorage.getItem("user");
        const currentUser = userData ? JSON.parse(userData) : null;
        if (currentUser) {
          await set(ref(database, "users/" + currentUser.userId + "/acceptingOrders"), false);

          await Location.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
          console.log("Location tracking stopped");

        }

      } catch (error) {
        console.log(error)
      }
      
    }
  };

  const handleSignOut = async () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            await logoutUser().then(() =>
              navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
              })
            );
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
        <ImageBackground
          source={require("../assets/images/background.jpg")}
          style={{
            ...styles.drawerHeader,
            borderBottomWidth: 1,
            borderBottomColor: "#ccc",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../assets/images/Avatar.png")}
              style={styles.avatar}
            />
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.userName} numberOfLines={1} ellipsizeMode="tail">
                {fullName}
              </Text>
              <Text style={{ color: "#fff", marginTop: -10, marginBottom: 10 }}>
                {userId}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              borderRadius: 20,
              overflow: "hidden",
            }}
            onPress={handlePress}
          >
            <LinearGradient
              colors={["#1d40bd", "#5075FA"]}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={{ color: "white", fontFamily: "Comfortaa" }}>My Profile</Text>
            </LinearGradient>
          </TouchableOpacity>
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleText}>Want to receive orders?</Text>
            <Switch
              trackColor={{ false: "#ff0000", true: "#00ff00" }}
              thumbColor="#f4f3f4"
              onValueChange={handleToggleChange}
              value={isOrderToggleOn}
            />
          </View>
        </ImageBackground>
        <View style={{ flexDirection: "row", backgroundColor: "#fff", alignItems: "center", justifyContent: "center" }}>
          <TouchableOpacity>
            <View style={{ flexDirection: "column", alignItems: "center", padding: Spacing * 2 }}>
              <FontAwesome5 name="trophy" size={30} color="gold" style={{ marginRight: 8 }} />
              <Text style={{ fontSize: 24, marginRight: 8, color: "#000" }}>5</Text>
              <Text style={{ fontSize: 12, marginRight: 8, color: "#a6a6a6" }}>Achievements</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{ flexDirection: "column", alignItems: "center", padding: Spacing * 2 }}>
              <FontAwesome name="calendar" size={30} color="black" style={{ marginRight: 8 }} />
              <Text style={{ fontSize: 24, marginRight: 8, color: "#000" }}>11m 14d</Text>
              <Text style={{ fontSize: 12, marginRight: 8, color: "#a6a6a6" }}>Vertex Age</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.drawerItemsContainer}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: Spacing * 2 }}>
            <Ionicons name="settings" color={"black"} size={24} />
            <Text style={{ fontFamily: "Comfortaa", marginLeft: 10 }}>Settings</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignOut}>
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: Spacing * 2 }}>
            <Ionicons name="log-out" color={"black"} size={24} />
            <Text style={{ fontFamily: "Comfortaa", marginLeft: 10 }}>Sign Out</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.footerText}>Made With ❤️ In JNTU</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    backgroundColor: "#1d40bd",
  },
  drawerHeader: {
    padding: Spacing * 2,
  },
  avatar: {
    borderRadius: Spacing * 20,
    height: Spacing * 10,
    width: Spacing * 10,
    marginBottom: Spacing * 2,
    marginRight: Spacing,
  },
  userName: {
    fontFamily: "Comfortaa",
    fontSize: Spacing * 4,
    color: "#fff",
    width: 150,
  },
  drawerItemsContainer: {
    backgroundColor: "#fff",
    paddingTop: Spacing * 2,
  },
  footer: {
    padding: Spacing * 2,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  footerText: {
    fontFamily: "Comfortaa",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },
  toggleText: {
    color: "#fff",
    fontFamily: "Comfortaa",
    fontSize: 16,
  },
});

export default CustomDrawer;
