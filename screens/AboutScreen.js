import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import the MaterialCommunityIcons

export default function AboutScreen() {

  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        {/* <Image source={require('./assets/logo.png')} style={styles.logo} /> */}
        <MaterialCommunityIcons name="menu" size={24} color="black" style={styles.menuIcon} onPress={()=>{            navigation.openDrawer()}}/>
        <Text style={styles.headerText}>About</Text>

      </View>

      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems:'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 30,
    fontFamily: "Poppins-SemiBold",
    color: '#333',
    marginLeft:10
    // marginBottom: 10,
  },
 
});
