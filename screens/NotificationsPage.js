import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function NotificationsPage() {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notifications</Text>
        <View></View>
      </View>
     </SafeAreaView>
  );
}


const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd',
        justifyContent: 'space-between',
        paddingBottom: 20,
        paddingHorizontal: 15,
        paddingTop:10
      },
      backButton: {
        marginRight: 10,
      },
      headerText: {
        fontSize: 25,
        fontFamily: 'ComfortaaBold',
      },
      container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#ffffff',
      },

})