import React from 'react';
import { View, TextInput, Image,KeyboardAvoidingView } from 'react-native';
import SPACING from '../utils/Spacing';
import Spacing from '../utils/Spacing';
import { useFonts } from 'expo-font';

const CustomTextField = ({ drawableStart,hint,secureTextEntry, ...props }) => {

  const [fontsLoaded] = useFonts({
    'Comfortaa': require('../fonts/Comfortaa-VariableFont_wght.ttf'),
    'ComfortaaBold': require('../fonts/Comfortaa-Bold.ttf'),
    'MontserratBold': require('../fonts/Montserrat-Bold.ttf'),
    'Poppins-Regular' : require('../fonts/Poppins-Regular.ttf'),
    'Montserrat': require('../fonts/Montserrat-Regular.ttf'),

  }
    )
  

  if (!fontsLoaded) {
    // Return a loading indicator or null until fonts are loaded
    return null;
  }
  return (

    
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: SPACING * 1.6, borderRadius: SPACING * 2, borderWidth: 3,borderColor: '#79a3ff',marginVertical:SPACING,backgroundColor:'#f1f4ff' }}>

      {drawableStart && (
        <View style={{ marginRight: 5 }}>
          <View style={{ borderRightWidth: 1, borderRightColor: 'gray', paddingRight: 5 }}>
            {drawableStart}
          </View>
        </View>
      )}
        
      <TextInput style={{ flex: 1, paddingHorizontal: 1, fontSize: SPACING * 1.8, fontFamily: 'MontserratBold', color: 'black',fontWeight: '100' }} {...props} secureTextEntry={secureTextEntry} placeholder={hint} />
    </View>
  );
};

export default CustomTextField;
