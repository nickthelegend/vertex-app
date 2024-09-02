import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { app } from '../services/config';  // Make sure to have Firebase config imported correctly
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const db = getFirestore(app);

export default function JobScreen() {
  const navigation = useNavigation();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const jobsCollection = collection(db, 'jobs');
      const jobSnapshot = await getDocs(jobsCollection);
      const jobList = jobSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setJobs(jobList);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchJobs();
    setRefreshing(false);
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
        <Text style={styles.headerText}>Jobs</Text>
        <View></View>
      </View>

      {/* Add Opportunity Section */}
      <View style={styles.addOpportunitySection}>
        <Text style={styles.opportunityText}>
          Is your organization hiring new talent? Share the career opportunity with a huge talent pool within Vertex.
        </Text>
        {/* Navigation to CreateJob Screen */}
        <TouchableOpacity 
          style={styles.postButton}
          onPress={() => navigation.navigate('CreateJob')}
        >
          <Text style={styles.postButtonText}>Post an Opportunity</Text>
        </TouchableOpacity>
      </View>

      {/* Loading Indicator */}
      {loading && <ActivityIndicator size="large" color="#1e40bc" style={styles.loading} />}

      {/* Job Details Section with Pull-to-Refresh */}
      <ScrollView
        style={styles.jobDetailsContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {jobs.map(job => (
          <View key={job.id} style={styles.jobCard}>
            <Text style={styles.jobTitle}>{job.jobTitle}</Text>
            <Text style={styles.companyName}>{job.companyName}</Text>
            <View style={styles.jobInfoContainer}>
              <View style={styles.jobInfo}>
                <Text style={styles.infoLabel}>Location:</Text>
                <Text style={styles.infoValue}>{job.location}</Text>
              </View>
              <View style={styles.jobInfo}>
                <Text style={styles.infoLabel}>Deadline:</Text>
                <Text style={styles.infoValue}>{job.deadline}</Text>
              </View>
              <View style={styles.jobInfo}>
                <Text style={styles.infoLabel}>Salary:</Text>
                <Text style={styles.infoValue}>{job.salary}</Text>
              </View>
              <View style={styles.jobInfo}>
                <Text style={styles.infoLabel}>Applicants:</Text>
                <Text style={styles.infoValue}>0</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText}>View Job Post</Text>
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
  addOpportunitySection: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  opportunityText: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 10,
  },
  postButton: {
    backgroundColor: '#1e40bc',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loading: {
    marginVertical: 20,
  },
  jobDetailsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  jobCard: {
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
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  companyName: {
    fontSize: 16,
    color: '#777777',
    marginBottom: 15,
  },
  jobInfoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  jobInfo: {
    width: '50%',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 14,
    color: '#555555',
    fontWeight: 'bold',
  },
  infoValue: {
    fontSize: 14,
    color: '#333333',
  },
  viewButton: {
    backgroundColor: '#1e40bc',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
