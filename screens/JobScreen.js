import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

export default function JobScreen() {
  const navigation = useNavigation();

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
        <TouchableOpacity style={styles.postButton}>
          <Text style={styles.postButtonText}>Post an Opportunity</Text>
        </TouchableOpacity>
      </View>

      {/* Job Details Section */}
      <ScrollView style={styles.jobDetailsContainer}>
        <View style={styles.jobCard}>
          <Text style={styles.jobTitle}>Nino Training - Engineer Intern</Text>
          <Text style={styles.companyName}>Sirena Technologies Pvt Ltd</Text>
          <View style={styles.jobInfoContainer}>
            <View style={styles.jobInfo}>
              <Text style={styles.infoLabel}>Location:</Text>
              <Text style={styles.infoValue}>Bangalore</Text>
            </View>
            <View style={styles.jobInfo}>
              <Text style={styles.infoLabel}>Deadline:</Text>
              <Text style={styles.infoValue}>Sep 07, 2024</Text>
            </View>
            <View style={styles.jobInfo}>
              <Text style={styles.infoLabel}>Stipend:</Text>
              <Text style={styles.infoValue}>0</Text>
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
  addOpportunitySection: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 2, // Adds shadow for Android
    shadowColor: '#000', // Adds shadow for iOS
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
    elevation: 2, // Adds shadow for Android
    shadowColor: '#000', // Adds shadow for iOS
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
    width: '50%', // Two items per row
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
