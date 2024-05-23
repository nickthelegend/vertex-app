import React from 'react';
import { View, Text,StyleSheet,Modal,TouchableOpacity } from 'react-native';
// import { TouchableOpacity } from 'react-native-gesture-handler';

export default function VerificationDialogueBox({ visible, onClose, title, message,onPressYes }) {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={{
            flexDirection:'row',
            // justifyContent:'space-between'
          }}>
<TouchableOpacity style={{
            // padding: 15,
            paddingHorizontal:30,
            paddingVertical:15,
            backgroundColor: '#ff0e0e',
            borderRadius:20,
            marginRight:50
          }} onPress={onClose}>
    
            <Text style={{color: '#fff',fontWeight: '500'}}>No</Text>

          </TouchableOpacity>

          <TouchableOpacity style={{
            paddingHorizontal:30,
            paddingVertical:15,
            backgroundColor: '#1e41be',
            borderRadius:20,
          }} onPress={onPressYes}>
    
            <Text style={{color: '#fff',fontWeight: '500'}}>Yes</Text>

          </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}


const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
      width: 300,
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    message: {
      fontSize: 16,
      marginBottom: 20,
      textAlign:'center'
    },
  });