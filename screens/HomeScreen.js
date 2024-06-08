import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  // SafeAreaView,
  Image,
  Dimensions,
  StyleSheet,
} from "react-native";
import * as Animatable from "react-native-animatable";
import SPACING from "../utils/Spacing";
import { useFonts } from "expo-font";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Spacing from "../utils/Spacing";
import CategoryButton from "../components/CategoryButton";
// import BottomNavigationBar from "../components/BottomNavigationBar";
import TwitterIcons from "../components/TwitterIcons"
import UserPost from "../components/UserPost";
import currentUserProfilePic from "../assets/images/Avatar.png";
import * as NavigationBar from 'expo-navigation-bar';
import { SafeAreaView } from "react-native-safe-area-context";
import userProfilePic from "../assets/images/avatar2.png";
import userPostPicture from "../assets/images/chicken.png";
import HomeHeader from "../components/HomeHeader";
import { checkUserLoggedIn } from "../utils/FireBaseFunctions.js";

export default function HomeScreen() {

  const [userFullName,setUserFullName]= useState('');
  NavigationBar.setBackgroundColorAsync('#ffffff00');

  const deviceWidth = Dimensions.get("window").width;

  const [fontsLoaded] = useFonts({
    AudioWideFont: require("../fonts/Audiowide-Regular.ttf"),
    Comfortaa: require("../fonts/Comfortaa-VariableFont_wght.ttf"),
    ComfortaaBold: require("../fonts/Comfortaa-Bold.ttf"),
    Montserrat: require("../fonts/Montserrat-Bold.ttf"),
    "Poppins-SemiBold": require("../fonts/Poppins-SemiBold.ttf"),
    Baumans: require('../fonts/Baumans/Baumans-Regular.ttf'),
    'Lato-Bold': require('../fonts/Lato/Lato-Bold.ttf'),
    'Lato-Regular': require('../fonts/Lato/Lato-Regular.ttf'),
    NotoSansGrantha: require('../fonts/Noto_Sans_Grantha/NotoSansGrantha-Regular.ttf'),
    NotoSansKawi: require('../fonts/Noto_Sans_Kawi/NotoSansKawi-VariableFont_wght.ttf')



  });

  if (!fontsLoaded) {
    // Return a loading indicator or null until fonts are loaded
    return null;
  }

console.log(userFullName)
  useEffect(() => {
    const fetchLoggedInUser = async () => {
      const loggedInUser = await checkUserLoggedIn();
      console.log(loggedInUser);
      setUserFullName(loggedInUser.fullName)
    };
    
    fetchLoggedInUser();
  
  }, []);
  return (
    <SafeAreaView style={{flex:1}}>

<View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: SPACING * 1,
          paddingTop: SPACING * 1,
        }}
      >

      <HomeHeader userFullName={userFullName} userProfilePic={currentUserProfilePic}/>
        {/* <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity>
              <Image
                source={require("../assets/images/Avatar.png")}
                style={{
                  height: SPACING * 5,
                  width: SPACING * 5,
                  borderRadius: SPACING * 2,
                  marginRight: SPACING * 2, // Adjust the specific distance between avatar and text
                }}
              />
            </TouchableOpacity>

            <Text
              style={{
                fontSize: SPACING * 2.7,
                color: "#1e40bc",
                fontFamily: "ComfortaaBold",
              }}
            >
              Hello, Nihal
            </Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              style={{
                marginRight: SPACING * 2,
              }}
            >
              <Image
                source={require("../assets/icons/search.png")}
                style={{
                  width: 24,
                  height: 24,
                  resizeMode: "contain",
                  tintColor: "black",
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginRight: SPACING * 2,
              }}
            >
              <Ionicons name="notifications" size={24} color="black" />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image
                source={require("../assets/icons/message.png")}
                style={{
                  width: 24,
                  height: 24,
                  resizeMode: "contain",
                  tintColor: "black",
                }}
              />
            </TouchableOpacity>
          </View>
        </View> */}

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginVertical: SPACING * 2,
          }}
        >
          <CategoryButton text="What's Happening" />

          <CategoryButton text="Community" />

          <CategoryButton text="Clubs" />

          <CategoryButton text="Events" />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}  >
        <UserPost
  userProfilePic={userProfilePic}
  userPostPicture={userPostPicture}
  userFullName="Sai Siddu"
  username="saisiddu"
  datePosted={"Sep 23"}
  postComments={"32.2K"}
  postLikes={"12.5M"}
  postRetweets={"4.3M"}
  postContext={"hi i am eating chicken pasta"}
  // Other props...

  
    />
    {/*THis is simpple please remove it TODO */ }
          <View
            style={{
              backgroundColor: "#f7f7f7",
              padding: SPACING,
              marginBottom: SPACING *1.7
            }}
            
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                // justifyContent: "space-between",
                marginVertical: SPACING,
                marginBottom: SPACING * 2,
              }}
            >
              <Image
                source={require("../assets/images/avatar3.png")}
                style={{
                  height: SPACING * 5,
                  width: SPACING * 5,
                  borderRadius: SPACING * 2,
                  marginRight: SPACING,
                }}
              />

              <View style={{}}>
                <Text
                  style={{
                    color: "black",
                  }}
                >
                  NICKTHELEGEND
                </Text>
                <Text
                  style={{
                    color: "grey",
                  }}
                >
                  @nickthelegend
                </Text>
              </View>

              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <View style={{ flexDirection: "row" }}>
                  <Text>Sep 23</Text>
                  <Image
                    source={require("../assets/icons/dropdown.png")}
                    style={{
                      marginLeft: SPACING * 0.3,
                      width: 20,
                      height: 20,
                    }}
                  />
                </View>
              </View>
            </View>

            <View>
              <Text style={{ marginBottom: 10 }}>
                really feeling depressed man i really want someone to talk to me 😢
              </Text>
              <Image
                source={require("../assets/images/images.jpg")}
                style={{
                  width: "100%", // Make the image width span the width of the container
                  aspectRatio: 1, // Maintain the aspect ratio of the image (1:1)
                  resizeMode: "cover", // Cover the container with the image, maintaining aspect ratio
                }}
              />

              <TwitterIcons/>
            </View>
          </View> 
        </ScrollView>
      </View>

      {/* <BottomNavigationBar /> */}
    </View>
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({});
