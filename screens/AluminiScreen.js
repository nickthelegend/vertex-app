import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import CategoryButton from "../components/CategoryButton";
import SPACING from "../utils/Spacing";
import { useNavigation } from '@react-navigation/native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function AlumniPage() {
  const [selectedCategory, setSelectedCategory] = useState("Career");
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const carouselRef = useRef();

  const slides = [
    { id: 1, image: require("../images/slides/slide1.jpg") },
    { id: 2, image: require("../images/slides/slide2.jpg") },
    { id: 3, image: require("../images/slides/slide3.jpg") },
    { id: 4, image: require("../images/slides/slide4.jpg") },
  ];

  const navigation = useNavigation();

  const handleSearchPress = () => {
    navigation.navigate('SearchPage');
  };

  const handleNotificationsPress = () => {
    navigation.navigate('NotificationsPage');
  };

  const handleMessagesPress = () => {
    navigation.navigate('MessagesPage');
  };

  const handleOpenDrawer = () => {
    navigation.openDrawer();
  };

  const handleSubCategoryPress = (screen) => {
    navigation.navigate(screen);
  };

  const handleCreateEventPress = () => {
    navigation.navigate('CreateEvents');
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
          <TouchableOpacity onPress={handleCreateEventPress}>
            <Ionicons name="add-circle-outline" size={30} color="black" style={styles.addButton} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        {/* Automatic Slideshow with Pagination in one View */}
        <View style={styles.carouselContainer}>
          <Carousel
            ref={carouselRef}
            data={slides}
            renderItem={renderSlide}
            sliderWidth={screenWidth}
            itemWidth={screenWidth}
            sliderHeight={screenHeight * 0.3}
            itemHeight={screenHeight * 0.3}
            autoplay={true}
            loop={true}
            autoplayInterval={5000}
            onSnapToItem={(index) => setCurrentSlideIndex(index)}
          />
          <Pagination
            dotsLength={slides.length}
            activeDotIndex={currentSlideIndex}
            containerStyle={styles.paginationContainer}
            dotStyle={styles.dotStyle}
            inactiveDotStyle={styles.inactiveDotStyle}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        </View>

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
          {selectedCategory === "Career" && (
            <View>
              <Text style={styles.sectionTitle}>Career Information and Resources</Text>
              {/* Subcategories for Career */}
              <View style={styles.subCategoriesContainer}>
                {[
                  { label: "Job", screen: "JobScreen" }, 
                  { label: "Internship", screen: "InternshipScreen" }, 
                  { label: "Mentorship", screen: "MentorshipScreen" }
                ].map((subCategory) => (
                  <TouchableOpacity 
                    key={subCategory.label} 
                    style={styles.subCategoryButton}
                    onPress={() => handleSubCategoryPress(subCategory.screen)}
                  >
                    <Text style={styles.subCategoryText}>{subCategory.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
          {selectedCategory === "Events" && (
            <View>
              <Text style={styles.sectionTitle}>Upcoming Events</Text>
              {/* Event Card */}
              <View style={styles.eventCard}>
                <Image
                  source={{ uri: 'https://almashines.s3.dualstack.ap-southeast-1.amazonaws.com/assets/images/eventlogos/sizea/27742691713254040.jpg' }}
                  style={styles.eventImage}
                />
                <View style={styles.eventDetails}>
                  <Text style={styles.eventTitle}>Meet the Achievers program on 15th April, 2024</Text>
                  <Text style={styles.eventDate}>Apr 15, 2024 - 9:30 AM</Text>
                  <Text style={styles.eventLocation}>Golden Jubilee Conference Hall, JNTUH Kukatpally, Hyderabad</Text>
                  <TouchableOpacity style={styles.eventButton} onPress={() => handleSubCategoryPress('EventDetailScreen')}>
                    <Text style={styles.eventButtonText}>View</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          {selectedCategory === "Community" && (
            <View>
              <Text style={styles.sectionTitle}>Alumni Community Initiatives</Text>
              {/* Community Details */}
              <View style={styles.eventCard}>
                <Image
                  source={{ uri: 'https://almashines.s3.dualstack.ap-southeast-1.amazonaws.com/assets/images/eventlogos/sizea/27742691713254040.jpg' }}
                  style={styles.eventImage}
                />
                <View style={styles.eventDetails}>
                  <Text style={styles.eventTitle}>Community Event Example</Text>
                  <Text style={styles.eventDate}>Apr 15, 2024 - 9:30 AM</Text>
                  <Text style={styles.eventLocation}>Location Example</Text>
                  <TouchableOpacity style={styles.eventButton}>
                    <Text style={styles.eventButtonText}>View</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          {selectedCategory === "Workshops" && (
            <View>
              <Text style={styles.sectionTitle}>Available Workshops</Text>
              {/* Workshops Details */}
              <View style={styles.eventCard}>
                <Image
                  source={{ uri: 'https://almashines.s3.dualstack.ap-southeast-1.amazonaws.com/assets/images/eventlogos/sizea/27742691713254040.jpg' }}
                  style={styles.eventImage}
                />
                <View style={styles.eventDetails}>
                  <Text style={styles.eventTitle}>Workshop on Skills Development</Text>
                  <Text style={styles.eventDate}>May 20, 2024 - 10:00 AM</Text>
                  <Text style={styles.eventLocation}>Location Example</Text>
                  <TouchableOpacity style={styles.eventButton}>
                    <Text style={styles.eventButtonText}>View</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
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
  addButton: {
    marginLeft: 15,
  },
  carouselContainer: {
    marginBottom: 20,
  },
  slide: {
    width: screenWidth, 
    height: screenHeight * 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 10,
    marginVertical: 10,
  },
  slideImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  paginationContainer: {
    alignSelf: 'center',
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
  sectionTitle: {
    fontSize: SPACING * 2,
    fontWeight: 'bold',
    marginBottom: SPACING,
  },
  subCategoriesContainer: {
    flexDirection: 'column',
    marginVertical: SPACING,
  },
  subCategoryButton: {
    height: 120,
    width: '100%',
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  subCategoryText: {
    fontSize: SPACING * 2,
    color: '#333',
    fontWeight: 'bold',
  },
  eventCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  eventImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
  eventDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 14,
    color: '#777777',
    marginBottom: 5,
  },
  eventLocation: {
    fontSize: 14,
    color: '#555555',
    marginBottom: 10,
  },
  eventButton: {
    backgroundColor: '#1e40bc',
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  eventButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
