import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  Platform,
  FlatList,
} from "react-native";
import Spacing from "../utils/Spacing";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../services/config';
import ChatMessage from "../components/ChatMessage";
import SPACING from "../utils/Spacing";

const dpToPixels = (dp) => {
  const scale = Platform.OS === "ios" ? 2 : 1;
  return dp * scale;
};

const db = getFirestore(app);

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [fontsLoaded] = useFonts({
    AudioWideFont: require("../fonts/Audiowide-Regular.ttf"),
    Comfortaa: require("../fonts/Comfortaa-VariableFont_wght.ttf"),
    ComfortaaBold: require("../fonts/Comfortaa-Bold.ttf"),
    Montserrat: require("../fonts/Montserrat-Bold.ttf"),
    "Poppins-SemiBold": require("../fonts/Poppins-SemiBold.ttf"),
  });

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersData = querySnapshot.docs.map(doc => doc.data());
      setUsers(usersData);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const upperCaseQuery = searchQuery.toUpperCase();
      const filtered = users.filter(user =>
        user.fullName.toLowerCase().includes(lowerCaseQuery) ||
        user.fullName.toUpperCase().includes(upperCaseQuery)
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  }, [searchQuery, users]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView>
      <View style={{ paddingVertical: Spacing * 4, paddingHorizontal: Spacing * 2 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={handleGoBack}>
            <Image
              source={require("../assets/icons/back.png")}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: Spacing * 2.5, marginLeft: Spacing * 1.5, fontFamily: "ComfortaaBold" }}>
            Chats
          </Text>
        </View>
        <View style={{ marginTop: SPACING }}>
          <View style={{ flexDirection: "row", alignItems: "center", padding: SPACING * 1, borderRadius: SPACING * 2, borderWidth: 3, borderColor: "#79a3ff", marginVertical: SPACING, backgroundColor: "#f1f4ff" }}>
            <View style={{ marginRight: 5 }}>
              <View style={{ borderRightWidth: 1, borderRightColor: "gray", paddingRight: 5 }}>
                <Image source={require("../assets/icons/search.png")} style={{ width: 24, height: 24 }} />
              </View>
            </View>
            <TextInput
              style={{ flex: 1, paddingHorizontal: 1, fontSize: SPACING * 1.8, fontFamily: "Montserrat", color: "black", fontWeight: "100" }}
              placeholder={"Search"}
              onChangeText={setSearchQuery}
              value={searchQuery}
            />
          </View>
        </View>
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChatMessage
              name={item.fullName}
              profilePic={item.profilePic}
              userId={item.userId}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
