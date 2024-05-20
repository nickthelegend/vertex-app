// Import necessary libraries
import uuid from 'react-native-uuid'; // Import uuid

// Import Firebase database
import { getFirestore, collection, doc, setDoc, query, where, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    // Check if a user with the provided username already exists
    const usernameQuery = query(collection(database, 'users'), where('username', '==', userInfo.username));
    const usernameSnapshot = await getDocs(usernameQuery);

    if (!usernameSnapshot.empty) {
      throw new Error('Username already exists');
    }

    // Check if a user with the provided email already exists
    const emailQuery = query(collection(database, 'users'), where('email', '==', userInfo.email));
    const emailSnapshot = await getDocs(emailQuery);

    if (!emailSnapshot.empty) {
      throw new Error('Email already exists');
    }

    // Generate unique user ID
    const userId = uuid.v4();
    
    // Reference to the users collection
    const usersCollection = collection(database, 'users');
    
    // Create a document reference for the new user
    const userDoc = doc(usersCollection, userId);
    
    // Set user information in the document
    const registrationResult = await setDoc(userDoc, {
      userId,
      username: userInfo.username,
      password: userInfo.password,
      email: userInfo.email,
      phonenumber: userInfo.phonenumber,
      friendRequests: [], // Initialize empty array for friend requests
      friendsList: [], // Initialize empty array for friends list
      is_verified: userInfo.is_verified || false, // Default to false if not provided
      profilepic: userInfo.profilepic || '', // Default to empty string if not provided
      verifyDocument: userInfo.verifyDocument || '', // Default to empty string if not provided
      fullName : userInfo.fullname || '',
      streetAddress: userInfo.streetAddress || '',
      city: userInfo.city || '',
      state: userInfo.state || '',
      postalCode: userInfo.postalCode || '',
      course: '',
      courseDepartment: '',
      courseType: '',
      yearOfStudy: '',
      graduationYear: '',
      posts: [],
      bio: '',


    })
    console.log(registrationResult)
    
      // If registration was successful, save user information to AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(registrationResult));
      console.log( JSON.stringify(userInfo))
      // console.log('User registered successfully!');
    // } else {
    //   console.error('Error registering user:', 'Registration failed');
    //   throw new Error('Registration failed'); 
    // }
  } catch (error) {
    console.error('Error registering user:', error.message);
    
    throw error; // Rethrow the error for handling in the calling code
  }
}


export async function loginUser(username, password) {
  try {
    // Reference to the users collection
    const usersCollection = collection(database, 'users');

    // Create a query to find the document with the provided username
    const userQuery = query(usersCollection, where('username', '==', username));
    
    // Get the documents that match the query
    const querySnapshot = await getDocs(userQuery);
    
    // Check if a user with the provided username exists
    if (querySnapshot.empty) {
      throw new Error('User not found');
    }
    
    // Since usernames are unique, there should be only one document
    querySnapshot.forEach((doc) => {
      // Retrieve user data
      const userData = doc.data();
      
      // Check if the password matches
      if (userData.password === password) {
        console.log('Login successful!');
        AsyncStorage.setItem('user', JSON.stringify(userData));
        return userData;
        // You can return user data or perform any other actions here
      } else {
        throw new Error('Incorrect password');
      }
    });
  } catch (error) {
    console.error('Error logging in:', error.message);
    throw error; // Rethrow the error for handling in the calling code
  }
}


export async function checkUserLoggedIn() {
  try {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData);
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error checking login state:', error.message);
    return null;
  }
}

export async function logoutUser() {
  try {
    await AsyncStorage.removeItem('user');
    console.log('User logged out');
  } catch (error) {
    console.error('Error logging out:', error.message);
  }
}