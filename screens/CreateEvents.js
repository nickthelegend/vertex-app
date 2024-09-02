import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Dimensions, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { app } from '../services/config';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingIndicator from '../components/LoadingIndicator';

const db = getFirestore(app);
const storage = getStorage(app);

const screenWidth = Dimensions.get('window').width;

export default function CreateEvents() {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [location, setLocation] = useState('');
  const [images, setImages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserFullName, setCurrentUserFullName] = useState('');
  const [loadingVisible, setLoadingVisible] = useState(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      const jsonObj = JSON.parse(userData);
      setCurrentUser(jsonObj.userId);
      setCurrentUserFullName(jsonObj.fullName);
    };

    fetchCurrentUser();
  }, []);

  const handleNext = () => {
    if (step === 1 && eventName && description && date) {
      setStep(2);
    } else if (step === 2 && location) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setLoadingVisible(true);

    try {
      const urls = await Promise.all(images.map(async (image, index) => {
        const response = await fetch(image.uri);
        const blob = await response.blob();
        const storageRef = ref(storage, `events/${currentUser}/${Date.now()}_${index}`);
        await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(storageRef);
        return downloadURL;
      }));

      await addDoc(collection(db, 'events'), {
        eventName,
        description,
        date: date.toString(),
        location,
        images: urls,
        userId: currentUser,
        userFullName: currentUserFullName,
        dateCreated: new Date()
      });

      console.log('Event successfully created!');
      navigation.goBack();
    } catch (e) {
      console.error('Error creating event: ', e);
    } finally {
      setLoadingVisible(false);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigation.goBack();
    }
  };

  const handleImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, ...result.assets.slice(0, 3 - images.length).map(asset => ({ uri: asset.uri }))]);
    }
  };

  const isNextDisabled = () => {
    if (step === 1) {
      return !(eventName && description && date);
    }
    if (step === 2) {
      return !location;
    }
    return false;
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Create an Event</Text>
        <View></View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {step === 1 && (
          <>
            <Text style={styles.stepTitle}>Step 1: Event Details</Text>

            <TextInput
              style={styles.input}
              placeholder="Event Name"
              value={eventName}
              onChangeText={setEventName}
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              multiline
            />

            {/* Date Picker Button */}
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
              <Text>{date ? date.toDateString() : 'Select Date'}</Text>
            </TouchableOpacity>
            
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChangeDate}
              />
            )}
          </>
        )}

        {step === 2 && (
          <>
            <Text style={styles.stepTitle}>Step 2: Event Location and Images</Text>

            <TextInput
              style={styles.input}
              placeholder="Location"
              value={location}
              onChangeText={setLocation}
            />

            <Text style={styles.sectionTitle}>Event Images</Text>
            <View style={styles.imagesContainer}>
              {images.map((image, index) => (
                <Image key={index} source={{ uri: image.uri }} style={styles.image} />
              ))}
              {images.length < 3 && (
                <TouchableOpacity onPress={handleImagePick} style={styles.addImageButton}>
                  <Ionicons name="add" size={24} color="#000" />
                </TouchableOpacity>
              )}
            </View>
          </>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleBack} style={styles.smallBackButton}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.nextButton, isNextDisabled() && styles.disabledButton]}
          onPress={handleNext}
          disabled={isNextDisabled()}
        >
          <Text style={styles.nextButtonText}>{step === 2 ? 'Submit' : 'Next: Location and Images'}</Text>
        </TouchableOpacity>
      </View>
      {loadingVisible && <LoadingIndicator />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
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
  scrollViewContainer: {
    flexGrow: 1,
    padding: 20,
  },
  stepTitle: {
    fontSize: 22,
    fontFamily: 'ComfortaaBold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    fontFamily: "ComfortaaBold",
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'ComfortaaBold',
    marginBottom: 10,
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  image: {
    width: screenWidth / 3 - 20,
    height: screenWidth / 3 - 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  addImageButton: {
    width: screenWidth / 3 - 20,
    height: screenWidth / 3 - 20,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  smallBackButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1c40bd',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#1c40bd',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: "ComfortaaBold",
  },
  disabledButton: {
    backgroundColor: '#ddd',
  },
});
