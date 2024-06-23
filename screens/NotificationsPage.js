import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '../services/config';
import { addNotification } from '../utils/FireBaseFunctions';
import { Skeleton } from 'moti/skeleton';

export default function NotificationsPage({ route }) {
  const navigation = useNavigation();
  const { currentUserId } = route.params;
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    

    const fetchNotifications = async () => {
      const db = getFirestore(app);
      const userDoc = await getDoc(doc(db, 'users', currentUserId));
      if (userDoc.exists()) {
        setNotifications(userDoc.data().notifications || []);
      }
      setLoading(false);
    };

    setTimeout(fetchNotifications, 3000);
  }, [currentUserId]);

  const renderSkeleton = () => (
    <View style={styles.notificationItem}>
      <Skeleton width={200} height={20} colorMode="light" style={styles.skeletonTitle} />
      <Skeleton width={300} height={15} colorMode="light" style={styles.skeletonMessage} />
      <Skeleton width={150} height={15} colorMode="light" style={styles.skeletonDate} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notifications</Text>
        <View></View>
      </View>
      {loading ? (
        <FlatList
          data={[...Array(5).keys()]}
          keyExtractor={(item) => item.toString()}
          renderItem={renderSkeleton}
        />
      ) : (
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
      )}
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
    backgroundColor: '#f1f1f1',
    padding: 20,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationMessage: {
    fontSize: 16,
    marginTop: 5,
    color: '#666',
  },
  notificationDate: {
    fontSize: 14,
    color: '#888888',
    marginTop: 10,
  },
  skeletonTitle: {
    marginBottom: 10,
  },
  skeletonMessage: {
    marginBottom: 5,
  },
  skeletonDate: {},
});
