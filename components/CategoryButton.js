import React from 'react';
import { View, Text } from 'react-native';
import SPACING from '../utils/Spacing';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function CategoryButton({text}) {
  return (

    <TouchableOpacity>
<View style={{
        borderRadius: SPACING * 8,
        borderWidth: 1,
        alignSelf: 'flex-start', // Adjust to occupy its containing space
        padding: SPACING * 1.2,
        marginRight: SPACING * 1.2,
        marginBottom: SPACING * 1.2 // Add marginBottom for space between rows
    
      }}>
        <Text style={{
          fontSize: SPACING * 1.5,
          fontFamily: 'Comfortaa'
        }}>{text}</Text>
      </View>


    </TouchableOpacity>
    
  );
}
