import React from "react";
import {
  Image,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
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
const PhotosScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Photos Content</Text>
    </View>
  );
};

const ReelsScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Reels Content</Text>
    </View>
  );
};
export default function ProfileScreen() {
  const navigation = useNavigation();

  return (
    <View
      style={{
        paddingTop: Spacing * 3,
        // paddingHorizontal: Spacing * 2,
        flex: 1,
      }}
    >
      <ScrollView
        vertical
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, }}
        // contentContainerStyle={{flex: 1}}
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
            backgroundColor: "#fff",
            padding: Spacing,
            borderTopLeftRadius: Spacing * 4,
            borderTopRightRadius: Spacing * 4,
            bottom: 25,
            flex: 1,
            backgroundColor: 'red'
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

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View>
                <TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "row",
                      borderRadius: Spacing * 8,
                      borderWidth: 1,
                      alignSelf: "flex-start", // Adjust to occupy its containing space
                      padding: Spacing * 1,
                      marginRight: Spacing * 1.2,
                      marginBottom: Spacing * 1.2, // Add marginBottom for space between rows
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
              </View>

              <View>
                <TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "row",
                      borderRadius: Spacing * 8,
                      borderWidth: 1,
                      alignSelf: "flex-start", // Adjust to occupy its containing space
                      padding: Spacing * 1,
                      marginRight: Spacing * 1.2,
                      marginBottom: Spacing * 1.2, // Add marginBottom for space between rows
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
              </View>
              <View>
                <TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "row",
                      borderRadius: Spacing * 8,
                      borderWidth: 1,
                      alignSelf: "flex-start", // Adjust to occupy its containing space
                      padding: Spacing * 1,
                      marginRight: Spacing * 1.2,
                      marginBottom: Spacing * 1.2, // Add marginBottom for space between rows
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
              </View>
              <View>
                <TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "row",
                      borderRadius: Spacing * 8,
                      borderWidth: 1,
                      alignSelf: "flex-start", // Adjust to occupy its containing space
                      padding: Spacing * 1,
                      marginRight: Spacing * 1.2,
                      marginBottom: Spacing * 1.2, // Add marginBottom for space between rows
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
              </View>
            </View>
          </ScrollView>
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
        </View>
        <View style={{flex: 1}}>
        <Tab.Navigator
        tabBarOptions={{
          labelStyle: { fontSize: 16, fontFamily: "ComfortaaBold" },
          indicatorStyle: { backgroundColor: "#1e40bc" },
          style: { backgroundColor: "#ffffff" },
        }}
      >
        <Tab.Screen name="Photos" component={PhotosScreen} />
        <Tab.Screen name="Activity" component={ReelsScreen} />
      </Tab.Navigator>
        </View>
        
      </ScrollView>
      <View style={{flex: 1}}>
      
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
});
