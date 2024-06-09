// PostScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';
import { savePostToFirestore } from '../utils/FireBaseFunctions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: screenWidth } = Dimensions.get('window');

export default function PostScreen({ navigation }) {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const tags = ['What\'s Happening', 'Community', 'Clubs', 'Events', 'Opportunities', 'Question/Help'];
  // console.log(image)
  const openImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    // console.log(result); // Log the result to see what is returned
    setImage(result.assets[0].uri);
    // if (!result.canceled && result.uri) {
    //   console.log('Selected image:', result.uri); // Log the selected image URI
    //   setImage({ uri: result.uri });
    // } else {
    //   console.log('Image selection cancelled or URI is invalid');
    // }
  };

  const handlePost = async () => {
    const userId = await AsyncStorage.getItem('userId');
    const userName = await AsyncStorage.getItem('userName');
    const userFullName = await AsyncStorage.getItem('userFullName');

    const postId = uuid.v4();
    const post = {
      id: postId,
      caption,
      imgUrl: image ? image.uri : null,
      likes: [],
      comments: [],
      createdAt: new Date(),
      createdBy: userId,
      createdByUserName: userName,
      createdByUserFullname: userFullName,
      postCategory: 'Public',
      postTags: selectedTag,
    };

    await savePostToFirestore(post);
    // Reset form and navigate back or show a success message
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
        <TextInput
          style={styles.input}
          placeholder="What's happening?"
          placeholderTextColor="#999"
          value={caption}
          onChangeText={setCaption}
          multiline
        />
        <Text style={styles.sectionTitle}>Image</Text>
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
      <TouchableOpacity onPress={handlePost} style={styles.postButton}>
        <Text style={styles.postButtonText}>Post</Text>
      </TouchableOpacity>
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
    color:'#fff'
  },
  postButton: {
    backgroundColor: '#1c40bd',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
  },
  postButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,

  },
});
