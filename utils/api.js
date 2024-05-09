// api.js

import axios from 'axios';

const baseURL = 'https://peaceful-nicely-hermit.ngrok-free.app';

export const registerUser = async (rollno, email, phone, password) => {
  try {
    const newUser = {
      rollno,
      email,
      phone,
      password
    };

    const response = await axios.post(`${baseURL}/signup`, newUser);
    return response.data || { message: 'Registration failed: Server did not respond' }; // Return default error message if response is undefined
  } catch (error) {
    throw error.response?.data || { message: 'Registration failed: Server did not respond' }; // Return default error message if response is undefined
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredentials = {
      email,
      password
    };

    const response = await axios.post(`${baseURL}/login`, userCredentials);
    return response.data || { message: 'Login failed: Server did not respond' }; // Return default error message if response is undefined
  } catch (error) {
    throw error.response?.data || { message: 'Login failed: Server did not respond' }; // Return default error message if response is undefined
  }
};
