import React, { useState } from "react";
import {
  Image,
  View,
  FlatList,
  Text,
  ImageBackground,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from "react-native";
import Spacing from "../utils/Spacing";
import Iconicons from "@expo/vector-icons/Ionicons.js";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
// import BodyReadable from "undici-types/readable";
const Tab = createMaterialTopTabNavigator();
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HomeScreen from "./HomeScreen";
// import { useNavigation } from "@react-navigation/native";
// Define your tabs/screens

const screenHeight = Dimensions.get('window').height;

const ReelsScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Reels Content</Text>
    </View>
  );
};

const renderButton = (text, onPress, isActive) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      padding: Spacing * 1.5, // Adjust padding as needed
      backgroundColor: isActive ? '#1F41BB' : 'transparent', // Change background color based on isActive
      marginVertical: 20, // Adjust margin as needed
      borderRadius: 8, // Adjust borderRadius as needed
    }}
  >
    <Text
      style={{
        textAlign: 'center',
        color: isActive ? '#fff' : '#000', // Change text color based on isActive
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16, // Adjust fontSize as needed
      }}
    >
      {text}
    </Text>
  </TouchableOpacity>
);
export default function ProfileScreen() {
  const [activeButton, setActiveButton] = useState('inbox'); // State to track active button
  const handlePosts= ()=>{
    setActiveButton('posts')
  }
  const handleReels= ()=>{
    setActiveButton('reels')
  }
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [scrollDirection, setScrollDirection] = useState("down");

  const onScroll = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const direction = currentOffset > 0 && currentOffset > scrollY ? "down" : "up";
    setScrollDirection(direction);
    setScrollY(currentOffset);
  };

  const translateY = scrollY.interpolate({
    inputRange: [0, 600],
    outputRange: [0, -300],
    extrapolate: "clamp",
  });

  // Adjust the value to increase the size of FlatList
  const flatListSize = scrollDirection === "up" ? screenHeight + 300 : screenHeight;

  const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

  const PhotosScreen = () => {
    // Image data
    const images = [
      {
        id: 1,
        source: require("../assets/photos/download.jpg"),
        backgroundColor: "#ffcccc",
      },
      {
        id: 2,
        source: require("../assets/photos/dowload2.jpg"),
        backgroundColor: "#ccffcc",
      },
      {
        id: 3,
        source: require("../assets/photos/download3.jpg"),
        backgroundColor: "#ccccff",
      },
      {
        id: 4,
        source: require("../assets/photos/download4.jpg"),
        backgroundColor: "#ffffcc",
      },
      {
        id: 5,
        source: require("../assets/photos/download4.jpg"),
        backgroundColor: "#ffffcc",
      },
      {
        id: 6,
        source: require("../assets/photos/download4.jpg"),
        backgroundColor: "#ffffcc",
      },
      {
        id: 7,
        source: require("../assets/photos/download4.jpg"),
        backgroundColor: "#ffffcc",
      },
      {
        id: 8,
        source: require("../assets/photos/download4.jpg"),
        backgroundColor: "#ffffcc",
      },
      {
        id: 9,
        source: require("../assets/photos/download4.jpg"),
        backgroundColor: "#ffffcc",
      },
      {
        id: 10,
        source: require("../assets/photos/download4.jpg"),
        backgroundColor: "#ffffcc",
      },

      // { id: 5, source: require('./assets/photos/download5.jpg'), backgroundColor: '#ffccff' },
      // { id: 6, source: require('./assets/photos/download6.jpg'), backgroundColor: '#ccffff' },
    ];

    // Render item function for FlatList
    const renderItem = ({ item }) => (
      <View
        style={[
          styles.imageContainer,
          { backgroundColor: item.backgroundColor },
        ]}
      >
        <Image source={item.source} style={styles.image} />
      </View>
    );

    return (
      <View style={{ flex: 1 }}>
        <Animated.FlatList
          style={{ flex: 1, height: flatListSize }}
        // contentContainerStyle={{flex:1}}
          data={images}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2} // 2 images per row
          // onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}


          scrollEventThrottle={16}
        />
      </View>
    );
  };
  const navigation = useNavigation();

  return (
    <View
      style={{
        paddingTop: Spacing * 3,
        // paddingHorizontal: Spacing * 2,
        flex: 1,
      }}
    >
      <ImageBackground
        source={require("../assets/images/background.jpg")}
        style={{
          height: Spacing * 18,
          padding: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Iconicons
            name="chevron-back"
            style={{ color: "#fff" }}
            size={Spacing * 3}
          />
        </TouchableOpacity>
      </ImageBackground>
      <View
        style={{
          flex: 1,
        }}
      >
        <Animated.View
          style={{
            backgroundColor: "#fff",
            padding: Spacing,
            borderTopLeftRadius: Spacing * 4,
            borderTopRightRadius: Spacing * 4,
            bottom: 100,
            height: screenHeight, 

            marginBottom: -100,
            // transform: [{ translateY }],
            // transform: {translateY}
            flex: 1,
            // backgroundColor: 'red'
          }}
        >
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Image
              source={require("../assets/images/Avatar.png")}
              style={{
                borderRadius: Spacing * 20,
                height: Spacing * 10,
                width: Spacing * 10,
                marginBottom: Spacing * 2,
                marginRight: Spacing,
                // bottom:50
              }}
            />
            <View style={{ flexDirection: "column", marginRight: Spacing * 2 }}>
              <Text style={{ ...styles.userFullName }}>Nihal</Text>
              <Text style={{ ...styles.userName }}>@nihal</Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end", marginRight: 20 }}>
              <View style={{ flexDirection: "row" }}>
                <MaterialIcons name="more-horiz" size={24} color="black" />
              </View>
            </View>
          </View>

          {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  borderRadius: Spacing * 8,
                  borderWidth: 1,
                  padding: Spacing * 1,
                  marginRight: Spacing * 1.2,
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../assets/icons/cake.png")}
                  style={{
                    width: 20,
                    height: 20,
                    marginRight: Spacing * 0.5,
                  }}
                />
                <Text
                  style={{
                    fontSize: Spacing * 1.5,
                    // fontFamily: 'Comfortaa',
                    color: "#000",
                  }}
                >
                  Sep 2
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  borderRadius: Spacing * 8,
                  borderWidth: 1,
                  padding: Spacing * 1,
                  marginRight: Spacing * 1.2,
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../assets/icons/openbook.png")}
                  style={{
                    width: 20,
                    height: 20,
                    marginRight: Spacing * 0.5,
                  }}
                />
                <Text
                  style={{
                    fontSize: Spacing * 1.5,
                    // fontFamily: 'Comfortaa',
                    color: "#000",
                  }}
                >
                  B.tech CSE
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  borderRadius: Spacing * 8,
                  borderWidth: 1,
                  padding: Spacing * 1,
                  marginRight: Spacing * 1.2,
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../assets/icons/yearofstudy.png")}
                  style={{
                    width: 20,
                    height: 20,
                    marginRight: Spacing * 0.5,
                  }}
                />
                <Text
                  style={{
                    fontSize: Spacing * 1.5,
                    // fontFamily: 'Comfortaa',
                    color: "#000",
                  }}
                >
                  1st Year
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  borderRadius: Spacing * 8,
                  borderWidth: 1,
                  padding: Spacing * 1,
                  marginRight: Spacing * 1.2,
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../assets/icons/graduationcap.png")}
                  style={{
                    width: 20,
                    height: 20,
                    marginRight: Spacing * 0.5,
                  }}
                />
                <Text
                  style={{
                    fontSize: Spacing * 1.5,
                    // fontFamily: 'Comfortaa',
                    color: "#000",
                  }}
                >
                  JNTU 27
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView> */}

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "Baumans",
                  fontSize: 24,
                  marginRight: Spacing * 0.5,
                }}
              >
                32
              </Text>
              <Text style={{ ...styles.titles }}>Posts</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "Baumans",
                  fontSize: 24,
                  marginRight: Spacing * 0.5,
                }}
              >
                423
              </Text>
              <Text style={{ ...styles.titles }}>Followers</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontFamily: "Baumans",
                  fontSize: 24,
                  marginRight: Spacing * 0.5,
                }}
              >
                1234
              </Text>
              <Text style={{ ...styles.titles }}>Following</Text>
            </View>
          </View>
          <View style={{}}>
            <Text style={{ ...styles.mainTitles, marginBottom: Spacing * 0.7 }}>
              Interests
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
            >
              <TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    borderRadius: Spacing,
                    borderWidth: 1,
                    alignSelf: "flex-start", // Adjust to occupy its containing space
                    padding: Spacing * 0.7,
                    marginRight: Spacing * 1.2,
                    marginBottom: Spacing * 1.2, // Add marginBottom for space between rows
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: Spacing * 1.3,
                      // fontFamily: 'Comfortaa',
                      color: "#000",
                    }}
                  >
                    Photography
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    borderRadius: Spacing,
                    borderWidth: 1,
                    alignSelf: "flex-start", // Adjust to occupy its containing space
                    padding: Spacing * 0.7,
                    marginRight: Spacing * 1.2,
                    marginBottom: Spacing * 1.2, // Add marginBottom for space between rows
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: Spacing * 1.3,
                      // fontFamily: 'Comfortaa',
                      color: "#000",
                    }}
                  >
                    Videography
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    borderRadius: Spacing,
                    borderWidth: 1,
                    alignSelf: "flex-start", // Adjust to occupy its containing space
                    padding: Spacing * 0.7,
                    marginRight: Spacing * 1.2,
                    marginBottom: Spacing * 1.2, // Add marginBottom for space between rows
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: Spacing * 1.3,
                      // fontFamily: 'Comfortaa',
                      color: "#000",
                    }}
                  >
                    Video Editing
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    borderRadius: Spacing,
                    borderWidth: 1,
                    alignSelf: "flex-start", // Adjust to occupy its containing space
                    padding: Spacing * 0.7,
                    marginRight: Spacing * 1.2,
                    marginBottom: Spacing * 1.2, // Add marginBottom for space between rows
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: Spacing * 1.3,
                      // fontFamily: 'Comfortaa',
                      color: "#000",
                    }}
                  >
                    Films
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    borderRadius: Spacing,
                    borderWidth: 1,
                    alignSelf: "flex-start", // Adjust to occupy its containing space
                    padding: Spacing * 0.7,
                    marginRight: Spacing * 1.2,
                    marginBottom: Spacing * 1.2, // Add marginBottom for space between rows
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: Spacing * 1.3,
                      // fontFamily: 'Comfortaa',
                      color: "#000",
                    }}
                  >
                    Dancing
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    borderRadius: Spacing,
                    borderWidth: 1,
                    alignSelf: "flex-start", // Adjust to occupy its containing space
                    padding: Spacing * 0.7,
                    marginRight: Spacing * 1.2,
                    marginBottom: Spacing * 1.2, // Add marginBottom for space between rows
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: Spacing * 1.3,
                      // fontFamily: 'Comfortaa',
                      color: "#000",
                    }}
                  >
                    Swimming
                  </Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>

          <View>
            <Text
              style={{
                fontFamily: "Comfortaa, sans-serif",
                fontSize: 18,
              }}
            >
              Hi this is nihal and i love to take photos, follow me on instagram
              :)
            </Text>
          </View>
              
              <View style={{backgroundColor:'red', flexDirection:'row'}}>

              {renderButton('Posts', handlePosts, activeButton === 'posts')}
              {renderButton('Reels', handleReels, activeButton === 'reels')}
              
              </View>
              <View style={{flex:1,backgroundColor:'green'}}>
              {activeButton == 'posts' ? <PhotosScreen/>:<ReelsScreen/>}
              </View>
              

              
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userFullName: {
    fontFamily: "Comfortaa",
    fontSize: Spacing * 4,
  },
  userName: {
    fontFamily: "Poppins-SemiBold",
  },
  titles: {
    fontFamily: "Comfortaa",
    color: "#555555",
    fontSize: 15,
  },
  mainTitles: {
    fontFamily: "ComfortaaBold",
    fontSize: 18,
  },
  context: {
    fontFamily: "Lato-Regular",
    fontSize: 24,
  },
  tabContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  imageContainer: {
    flex: 1,
    aspectRatio: 1, // Ensure square aspect ratio for images
    margin: 5,
    borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
