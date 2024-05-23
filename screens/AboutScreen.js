import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function AboutScreen() {

  const navigation = useNavigation()
  const teamMembers = [
    { name: 'K.Nihal', role: 'Lead Developer', color: '#FF6F61' },
    { name: 'A. Sai Krishna Siddu', role: 'UI/UX Designer', color: '#6B5B95' },
    { name: 'T. Sandeep', role: 'Software Engineer', color: '#88B04B' },
    { name: 'Sai Nishith', role: 'Graphic Designer', color: '#F7CAC9' },
    { name: 'Nivesh', role: 'Marketing Specialist', color: '#955251' },
    // { name: 'Sarah Lee', role: 'Quality Assurance', color: '#B565A7' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons name="menu" size={24} color="black" style={styles.menuIcon} onPress={() => navigation.openDrawer()} />
        <Text style={styles.headerText}>About Us</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.teamContainer}>
          {teamMembers.map((member, index) => (

            <View style={{flexDirection:'column',alignItems:'center'}}>

            <View key={index} style={[styles.memberShape, { backgroundColor: member.color }]}>
              
            </View>
            <Text style={styles.memberName}>{member.name}</Text>
              <Text style={styles.memberRole}>{member.role}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionHeader}>About the Project</Text>
        <Text style={styles.projectDescription}>
        Welcome to Vertex – a community app developed for the students of JNTUH Hyderabad, where paths converge and necessities merge. 
          Vertex serves as a centralized platform connecting all students within the college community. 
          Whether you're a fresher exploring campus life or a seasoned senior seeking academic resources, Vertex is your go-to companion. 
          Developed by 2nd-year, 2nd-semester students, Vertex is designed to foster collaboration, facilitate communication, and enhance student experience throughout your journey at JNTUH Hyderabad.
         </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    // borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    // backgroundColor: '#fff',
  },
  menuIcon: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 30,
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
  },
  contentContainer: {
    padding: 20,
  },
  teamContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  memberShape: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    marginHorizontal: 10, // Adjust the horizontal margin for spacing
    marginVertical: 10,   // Adjust the vertical margin for spacing
    backgroundColor: '#ccc', // Placeholder color
  },
  memberName: {textAlign:'center',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
    marginBottom: 5,
  },
  memberRole: {textAlign:'center',
    fontSize: 14,
    color: '#000',
    marginBottom:20
  },
  sectionHeader: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 10,
  },
  projectDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
});
