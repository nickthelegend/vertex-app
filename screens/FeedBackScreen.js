import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AirbnbRating } from 'react-native-ratings';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import the MaterialCommunityIcons
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook for navigation

export default function FeedbackScreen() {
  const navigation=useNavigation()
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(3); // Default rating

  const handleFeedbackSubmit = () => {
    if (feedback.trim() === '') {
      Alert.alert('Feedback Required', 'Please enter your feedback before submitting.');
      return;
    }

    // Here you can handle the submission to your backend or any state management system
    console.log('Feedback:', feedback);
    console.log('Rating:', rating);

    // Clear the feedback form
    setFeedback('');
    setRating(3);

    Alert.alert('Thank You!', 'Your feedback has been submitted.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        {/* <Image source={require('./assets/logo.png')} style={styles.logo} /> */}
        <MaterialCommunityIcons name="menu" size={24} color="black" style={styles.menuIcon} onPress={()=>{            navigation.openDrawer()}}/>
      </View>
      <Text style={styles.headerText}>Send us your feedback!</Text>
      <Text style={styles.subHeaderText}>We value your input and would love to hear from you.</Text>
      <AirbnbRating
        count={5}
        reviews={["Terrible", "Bad", "Okay", "Good", "Great"]}
        defaultRating={rating}
        size={30}
        onFinishRating={(value) => setRating(value)}
        style={styles.rating}
      />
      <TextInput
        style={styles.feedbackInput}
        placeholder="Type your feedback here..."
        placeholderTextColor="#888"
        multiline
        value={feedback}
        onChangeText={setFeedback}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleFeedbackSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 50, // Set the width of the logo
    height: 50, // Set the height of the logo
    marginRight: 10, // Add some space between the logo and the menu icon
  },
  menuIcon: {
    marginRight: 'auto', // Push the icon to the right edge of the container
  },
  headerText: {
    fontSize: 30,
    fontFamily: "Poppins-SemiBold",
    color: '#333',
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    marginBottom: 20,
    color: '#666',
  },
  rating: {
    marginBottom: 20,
  },
  feedbackInput: {
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    textAlignVertical: 'top',
    marginBottom: 20,
    backgroundColor: '#fff',
    color: '#333',
    fontFamily: "Poppins-Regular",
    marginTop:20
  },
  buttonContainer: {
    // alignItems: 'center',
    // marginHorizontal:''

  },
  submitButton: {
    backgroundColor: '#1d40bd',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    textAlign:'center'
  },
});
