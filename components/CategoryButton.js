import React from 'react';
import { View, Text } from 'react-native';
import SPACING from '../utils/Spacing';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function CategoryButton({ text, isSelected, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{
        borderRadius: SPACING * 8,
        borderWidth: 1,
        alignSelf: 'flex-start',
        padding: SPACING * 1.2,
        marginRight: SPACING * 1.2,
        marginBottom: SPACING * 1.2,
        backgroundColor: isSelected ? '#ADD8E6' : 'transparent', // Light blue background if selected
        borderColor: isSelected ? '#0000FF' : '#000000' // Dark blue border if selected
      }}>
        <Text style={{
          fontSize: SPACING * 1.5,
          fontFamily: 'Comfortaa',
          color: isSelected ? '#0000FF' : '#000000' // Dark blue text if selected
        }}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}
