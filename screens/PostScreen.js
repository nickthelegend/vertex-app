// PostScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
import { savePostToFirestore } from '../utils/FireBaseFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingIndicator from '../components/LoadingIndicator';
import { getFirestore, collection, doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
// import { arrayUnion } from 'firebase/firestore';

const db = getFirestore();

const { width: screenWidth } = Dimensions.get('window');

export default function PostScreen({ navigation }) {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [loadingVisible, setLoadingVisible] = useState(false); // State to control loading animation visibility
  const tags = ['What\'s Happening', 'Community', 'Clubs', 'Events', 'Opportunities', 'Question/Help'];

  const openImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0].uri) {
      setImage(result.assets[0].uri);
    } else {
      console.log('Image selection cancelled or URI is invalid');
    }
  };

  const handlePost = async () => {
    try {
      setLoadingVisible(true);
      const userData = await AsyncStorage.getItem('user');
      const jsonObj = JSON.parse(userData);
      console.log(jsonObj);
  
      const userId = jsonObj.userId;
      const userName = jsonObj.username;
      const userFullName = jsonObj.fullName;
  
      const postId = uuid.v4();
      const post = {
        id: postId,
        caption,
        imgUrl: image || null,
        likes: [],
        comments: [],
        createdAt: new Date(),
        createdBy: userId,
        createdByUserName: userName,
        createdByUserFullname: userFullName,
        postCategory: 'Public',
        postTags: selectedTag,
      };
      
      // Save the post to Firestore
      await savePostToFirestore(post);  
      // Update the user's posts array
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        posts: arrayUnion(postId)
      });
  
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigation.goBack();
      setLoadingVisible(false);
  
      // Reset form and navigate back or show a success message
    } catch (error) {
      // Handle the error here
      console.error('Error in handlePost:', error);
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigation.goBack();
      setLoadingVisible(false);
  
      // Optionally, you can also show an error message to the user
    }
  };

  const isPostButtonDisabled = () => {
    const wordCount = caption.trim().split(/\s+/).length;
    return wordCount < 5 || !selectedTag;
  };
  
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Create a Post</Text>
        <View></View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
       
      <Text style={[styles.sectionTitle, { marginRight: 5 }]}>Caption</Text>
      <Text style={{ fontSize: 11, alignSelf: 'center' }}>(Minimum 5 words)</Text>

      </View>

        <TextInput
          style={styles.input}
          placeholder="What's happening?"
          placeholderTextColor="#999"
          value={caption}
          onChangeText={setCaption}
          multiline
        />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[styles.sectionTitle, { marginRight: 5 }]}>Image</Text>
          <Text style={{ fontSize: 11, alignSelf: 'center' }}>(Optional)</Text>
        </View>
        <View style={styles.imageContainer}>
          {image && (
            <Image source={{ uri: image }} style={styles.image} />
          )}
          {!image && (
            <TouchableOpacity onPress={openImagePicker} style={styles.addImageButton}>
              <Ionicons name="add" size={24} color="#000" />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.sectionTitle}>Select Tag</Text>
        <View style={styles.tagContainer}>
          {tags.map(tag => (
            <TouchableOpacity
              key={tag}
              style={[styles.tagButton, selectedTag === tag && styles.selectedTagButton]}
              onPress={() => setSelectedTag(tag)}
            >
              <Text style={[styles.tagText, selectedTag === tag && styles.selectedTagText]}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={handlePost}
        style={[styles.postButton, isPostButtonDisabled() && styles.disabledPostButton]}
        disabled={isPostButtonDisabled()}
      >
        <Text style={styles.postButtonText}>Post</Text>
      </TouchableOpacity>

      {loadingVisible && <LoadingIndicator />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    justifyContent: 'space-between',
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 25,
    fontFamily: 'ComfortaaBold',
  },
  scrollView: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    height: 150,
    textAlignVertical: 'top',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: screenWidth - 40,
    height: (screenWidth - 40) * 3 / 4,
    borderRadius: 10,
    marginBottom: 10,
  },
  addImageButton: {
    width: screenWidth - 40,
    height: (screenWidth - 40) * 3 / 4,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  tagButton: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedTagButton: {
    backgroundColor: '#1c40bd',
  },
  tagText: {
    color: '#333',
  },
  selectedTagText: {
    color: '#fff',
  },
  postButton: {
    backgroundColor: '#1c40bd',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
  },
  disabledPostButton: {
    backgroundColor: '#aaaaaa',
  },
  postButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
