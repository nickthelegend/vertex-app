import React, { useEffect } from 'react';
import { Alert, View, Text, Linking } from 'react-native';
import Constants from 'expo-constants';

// Function to check for updates
const checkForUpdate = async () => {
  try {
    // Replace with your API endpoint to get the latest app version
    const response = await fetch('https://appversion.vercel.app/');
    const { latestVersion, updateUrl } = await response.json();

    // Retrieve current version from expoConfig
    const currentVersion = Constants.expoConfig.version;

    // Compare the fetched version with the current app version
    if (latestVersion !== currentVersion) {
      // Prompt the user to update the app
      Alert.alert(
        'Update Available',
        'A new version of the app is available. Please update to continue.',
        [
          {
            text: 'Update',
            onPress: () => {
              // Open the URL to your app on the App Store/Play Store
              Linking.openURL(updateUrl);
            },
          },
        ],
        { cancelable: false }
      );
    }
  } catch (error) {
    console.error('Error checking for updates:', error);
  }
};



export default checkForUpdate;
