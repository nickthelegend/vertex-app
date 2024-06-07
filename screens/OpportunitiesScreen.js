import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

export default function OpportunitiesScreen() {
  const [interest, setInterest] = useState('');
  const [help, setHelp] = useState('');
  const [suggestions, setSuggestions] = useState('');

  const handleSubmit = () => {
    // Implement submission logic here
    console.log("Interests:", interest);
    console.log("Help needed:", help);
    console.log("Suggestions:", suggestions);
  };
  const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Opportunities</Text>
        <View></View>
      </View>

      <View style={styles.content}>
        <Text style={styles.question}>What are you interested in?</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setInterest(text)}
          value={interest}
          placeholder="Enter your interests"
        />

        <Text style={styles.question}>How can we help you achieve your goals?</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setHelp(text)}
          value={help}
          placeholder="Enter how we can help"
        />

        <Text style={styles.question}>How can we improve coding culture on campus?</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setSuggestions(text)}
          value={suggestions}
          placeholder="Enter your suggestions"
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB', // Figma background color
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#ffffff", // Figma header background color
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB", // Figma header border color
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 25,
    fontFamily: "ComfortaaBold",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
    color: '#374151', // Figma text color
    fontFamily: 'Inter-Regular', // Figma font family
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB", // Figma input border color
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontFamily: 'Inter-Regular', // Figma font family
  },
  submitButton: {
    backgroundColor: '#1E40AF', // Figma submit button background color
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF', // Figma submit button text color
    fontSize: 18,
    fontFamily: 'Inter-Regular', // Figma font family
  },
});
