import React from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import SPACING from '../utils/Spacing';

// Function to convert dp to pixels based on device density
const dpToPixels = (dp) => {
  const scale = Platform.OS === 'ios' ? 2 : 1;
  return dp * scale;
};

export default function CustomButton({ onPress, text, ...props }) {
  // Define dimensions in dp
  const padding = dpToPixels(17); // 17dp
  const borderRadius = dpToPixels(8); // 8dp
  const fontSize = dpToPixels(16); // 16dp

  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={{
          padding,
          backgroundColor: '#1F41BB',
          marginVertical: dpToPixels(20), // 20dp
          borderRadius,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            color: '#fff',
            fontFamily: 'Poppins-SemiBold',
            fontSize,
          }}
          {...props}
        >
          {text}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
