import React from 'react';
import { View, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import SPACING from '../utils/Spacing';
const PulseHeart = () => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Animatable.Text
        animation="pulse"
        easing="ease-out"
        iterationCount="infinite"
        style={{ fontSize: SPACING*2 }}
      >
        ❤️
      </Animatable.Text>
    </View>
  );
};

export default PulseHeart;
