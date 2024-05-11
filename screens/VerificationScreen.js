import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function VerificationScreen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const galleryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

      setHasCameraPermission(cameraPermission.status === 'granted');
      setHasGalleryPermission(galleryPermission.status === 'granted');
    })();
  }, []);

  const openCamera = async () => {
    if (!hasCameraPermission) {
      alert('Camera permission required!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({ allowsEditing: true,quality:1 });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const openPicker = async () => {
    if (!hasGalleryPermission) {
      alert('Gallery permission required!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true });

    if (!result.canceled) {
      setSelectedImage(result.uri);
    }
  };

  useEffect(() => {
    // This effect runs every time selectedImage changes
    console.log(selectedImage);
  }, [selectedImage]);

  return (
            <View style={{ marginLeft: 20, paddingBottom: 10 }}>
        <Text style={{ fontSize: 30 ,fontFamily: "Poppins-SemiBold"}}>Upload Document</Text>

        <Text>Student ID Card</Text>
      <TouchableOpacity>

      <View style={{
        borderWidth: 1,
borderColor: '#bbbbbb', // Set border color to transparent
borderStyle: 'dashed', // Set border style to dashed
borderRadius: 0, // Set border radius to 0 for sharp edges
padding: 10, // Optional: Set padding
borderWidth:2,
marginRight:20,
marginTop:10,
// paddingHorizontal:30,
paddingHorizontal:30,
paddingVertical:20,
flexDirection:'row',
justifyContent:'space-between'

        }}>

        <Text style={{
          fontSize:20,
          color: '#868686',
          // fontFamily:''
        }}>Clear here to open camera</Text>
        <MaterialCommunityIcons name="upload" size={24} color="#868686" />

        </View>
      </TouchableOpacity>
       {/* <View>

        <Text style={{
          color:'#0d0d0d'
        }}>

          JPG,
        </Text>
       </View> */}
        {/* {selectedImage && <View>
        
        
        <Image source={{ uri: selectedImage }} style={{ width: 300, height: 400, marginTop: 20,resizeMode:"contain" }}
        
        
         />
        <TouchableOpacity onPress={openCamera} style={{ alignItems:"center",marginTop:20 }}>
          <View style={{ borderRadius: 20, padding: 20, backgroundColor: "#1d40bd" }}>
            <Text style={{ color: "#fff", fontSize: 20 }}>Upload</Text>
          </View>
        </TouchableOpacity>
        </View>
        }
        {!selectedImage && <TouchableOpacity onPress={openCamera} style={{ marginTop: 20 }}>
          <View style={{ borderRadius: 20, padding: 20, backgroundColor: "#1d40bd" }}>
            <Text style={{ color: "#fff", fontSize: 20 }}>Open Camera</Text>
          </View>
        </TouchableOpacity>} */}
      </View>
  );
}
