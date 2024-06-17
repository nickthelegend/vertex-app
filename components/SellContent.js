import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Modal,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { app } from '../services/config';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;
const db = getFirestore(app);

export default function SellContent({ navigation }) {
  const [ads, setAds] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserFullName, setCurrentUserFullName] = useState('');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentAd, setCurrentAd] = useState(null);

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
        const q = query(
          collection(db, 'sellAds'),
          where('userId', '==', currentUser)
        );
        const querySnapshot = await getDocs(q);
        const userAds = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAds(userAds);
      }
    };

    fetchUserAds();
  }, [currentUser]);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'sellAds', id));
    setAds(ads.filter((ad) => ad.id !== id));
  };

  const handleEdit = (ad) => {
    setCurrentAd(ad);
    setEditModalVisible(true);
  };

  const handleSaveEdit = async () => {
    const adRef = doc(db, 'sellAds', currentAd.id);
    await updateDoc(adRef, currentAd);
    setAds(ads.map((ad) => (ad.id === currentAd.id ? currentAd : ad)));
    setEditModalVisible(false);
  };

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
        <Text style={styles.itemPrice}>
          {item.price ? `₹${item.price}` : 'Free'}
        </Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={() => handleEdit(item)}
          >
            <Ionicons name="pencil-outline" size={21} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={() => handleDelete(item.id)}
          >
            <Ionicons name="trash-outline" size={21} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {ads.length > 0 ? (
        <FlatList data={ads} keyExtractor={(item) => item.id} renderItem={renderAd} />
      ) : (
        <Text>Loading...</Text>
      )}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('CreateSellAd')}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>

      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
              {currentAd && (
                <>
                  <Text style={styles.modalHeaderText}>
                    Editing {currentAd.productName}
                  </Text>
                  <View style={styles.imagesContainer}>
                    <Image
                      source={{ uri: currentAd.images[0] }}
                      style={styles.image}
                    />
                  </View>
                </>
              )}
              <TextInput
                style={styles.input}
                placeholder="Product Name"
                value={currentAd?.productName}
                onChangeText={(text) =>
                  setCurrentAd({ ...currentAd, productName: text })
                }
              />
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Description"
                multiline
                numberOfLines={4}
                value={currentAd?.description}
                onChangeText={(text) =>
                  setCurrentAd({ ...currentAd, description: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Hostel"
                value={currentAd?.hostel}
                onChangeText={(text) =>
                  setCurrentAd({ ...currentAd, hostel: text })
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Price"
                value={currentAd?.price}
                onChangeText={(text) =>
                  setCurrentAd({ ...currentAd, price: text })
                }
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleSaveEdit}
                >
                  <Text style={styles.modalButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setEditModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    backgroundColor: '#ffffff',
    borderRadius: 15,
    overflow: 'hidden',
    marginVertical: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
  },
  itemImage: {
    height: 160,
    justifyContent: 'flex-end',
  },
  itemImageStyle: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    resizeMode: 'contain',
  },
  itemDetails: {
    padding: 20,
  },
  itemTitle: {
    fontSize: 30,
    fontFamily: 'ComfortaaBold',
    color: '#1c40bd',
  },
  itemDescription: {
    fontSize: 15,
    fontFamily: 'ComfortaaLight',
    color: '#888',
    marginTop: 10,
    height: 40,
    overflow: 'hidden',
  },
  itemPrice: {
    fontSize: 20,
    fontFamily: 'ComfortaaBold',
    color: '#5cb85c',
    marginTop: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: '#1c40bd',
  },
  deleteButton: {

    backgroundColor: '#d9534f',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#1c40bd',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: screenWidth - 40,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
  },
  scrollViewContainer: {
    alignItems: 'center',
  },
  modalHeaderText: {
    fontSize: 20,
    fontFamily: 'ComfortaaBold',
    marginBottom: 20,
  },
  imagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: screenWidth/2,
    height:screenWidth/2,
    marginRight: 10,
    borderRadius: 10,
    resizeMode:'contain'
  },
  addImageButton: {
    width: 80,
    height: 80,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    borderColor: '#1c40bd',
    borderWidth: 1,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c40bd',
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});
