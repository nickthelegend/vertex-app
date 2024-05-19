import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity} from "react-native";
import { app } from "../services/config"
import { getAuth,createUserWithEmailAndPassword  } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

export default function SignupComponent() {

    function signUp() {
        const auth = getAuth(app);
        
        createUserWithEmailAndPassword(
            auth,
            "jane.doe@example.com",
            "SuperSecretPassword!"
        )
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
            
    }
  return (
    <View style={styles.container}>
            <Text style={styles.text}>Check For Firebase Integration!</Text>

                <TouchableOpacity style={styles.button_container} onPress={signUp}>
                <Text style={styles.button_text}>SignUp</Text>
            </TouchableOpacity>
        </View>
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginTop: 48,
    },
    text: {
        fontWeight:"bold",
        textAlign:"center",
        fontSize:24,
    },
    button_text: {
        textAlign:"center",
        fontSize:24,
        color:"#1976d2"
    },
    button_container: {
        borderRadius: 15,
        flexDirection: "row",
        margin: 16,
        padding:24,
        justifyContent:"center",
        backgroundColor:"#e6e6e6"
    },
  });
