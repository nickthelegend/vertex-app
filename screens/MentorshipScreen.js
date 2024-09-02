import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { app } from '../services/config';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const db = getFirestore(app);

export default function MentorshipScreen() {
  const navigation = useNavigation();
  const [mentorships, setMentorships] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchMentorships();
  }, []);

  const fetchMentorships = async () => {
    setLoading(true);
    try {
      const mentorshipCollection = collection(db, 'mentorships');
      const mentorshipSnapshot = await getDocs(mentorshipCollection);
      const mentorshipList = mentorshipSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMentorships(mentorshipList);
    } catch (error) {
      console.error('Error fetching mentorships:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMentorships();
    setRefreshing(false);
  };

  const handleSeekMentorship = (mentorId) => {
    console.log(`Seeking mentorship from mentor with ID: ${mentorId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Mentorship</Text>
        <View></View>
      </View>

      {/* Mentorship Options */}
      <View style={styles.optionContainer}>
        <Text style={styles.promptText}>
          Would you like to become a mentor or seek mentorship?
        </Text>
        <TouchableOpacity style={styles.optionButton} onPress={() => navigation.navigate("BecomeMentorScreen")}>
          <Text style={styles.optionButtonText}>Become a Mentor</Text>
        </TouchableOpacity>
      </View>

      {/* Loading Indicator */}
      {loading && <ActivityIndicator size="large" color="#1e40bc" style={styles.loading} />}

      {/* Mentorship List with Pull to Refresh */}
      <ScrollView
        style={styles.mentorshipListContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {mentorships.map(mentorship => (
          <View key={mentorship.id} style={styles.mentorshipCard}>
            <Text style={styles.mentorName}>{mentorship.mentorName}</Text>
            <Text style={styles.fieldOfExpertise}>Expertise: {mentorship.fieldOfExpertise}</Text>
            <Text style={styles.experience}>Experience: {mentorship.experience} years</Text>
            <Text style={styles.availability}>Availability: {mentorship.availability}</Text>
            <Text style={styles.bio}>{mentorship.bio}</Text>
            {/* Seek Mentorship Button */}
            <TouchableOpacity style={styles.seekButton} onPress={() => handleSeekMentorship(mentorship.id)}>
              <Text style={styles.seekButtonText}>Seek Mentorship</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 25,
    fontFamily: "ComfortaaBold",
  },
  backButton: {
    marginRight: 10,
  },
  optionContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  promptText: {
    fontSize: 18,
    color: '#333333',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#1e40bc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  optionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loading: {
    marginVertical: 20,
  },
  mentorshipListContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  mentorshipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  mentorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  fieldOfExpertise: {
    fontSize: 16,
    color: '#777777',
    marginBottom: 5,
  },
  experience: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 5,
  },
  availability: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 5,
  },
  bio: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 10,
  },
  seekButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  seekButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
