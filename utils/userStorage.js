import AsyncStorage from '@react-native-async-storage/async-storage';

// Save user session data
export const saveSession = async (userData) => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
  } catch (error) {
    console.error('Error saving user session:', error);
  }
};

// Retrieve user session data
export const getSession = async () => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    return userData != null ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error retrieving user session:', error);
    return null;
  }
};

// Clear user session data
export const clearSession = async () => {
  try {
    await AsyncStorage.removeItem('userData');
  } catch (error) {
    console.error('Error clearing user session:', error);
  }
};

