import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getFirestore, collection, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { app } from '../services/config';
import { addNotification } from '../utils/FireBaseFunctions';



export default function NotificationsPage({ route }) {
  const navigation = useNavigation();
  const { currentUserId } = route.params;
  const [notifications, setNotifications] = useState([]);
  addNotification(currentUserId,{
    title: "New Notification",
    message: "This is a new notification",
    dateCreated: new Date()
  })
  useEffect(() => {
    const fetchNotifications = async () => {
      const db = getFirestore(app);
      const userDoc = await getDoc(doc(db, 'users', currentUserId));
      if (userDoc.exists()) {
        setNotifications(userDoc.data().notifications || []);
      }
    };

    fetchNotifications();
  }, [currentUserId]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notifications</Text>
        <View></View>
      </View>
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.notificationItem}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationMessage}>{item.message}</Text>
            <Text style={styles.notificationDate}>{new Date(item.dateCreated.seconds * 1000).toLocaleString()}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingHorizontal: 15,
    paddingTop: 10
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 25,
    fontFamily: 'ComfortaaBold',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  notificationItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    marginBottom: 10,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationMessage: {
    fontSize: 16,
    marginTop: 5,
  },
  notificationDate: {
    fontSize: 14,
    color: '#888888',
    marginTop: 5,
  },
});

