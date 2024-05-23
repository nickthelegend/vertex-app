import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ContactUsScreen() {
  const navigation = useNavigation();

  const handlePhonePress = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleEmailPress = (emailAddress) => {
    Linking.openURL(`mailto:${emailAddress}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons name="menu" size={24} color="black" style={styles.menuIcon} onPress={() => navigation.openDrawer()} />
        <Text style={styles.headerText}>Contact Us</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.sectionHeader}>Connect with Us</Text>
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <MaterialCommunityIcons name="facebook" size={24} color="#4267B2" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <MaterialCommunityIcons name="twitter" size={24} color="#1DA1F2" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <MaterialCommunityIcons name="instagram" size={24} color="#C13584" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <MaterialCommunityIcons name="linkedin" size={24} color="#0077B5" />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionHeader}>Phone Numbers</Text>
        <TouchableOpacity onPress={() => handlePhonePress('+91 70758 51974')}>
          <Text style={styles.contactInfo}>+91 70758 51974</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePhonePress('+91 70363 90363')}>
          <Text style={styles.contactInfo}>+91 70363 90363</Text>
        </TouchableOpacity>

        <Text style={styles.sectionHeader}>Email Addresses</Text>
        <TouchableOpacity onPress={() => handleEmailPress('info@example.com')}>
          <Text style={styles.contactInfo}>info@example.com</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleEmailPress('support@example.com')}>
          <Text style={styles.contactInfo}>support@example.com</Text>
        </TouchableOpacity>
      </View>
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
  sectionHeader: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactInfo: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
});
