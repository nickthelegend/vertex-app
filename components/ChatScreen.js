// screens/ChatScreen.js

import React from "react";
import { FlatList, View } from "react-native";
import ChatMessage from "./ChatMessage";

const chats = [
  { id: "9552a37a-e3c8-43d2-b1db-66d86788d1c9", name: "Nicolas", newMessages: 2, profilePic: "https://www.presidentofindia.gov.in/themes/presidentofindia/images/about.jpg" },
  { id: "8ea72854-5612-4032-b23d-474899cf797a", name: "asd", newMessages: 1, profilePic: "https://example.com/user2.jpg" },
  // Add more chat data here
];

export default function ChatScreen({ navigation }) {
  return (
    <View>
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatMessage
            name={item.name}
            newMessages={item.newMessages}
            profilePic={item.profilePic}
            userId={item.id}
          />
        )}
      />
    </View>
  );
}
