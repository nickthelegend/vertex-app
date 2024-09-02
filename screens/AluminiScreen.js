import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import CategoryButton from "../components/CategoryButton"; // Assuming this is the path to your CategoryButton component
import SPACING from "../utils/Spacing"; // Assuming this is the path to your spacing utility
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook for navigation
import Carousel, { Pagination } from 'react-native-snap-carousel';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function AlumniPage() {
  const [selectedCategory, setSelectedCategory] = useState("Career");
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0); // Manage the slide index
  const carouselRef = useRef(); // Reference for the Carousel component

  const slides = [
    { id: 1, image: require("../images/slides/slide1.jpg") }, // Replace with your slide images
    { id: 2, image: require("../images/slides/slide2.jpg") },
    { id: 3, image: require("../images/slides/slide3.jpg") },
    { id: 4, image: require("../images/slides/slide4.jpg") },

  ];

  const navigation = useNavigation();

  const handleSearchPress = () => {
    navigation.navigate('SearchPage'); // Replace 'SearchPage' with the name of your search page
  };

  const handleNotificationsPress = () => {
    navigation.navigate('NotificationsPage', { currentUserId: userId }); // Replace 'NotificationsPage' with the name of your notifications page
  };

  const handleMessagesPress = () => {
    navigation.navigate('MessagesPage'); // Replace 'MessagesPage' with the name of your messages page
  };

  const handleOpenDrawer = () => {
    navigation.openDrawer();
  };

  const renderSlide = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.slideImage} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={handleOpenDrawer}>
            <Image
              source={require("../assets/images/Avatar.png")}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Alumni Connection</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity onPress={handleSearchPress}>
            <Image
              source={require("../assets/icons/search.png")}
              style={styles.searchIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Automatic Slideshow with Pagination */}
      <Carousel
        ref={carouselRef}
        data={slides}
        renderItem={renderSlide}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        sliderHeight={screenHeight * 0.3} // Set slider height to half of the screen
        itemHeight={screenHeight * 0.3}
        autoplay={true}
        loop={true}
        autoplayInterval={5000}
        onSnapToItem={(index) => setCurrentSlideIndex(index)}
      />
      {/* Pagination directly below the slider */}
      <Pagination
        dotsLength={slides.length}
        activeDotIndex={currentSlideIndex}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />

      {/* Category Buttons */}
      <View style={styles.categories}>
        {["Career", "Events", "Community", "Workshops"].map((category) => (
          <CategoryButton 
            key={category} 
            text={category} 
            isSelected={selectedCategory === category}
            onPress={() => setSelectedCategory(category)}
          />
        ))}
      </View>
      
      {/* Content Section */}
      <View style={styles.content}>
        {selectedCategory === "Career" && <Text>Career Information and Resources</Text>}
        {selectedCategory === "Events" && <Text>Upcoming Events</Text>}
        {selectedCategory === "Community" && <Text>Alumni Community Initiatives</Text>}
        {selectedCategory === "Workshops" && <Text>Available Workshops</Text>}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING,
    paddingTop: SPACING,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    height: SPACING * 5,
    width: SPACING * 5,
    borderRadius: SPACING * 2,
    marginRight: SPACING * 2,
  },
  headerText: {
    fontSize: SPACING * 2.7,
    color: "#1e40bc",
    fontFamily: "ComfortaaBold",
    width: 300,
  },
  searchIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    tintColor: "black",
  },
  slide: {
    width: screenWidth, 
    height: screenHeight * 0.3, // Half the screen height
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 10, // Add rounded corners
    marginVertical: 10,
  },
  slideImage: {
    width: '100%',
    height: '100%', // Fill the entire slide view
    resizeMode: 'cover', // Ensure the image covers the entire slide
  },
  paginationContainer: {
    marginTop: -(screenHeight * 0.3), // Adjust to move it closer to the slider
    // marginBottom: 10,
    alignSelf: 'center', // Center the pagination
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: '#1c40bd',
  },
  inactiveDotStyle: {
    backgroundColor: '#434048',
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: SPACING * 2,
  },
  content: {
    flex: 1,
    paddingTop: SPACING * 2,
  },
});
