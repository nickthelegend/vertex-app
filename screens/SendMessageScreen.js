import React, { useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, Image, StyleSheet,Text } from 'react-native';
import { GiftedChat, Bubble, InputToolbar, Send, Composer } from 'react-native-gifted-chat';
import { getFirestore, collection, doc, setDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { app } from '../services/config';
import uuid from 'react-native-uuid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native'
import ProfilePicture from '../components/ProfilePicture';

const db = getFirestore(app);

export default function SendMessageScreen({ route }) {
  const { userId: otherUserId, name: fullName } = route.params;
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserFullName, setCurrentUserFullName] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      const jsonObj = JSON.parse(userData);
      setCurrentUser(jsonObj.userId);
      setCurrentUserFullName(jsonObj.fullName);
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

  console.log(fullName)
  return (
    <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#1c40bd" translucent = {true}/>

      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#1c40bd',borderBottomLeftRadius:20,borderBottomRightRadius:20 }}>
      
        <TouchableOpacity onPress={handleGoBack}>
          <Image source={require('../assets/icons/back.png')} style={{ width: 30, height: 30, tintColor: 'white' }} />
        </TouchableOpacity>

        <ProfilePicture fullName= {fullName}/>
        <Text style={styles.headerTitle}>{fullName}</Text>
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
                backgroundColor: '#34B7F1',
              },
              left: {
                backgroundColor: '#ECE5DD',
              },
            }}
            textStyle={{
              right: {
                color: 'white',
              },
              left: {
                color: 'black',
              },
            }}
          />
        )}
        renderInputToolbar={props => (
          <InputToolbar
            {...props}
            containerStyle={styles.inputToolbar}
          />
        )}
        renderSend={props => (
          <Send
            {...props}
            containerStyle={styles.sendContainer}
          >
            <Image source={require('../assets/icons/send.png')} style={styles.sendIcon} />
          </Send>
        )}
        renderComposer={props => (
          <Composer
            {...props}
            textInputStyle={styles.composer}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
      },
  headerTitle: {
    color: 'white',
    fontSize: 21,
    marginLeft: 10,
    fontFamily:'Comfortaa'
  },
  inputToolbar: {
    backgroundColor: '#ECE5DD',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
    padding:2
  },
  sendContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 5,
    marginLeft:5,
    backgroundColor:'#34B7F1',
    borderRadius:10,
    paddingHorizontal:5
  },
  sendIcon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
  composer: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginLeft: 10,
    marginRight: 5,
    marginBottom: 5,
  },
});
