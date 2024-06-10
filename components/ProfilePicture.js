import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfilePicture = ({ fullName }) => {
  // Function to extract initials from full name
  const getInitials = (name) => {
    if (!name) return ''; // Check if name is provided
    const nameArray = name.split(' ');
    const initials = nameArray.map((word) => word.charAt(0)).join('');
    return initials.toUpperCase();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.initials}>{getInitials(fullName)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#2ecc71', // You can customize the background color
    justifyContent: 'center',
    alignItems: 'center',
    // padding:5
  },
  initials: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ffffff', // You can customize the text color
  },
});

export default ProfilePicture;
