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
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getFirestore, collection, getDocs, doc, updateDoc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from "expo-font";
import SPACING from "../utils/Spacing";
import { app } from '../services/config';
import ChatMessage from "../components/ChatMessage";

const db = getFirestore(app);

const dpToPixels = (dp) => {
  const scale = Platform.OS === "ios" ? 2 : 1;
  return dp * scale;
};

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUserFullName, setCurrentUserFullName] = useState(null);

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
    const fetchCurrentUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const jsonObj = JSON.parse(userData);
          setCurrentUserId(jsonObj.userId);
          setCurrentUserFullName(jsonObj.fullName);
        }
      } catch (error) {
        console.error("Error fetching current user data:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const usersData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = users.filter(user =>
        user.fullName && user.fullName.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  }, [searchQuery, users]);

  useEffect(() => {
    const loadChatHistory = async () => {
      try {
        const storedHistory = await AsyncStorage.getItem('chatHistory');
        if (storedHistory) {
          setChatHistory(JSON.parse(storedHistory));
        }
      } catch (error) {
        console.error('Failed to load chat history', error);
      }
    };

    loadChatHistory();
  }, []);

  useEffect(() => {
    if (currentUserId) {
      // Real-time listener for the current user's chat history and newMessagesCount
      const unsubscribe = onSnapshot(doc(db, "users", currentUserId), (doc) => {
        const data = doc.data();
        if (data) {
          const updatedChatHistory = (data.chatHistory || []).map(chatUser => ({
            ...chatUser,
            newMessagesCount: chatUser.newMessagesCount || 0,
          }));
          setChatHistory(updatedChatHistory);
        }
      });

      return () => unsubscribe();
    }
  }, [currentUserId]);

  const handleChatPress = async (user) => {
    // Navigate to chat screen
    navigation.navigate('SendMessageScreen', { userId: user.userId, name: user.fullName });

    // Check if the user already exists in chat history
    const userExists = chatHistory.some(chatUser => chatUser.userId === user.userId);
    if (!userExists) {
      const updatedChatHistory = [...chatHistory, user];
      setChatHistory(updatedChatHistory);

      try {
        await AsyncStorage.setItem('chatHistory', JSON.stringify(updatedChatHistory));
      } catch (error) {
        console.error('Failed to save chat history', error);
      }
    }

    // Update Firestore with the new chat participants
    const chatId = [currentUserId, user.userId].sort().join("_");
    const chatRef = doc(db, "chats", chatId);
    const chatDoc = await getDoc(chatRef);

    if (chatDoc.exists()) {
      const chatData = chatDoc.data();
      const participants = chatData.participants;
      if (!participants.includes(currentUserId)) {
        participants.push(currentUserId);
      }
      if (!participants.includes(user.userId)) {
        participants.push(user.userId);
      }
      await updateDoc(chatRef, { participants });
    } else {
      await setDoc(chatRef, {
        participants: [currentUserId, user.userId],
        messages: []
      });
    }

    // Update the chat history for both users
    await updateChatHistoryForUser(currentUserId, user);
    await updateChatHistoryForUser(user.userId, { userId: currentUserId, fullName: currentUserFullName, profilePic: "path/to/profilePic" });

    // Update chatHistoryUsers for both users
    await updateChatHistoryUsersForUser(currentUserId, user.userId);
    await updateChatHistoryUsersForUser(user.userId, currentUserId);

    // Load the updated chat history for the current user
    await loadChatHistory();
  };

  const updateChatHistoryForUser = async (userId, newChatUser) => {
    try {
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const chatHistory = userData.chatHistory || [];
        const chatExists = chatHistory.some(chatUser => chatUser.userId === newChatUser.userId);
        if (!chatExists) {
          const updatedChatHistory = [...chatHistory, newChatUser];
          await updateDoc(userRef, { chatHistory: updatedChatHistory });
        }
      }
    } catch (error) {
      console.error('Failed to update chat history for user', error);
    }
  };

  const updateChatHistoryUsersForUser = async (userId, chatUserId) => {
    try {
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const chatHistoryUsers = userData.chatHistoryUsers || [];
        if (!chatHistoryUsers.includes(chatUserId)) {
          chatHistoryUsers.push(chatUserId);
          await updateDoc(userRef, { chatHistoryUsers });
        }
      }
    } catch (error) {
      console.error('Failed to update chatHistoryUsers for user', error);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView>
      <View style={{ paddingVertical: SPACING * 1, paddingHorizontal: SPACING * 2 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: SPACING * 2.5, marginLeft: SPACING * 1.5, fontFamily: "ComfortaaBold" }}>
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
          data={filteredUsers.length > 0 ? filteredUsers : chatHistory}
          keyExtractor={(item) => item.userId}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleChatPress(item)}>
              <ChatMessage
                name={item.fullName}
                profilePic={item.profilePic}
                userId={item.userId}
                newMessagesCount={item.newMessagesCount} // Pass newMessagesCount to ChatMessage component
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
