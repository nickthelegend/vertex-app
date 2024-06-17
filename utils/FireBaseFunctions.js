// Import necessary libraries
import uuid from 'react-native-uuid'; // Import uuid

// Import Firebase database
import { getFirestore, collection, doc, setDoc, query, where, getDocs,updateDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { app } from '../services/config'

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const database = getFirestore(app);
const db = getFirestore(app);
const storage = getStorage(app);
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
    const userDataObject = {
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
      fullName: userInfo.fullname || '',
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
      chatHistoryUsers: [], // New field for chat history users
      notificationToken: userInfo.notificationToken || '', // Add notification token to user data object

    };
    
    // Set user information in the document
    const registrationResult = await setDoc(userDoc,userDataObject )
    // console.log(registrationResult)
    
      // If registration was successful, save user information to AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(userDataObject));
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


export async function loginUser(username, password, notificationToken) {
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
    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();
    
    // Check if the password matches
    if (userData.password === password) {
      console.log('Login successful!');

      // Update the user's notification token
      const userRef = doc(usersCollection, userDoc.id);
      await updateDoc(userRef, { notificationToken: notificationToken });

      // Store user data locally
      await AsyncStorage.setItem('user', JSON.stringify(userData));

      // Return user data
      return userData;
    } else {
      throw new Error('Incorrect password');
    }
  } catch (error) {
    console.error('Error logging in:', error.message);
    throw error; // Rethrow the error for handling in the calling code
  }
}


export async function checkUserLoggedIn() {
  try {
    // Step 1: Retrieve user data from AsyncStorage
    const userData = await AsyncStorage.getItem('user');

    // Step 2: Check if userData is not null and parse it
    if (userData) {
      const jsonObj = JSON.parse(userData);
      console.log(jsonObj);

      // Step 3: Check if jsonObj has a valid userId
      if (jsonObj.userId) {
        const usersCollection = collection(database, 'users');
        const userQuery = query(usersCollection, where('userId', '==', jsonObj.userId));
        const querySnapshot = await getDocs(userQuery);

        // Step 4: Check if user data exists in Firebase
        if (!querySnapshot.empty) {
          // Assuming there is only one document for the userId
          const userDoc = querySnapshot.docs[0];
          const firebaseUserData = userDoc.data();

          // Step 5: Optionally update the is_verified field in Firebase user data
          // firebaseUserData.is_verified = true;

          // Optional: Update the user document in Firebase if necessary
          // await setDoc(userDoc.ref, firebaseUserData);

          // Step 6: Store the updated data back into AsyncStorage
          await AsyncStorage.setItem('user', JSON.stringify(firebaseUserData));

          console.log('User verification status updated successfully');
          return firebaseUserData;
        } else {
          console.log('No user data found in Firebase for the given userId');
          return null;
        }
      } else {
        console.log('No valid userId found in the stored user data');
        return null;
      }
    } else {
      console.log('No user data found in AsyncStorage');
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

export async function updateUserInfo  (uri,userInfo) {
  try {
    // Retrieve the current logged-in user's username from AsyncStorage
    const storage = getStorage(app);

    const response = await fetch(uri);
    const blob = await response.blob();

    // Generate a unique ID for the image
    const uniqueId = uuid.v4();

    // Reference to the storage path
    const storageRef = ref(storage, `verificationDocuments/${uniqueId}.jpg`);
    
    // Upload the image
    await uploadBytes(storageRef, blob);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);
    console.log(downloadURL)
    const userDataString = await AsyncStorage.getItem('user');
    if (!userDataString) {
      console.error('User data not found in AsyncStorage');
      return;
    }
    const userData = JSON.parse(userDataString);
    userData.is_verified="true";
    userData.verifyDocument=downloadURL;

    const updatedUser = JSON.stringify(userData);

    await AsyncStorage.setItem('user', updatedUser);

    const username = userData.username;

    // Find the user in the Firestore collection
    const usersCollection = collection(database, 'users');
    const userQuery = query(usersCollection, where('username', '==', username));
    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.empty) {
      console.error('User not found in database');
      return;
    }

    


    querySnapshot.forEach(async (doc) => {

      const updatedData = {
        password: userInfo.password || doc.data().password,
        email: userInfo.email || doc.data().email,
        phonenumber: userInfo.phonenumber || doc.data().phonenumber,
        is_verified: true,
        profilepic: userInfo.profilepic || doc.data().profilepic || '',
        verifyDocument:  userData.verifyDocument || doc.data().verifyDocument || '',
        fullName: userInfo.fullName || doc.data().fullName || '',
        streetAddress: userInfo.streetAddress || doc.data().streetAddress || '',
        city: userInfo.city || doc.data().city || '',
        state: userInfo.state || doc.data().state || '',
        postalCode: userInfo.postalCode || doc.data().postalCode || '',
        course: userInfo.course || '',
        courseDepartment: userInfo.courseDepartment || '',
        courseType: userInfo.courseType || '',
        yearOfStudy: userInfo.yearOfStudy || '',
        graduationYear: userInfo.graduationYear || '',
        bio: userInfo.bio || doc.data().bio || '',
      }
      
      const userId = doc.id;
      console.log(userId)
      // Update user's information
      await updateDoc(doc.ref, updatedData );
    });

    console.log('User information updated successfully');
  } catch (error) {
    console.error('Error updating user information:', error);
  }
};



export const savePostToFirestore = async (post) => {
  try {
    const postRef = doc(collection(db, 'posts'), post.id);

    if (post.imgUrl) {
      const imageUri = post.imgUrl;
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const imageRef = ref(storage, `postImages/${uuid.v4()}`);
      await uploadBytes(imageRef, blob);
      const imageUrl = await getDownloadURL(imageRef);
      post.imgUrl = imageUrl;
    }

    await setDoc(postRef, post);
    console.log('Post successfully written!');
  } catch (error) {
    console.error('Error writing post to Firestore: ', error);
  }
};



export const fetchPostsFromFirestore = async () => {
  try {
    const postsCollection = collection(db, 'posts');
    const postsSnapshot = await getDocs(postsCollection);
    const postsList = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return postsList;
  } catch (error) {
    console.error('Error fetching posts from Firestore:', error);
    throw error;
  }
};

export const fetchPosts = async (lastVisiblePost, pageSize = 10) => {
  let q;

  if (lastVisiblePost) {
    q = query(
      collection(db, 'posts'),
      orderBy('createdAt', 'desc'),
      startAfter(lastVisiblePost),
      limit(pageSize)
    );
  } else {
    q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(pageSize));
  }

  const querySnapshot = await getDocs(q);
  const posts = [];
  querySnapshot.forEach((doc) => {
    posts.push({ id: doc.id, ...doc.data() });
  });

  const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  return { posts, lastVisible };
};