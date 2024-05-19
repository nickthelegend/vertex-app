// Import necessary libraries
import uuid from 'react-native-uuid'; // Import uuid

// Import Firebase database
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { app } from '../services/config'
const database = getFirestore(app)
// import { firebase } from '@react-native-firebase/firestore';
// const firebaseConfig = {
//   apiKey: "AIzaSyB056tMKN588natkE09N_5BAHuTp-0IXWw",
//   authDomain: "rnvertexapp.firebaseapp.com",
//   databaseURL: "rnvertexapp.firebaseio.com",
//   projectId: "rnvertexapp",
//   storageBucket: "rnvertexapp.appspot.com",
//   messagingSenderId: "633150595201",
//   appId: "1:633150595201:web:4012a7e7b0260fd9caad80",
//   measurementId: "G-HB0M1FTYLK"
// };
  
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
  
// Define registerUser function
export async function registerUser(userInfo) {
  try {
    // Generate unique user ID
    const userId = uuid.v4();
    
    // Reference to the users collection
    const usersCollection = collection(database, 'users');
    
    // Create a document reference for the new user
    const userDoc = doc(usersCollection, userId);
    
    // Set user information in the document
    await setDoc(userDoc, {
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
    console.log('Database:', database);

    console.error('Error registering user:', error);
    throw error; // Rethrow the error for handling in the calling code
  }
}
