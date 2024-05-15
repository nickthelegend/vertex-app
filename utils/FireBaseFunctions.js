// Import necessary libraries
import { v4 as uuidv4 } from 'uuid'; // Import uuid

// Import Firebase database
import { database } from './FireBaseConfig'; // Assuming firebaseConfig.js is where your Firebase setup is defined

// Define registerUser function
export async function registerUser(userInfo) {
  try {
    // Generate unique user ID
    const userId = uuidv4();

    // Add user information to Firestore
    await database.collection('users').doc(userId).set({
      userId,
      username: userInfo.username,
      password: userInfo.password,
      email: userInfo.email,
      phonenumber: userInfo.phonenumber,
      friendRequests: [], // Initialize empty array for friend requests
      friendsList: [], // Initialize empty array for friends list
      is_verified: userInfo.is_verified || false, // Default to false if not provided
      profilepic: userInfo.profilepic || '', // Default to empty string if not provided
      verifyDocument: userInfo.verifyDocument || '' // Default to empty string if not provided
    });

    console.log('User registered successfully!');
  } catch (error) {
    console.error('Error registering user:', error);
    throw error; // Rethrow the error for handling in the calling code
  }
}
