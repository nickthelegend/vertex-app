import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TermsOfServiceScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <MaterialCommunityIcons name="menu" size={24} color="black" style={styles.menuIcon} onPress={() => navigation.openDrawer()} />
        <Text style={styles.headerText}>Terms of Service</Text>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.sectionHeader}>Introduction</Text>
        <Text style={styles.paragraph}>
          Welcome to our app! These Terms of Service govern your use of our application. By accessing or using our app, you agree to be bound by these terms.
        </Text>

        <Text style={styles.sectionHeader}>1. Acceptance of Terms</Text>
        <Text style={styles.paragraph}>
          By using our app, you agree to abide by these Terms of Service and all applicable laws and regulations. If you do not agree to these terms, you may not use the app.
        </Text>

        <Text style={styles.sectionHeader}>2. Use License</Text>
        <Text style={styles.paragraph}>
          Permission is granted to use the app for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
        </Text>

        {/* Additional sections */}
        <Text style={styles.sectionHeader}>3. Intellectual Property Rights</Text>
        <Text style={styles.paragraph}>
          All content included in the app, such as text, graphics, logos, images, audio clips, video, data, music, and software, is the property of the app developer or its content suppliers and protected by international copyright laws.
        </Text>

        <Text style={styles.sectionHeader}>4. Limitations</Text>
        <Text style={styles.paragraph}>
          In no event shall the app developer be liable for any damages arising out of the use or inability to use the app.
        </Text>

        <Text style={styles.sectionHeader}>5. Governing Law</Text>
        <Text style={styles.paragraph}>
          These terms shall be governed by and construed in accordance with the laws of your jurisdiction.
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
  sectionHeader: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 10,
    color: '#333',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    color: '#555',
  },
});
