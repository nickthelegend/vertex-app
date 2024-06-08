import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get('window').width;

export default function CategoryBooks() {
  const navigation = useNavigation();
  const [selectedYear, setSelectedYear] = useState(null);

  const handleYearClick = (year) => {
    if (selectedYear === year) {
      setSelectedYear(null);
    } else {
      setSelectedYear(year);
    }
  };

  const handleDepartmentClick = (year, department) => {
    navigation.navigate('FilterScreen', { year: year, department: department });
  };

  const departments = ['Civil', 'Computer Science', 'Electrical', 'Electronics & Communications', 'Mechanical'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Books</Text>
        <View></View>
      </View>
      <View style={styles.yearContainer}>
        {[1, 2, 3, 4, 5].map((year) => (
          <View key={year}>
            <TouchableOpacity 
              style={[
                styles.yearButton, 
                selectedYear === year && styles.selectedYearButton
              ]}
              onPress={() => handleYearClick(year)}
            >
              <Text style={styles.yearText}>{`${year} Year`}</Text>
              <Ionicons name={selectedYear === year ? "chevron-up" : "chevron-down"} size={24} color="#fff" />
            </TouchableOpacity>
            {selectedYear === year && (
              <View style={styles.departmentContainer}>
                {departments.map((dept) => (
                  <TouchableOpacity 
                    key={dept} 
                    style={styles.departmentButton}
                    onPress={() => handleDepartmentClick(year, dept)}
                  >
                    <Text style={styles.departmentText}>{dept}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
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
  yearContainer: {
    padding: 20,
  },
  yearButton: {
    backgroundColor: '#1c40bd',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: screenWidth - 40, // full width with padding
  },
  selectedYearButton: {
    backgroundColor: '#3b5998',
  },
  yearText: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'ComfortaaBold',
  },
  departmentContainer: {
    padding: 15,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginVertical: 5,
  },
  departmentButton: {
    paddingVertical: 10,
  },
  departmentText: {
    fontSize: 18,
    color: '#1c40bd',
    fontFamily: "ComfortaaBold",
  },
});
