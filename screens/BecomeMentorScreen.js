import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { app } from '../services/config';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingIndicator from '../components/LoadingIndicator';

const db = getFirestore(app);
const screenWidth = Dimensions.get('window').width;

export default function BecomeMentorScreen() {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const [mentorName, setMentorName] = useState('');
  const [fieldOfExpertise, setFieldOfExpertise] = useState('');
  const [experience, setExperience] = useState('');
  const [availability, setAvailability] = useState('');
  const [bio, setBio] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [loadingVisible, setLoadingVisible] = useState(false);

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

  const handleNext = () => {
    if (step === 1 && mentorName && fieldOfExpertise) {
      setStep(2);
    } else if (step === 2 && experience && availability && bio) {
      setStep(3);
    } else if (step === 3 && contactEmail) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setLoadingVisible(true);

    try {
      await addDoc(collection(db, 'mentorships'), {
        mentorName,
        fieldOfExpertise,
        experience,
        availability,
        bio,
        contactEmail,
        userId: currentUser,
        userFullName: currentUserFullName,
        dateCreated: new Date(),
      });

      console.log('Mentorship application successfully submitted!');
      navigation.goBack();
      setLoadingVisible(false);
    } catch (e) {
      console.error('Error submitting mentorship application: ', e);
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

  const isNextDisabled = () => {
    if (step === 1) {
      return !(mentorName && fieldOfExpertise);
    }
    if (step === 2) {
      return !(experience && availability && bio);
    }
    if (step === 3) {
      return !contactEmail;
    }
    return false;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Become a Mentor</Text>
        <View></View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {step === 1 && (
          <>
            <Text style={styles.stepTitle}>Step 1: Basic Information</Text>

            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={mentorName}
              onChangeText={setMentorName}
            />

            <TextInput
              style={styles.input}
              placeholder="Field of Expertise"
              value={fieldOfExpertise}
              onChangeText={setFieldOfExpertise}
            />
          </>
        )}

        {step === 2 && (
          <>
            <Text style={styles.stepTitle}>Step 2: Experience and Availability</Text>

            <TextInput
              style={styles.input}
              placeholder="Years of Experience"
              value={experience}
              onChangeText={setExperience}
              keyboardType="numeric"
            />

            <TextInput
              style={styles.input}
              placeholder="Availability (e.g., weekends, evenings)"
              value={availability}
              onChangeText={setAvailability}
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Short Bio"
              value={bio}
              onChangeText={setBio}
              multiline
            />
          </>
        )}

        {step === 3 && (
          <>
            <Text style={styles.stepTitle}>Step 3: Contact Information</Text>

            <TextInput
              style={styles.input}
              placeholder="Contact Email"
              value={contactEmail}
              onChangeText={setContactEmail}
              keyboardType="email-address"
            />
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
          <Text style={styles.nextButtonText}>{step === 3 ? 'Submit' : 'Next: More Details'}</Text>
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
