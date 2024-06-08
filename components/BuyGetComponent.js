import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function BuyGetComponent() {
  const classifieds = [
    { id: 1, title: 'Classified 1' },
    { id: 2, title: 'Classified 2' },
    { id: 3, title: 'Classified 3' },
    { id: 4, title: 'Classified 4' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.buySellContent}>
          <Text style={styles.buySellTitle}>What do you want to buy/sell?</Text>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={24} color="#888" />
            <Text style={styles.searchPlaceholder}>Search by Books, Gadgets, etc</Text>
          </View>
          <View style={styles.categoriesContainer}>
            <TouchableOpacity style={[styles.categoryButton, styles.firstCategory]}>
              <Ionicons name="book-outline" size={24} color="#333" />
              <Text style={styles.categoryText}>Books</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Ionicons name="phone-portrait-outline" size={24} color="#333" />
              <Text style={styles.categoryText}>Gadgets</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Ionicons name="school-outline" size={24} color="#333" />
              <Text style={styles.categoryText}>Resources</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Ionicons name="ellipsis-horizontal-outline" size={24} color="#333" />
              <Text style={styles.categoryText}>Misc</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.recentlyAddedContainer}>
            <Text style={styles.recentlyAddedTitle}>Recently Added</Text>
            <TouchableOpacity>
              <Text style={styles.showMoreButton}>Show More</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.classifiedsContainer}>
            {classifieds.map((classified) => (
              <View key={classified.id} style={styles.classifiedItem}>
                <Text style={styles.classifiedTitle}>{classified.title}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  buySellContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  buySellTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchPlaceholder: {
    marginLeft: 10,
    color: '#888',
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
  },
  categoryButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    width: 80,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  firstCategory: {
    marginLeft: 0,
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  recentlyAddedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  recentlyAddedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  showMoreButton: {
    fontSize: 16,
    color: '#007bff',
  },
  classifiedsContainer: {
    marginTop: 10,
  },
  classifiedItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  classifiedTitle: {
    fontSize: 16,
  },
});
