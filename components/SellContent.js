import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { app } from '../services/config';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;
const db = getFirestore(app);

export default function SellContent({ navigation }) {
  const [ads, setAds] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserFullName, setCurrentUserFullName] = useState('');

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
    const fetchUserAds = async () => {
      if (currentUser) {
        const q = query(collection(db, 'sellAds'), where('userId', '==', currentUser));
        const querySnapshot = await getDocs(q);
        const userAds = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAds(userAds);
      }
    };

    fetchUserAds();
  }, [currentUser]);

  const renderAd = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('AdDetail', { item })}
    >
      <ImageBackground
        source={{ uri: item.images[0] }}
        style={styles.itemImage}
        imageStyle={styles.itemImageStyle}
      >
        <TouchableOpacity style={[styles.button, styles.favoriteButton]}>
          <Ionicons name="heart-outline" size={21} color="white" />
        </TouchableOpacity>
      </ImageBackground>
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.productName}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemPrice}>{item.price ? `$${item.price}` : 'Free'}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {ads.length > 0 ? (
        <FlatList
          data={ads}
          keyExtractor={(item) => item.id}
          renderItem={renderAd}
        />
      ) : (
        <Text>No ads posted yet.</Text>
      )}
      <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate('CreateSellAd')}>
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fafafa',
  },
  itemContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  itemImage: {
    height: 150,
    justifyContent: 'flex-end',
  },
  itemImageStyle: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode:'contain'
  },
  itemDetails: {
    padding: 15,
  },
  itemTitle: {
    fontSize: 18,
    fontFamily: 'ComfortaaBold',
    color: '#007bff',
  },
  itemDescription: {
    fontSize: 14,
    fontFamily: 'ComfortaaRegular',
    color: '#434048',
    marginVertical: 5,
  },
  itemPrice: {
    fontSize: 16,
    fontFamily: 'ComfortaaBold',
    color: '#1c40bd',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 50,
    padding: 10,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: '#1c40bd',
    borderRadius: 32,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
