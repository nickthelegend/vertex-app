import React from 'react';
import { View, Text,Image } from 'react-native';
import { useFonts } from 'expo-font';
import Spacing from '../utils/Spacing';
export default function ChatMessage() {

    const [fontsLoaded] = useFonts({
        AudioWideFont: require("../fonts/Audiowide-Regular.ttf"),
        Comfortaa: require("../fonts/Comfortaa-VariableFont_wght.ttf"),
        ComfortaaBold: require("../fonts/Comfortaa-Bold.ttf"),
        Montserrat: require("../fonts/Montserrat-Bold.ttf"),
        "Poppins-SemiBold": require("../fonts/Poppins-SemiBold.ttf"),
      });
    
      if (!fontsLoaded) {
        // Return a loading indicator or null until fonts are loaded
        return null;
      }
  return (
    <View style={{
        flexDirection: 'row',
        alignItems: 'center'
    }}>
      <Image source={require("../assets/images/avatarboy1.png")} style={{
        width: 65 ,
        height: 65,
        marginRight: Spacing* 1


      }}/>
      <View>
        <Text style={{
            fontFamily: 'ComfortaaBold',
            fontSize: Spacing*1.6,
            
        }}>Sai Siddu</Text>
        <Text style={{
            color: '#f92382'
        }}>3 new messages</Text>
      </View>

      <View style={{
        flex:1,
        alignItems: 'flex-end',
      }}>
        <Image source={require('../assets/icons/camera.png')} style={{

            width: 30,
            height: 30,
            resizeMode: 'contain'
        }}/>
      </View>
     </View>
  );
}
