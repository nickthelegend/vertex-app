import React, { useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import { getFirestore, collection, doc, setDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { app } from '../services/config';
import uuid from 'react-native-uuid';

const db = getFirestore(app);

export default function SendMessageScreen({ route }) {
  const { userId: otherUserId } = route.params;
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserFullName, setCurrentUserFullName] = useState(null);
    // console.log(currentUserFullName)
  const navigation = useNavigation();
    console.log(otherUserId)
  useEffect(() => {
    const fetchCurrentUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      const jsonObj = JSON.parse(userData);
      console.log(jsonObj.userId)
      setCurrentUser(jsonObj.userId);
      setCurrentUserFullName(jsonObj.fullName)
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    const chatId = currentUser > otherUserId ? `${currentUser}_${otherUserId}` : `${otherUserId}_${currentUser}`;
    const q = query(collection(db, 'chats', chatId, 'messages'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map(doc => {
        const firebaseData = doc.data();

        const data = {
          _id: doc.id,
          text: firebaseData.text,
          createdAt: firebaseData.createdAt.toDate(),
          user: {
            _id: firebaseData.user._id,
            name: firebaseData.user.name,
          },
        };

        return data;
      });

      setMessages(messages);
    });

    return () => unsubscribe();
  }, [currentUser, otherUserId]);

  const onSend = useCallback((messages = []) => {
    if (!currentUser) return;

    const { _id, createdAt, text, user } = messages[0];
    const chatId = currentUser > otherUserId ? `${currentUser}_${otherUserId}` : `${otherUserId}_${currentUser}`;

    setDoc(doc(collection(db, 'chats', chatId, 'messages'), _id || uuid.v4()), {
      _id: _id || uuid.v4(),
      createdAt,
      text,
      user,
    });

    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
  }, [currentUser, otherUserId]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <TouchableOpacity onPress={handleGoBack}>
          <Image source={require('../assets/icons/back.png')} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
      </View>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: currentUser,
          name: currentUserFullName,
        }}
        renderAvatarOnTop
        showUserAvatar
        renderUsernameOnMessage
        renderBubble={props => (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: '#007AFF'
              },
              left: {
                backgroundColor: '#f0f0f0'
              }
            }}
          />
        )}
        renderInputToolbar={props => (
          <InputToolbar
            {...props}
            containerStyle={{
              borderTopWidth: 1.5,
              borderTopColor: '#007AFF'
            }}
          />
        )}
      />
    </View>
  );
}
