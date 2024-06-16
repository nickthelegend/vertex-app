import React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function TrackOrder({route}) {
    const {orderId} = route.params;

    const navigation = useNavigation()

    


  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Track Order</Text>
        <View></View>
      </View>
     </SafeAreaView>
  );
}


const styles = StyleSheet.create({

    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#ffffff",
        borderBottomWidth: 1,
        borderBottomColor: "#dddddd",
        justifyContent: "space-between",
      },
      backButton: {
        marginRight: 10,
      },
      headerText: {
        fontSize: 25,
        fontFamily: "ComfortaaBold",
      },

})
