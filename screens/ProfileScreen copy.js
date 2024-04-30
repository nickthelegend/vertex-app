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
        
      <ScrollView
        style={{
          backgroundColor: "#fff",
          padding: Spacing,
          borderTopLeftRadius: Spacing * 4,
          borderTopRightRadius: Spacing * 4,
          bottom: 25,
          flex: 1,
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
        <View style={{
          
        }}>
          <Text style={{...styles.mainTitles,marginBottom:Spacing*0.7}}>Interests</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} pagingEnabled>
              <TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    borderRadius: Spacing ,
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
                    borderRadius: Spacing ,
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
                    borderRadius: Spacing ,
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
                    borderRadius: Spacing ,
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
                    borderRadius: Spacing ,
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
                    borderRadius: Spacing ,
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
          <Text style={styles.context}>In the heart of a bustling city, nestled between towering skyscrapers and bustling streets, lies a tranquil park. The park is a haven of greenery, with lush trees swaying gently in the breeze and colorful flowers blooming in every corner. Paths wind their way through the park, inviting visitors to take leisurely strolls and explore its hidden treasures.

At the center of the park stands a majestic fountain, its waters sparkling in the sunlight. Children laugh and play around its edges, while couples sit on nearby benches, enjoying quiet moments together. The sound of birds chirping fills the air, adding to the peaceful ambiance.

As the day fades into evening, the park takes on a magical quality. Soft lights illuminate the pathways, casting a warm glow over the surroundings. The fountain dances with colorful lights, creating a mesmerizing display for all to enjoy. Families gather for picnics on the grass, while others gather around fire pits, roasting marshmallows and sharing stories.

In this urban oasis, amidst the hustle and bustle of city life, people find solace and connection with nature. It is a place of beauty and serenity, a retreat from the chaos of the world outside.In the heart of a bustling city, nestled between towering skyscrapers and bustling streets, lies a tranquil park. The park is a haven of greenery, with lush trees swaying gently in the breeze and colorful flowers blooming in every corner. Paths wind their way through the park, inviting visitors to take leisurely strolls and explore its hidden treasures.

At the center of the park stands a majestic fountain, its waters sparkling in the sunlight. Children laugh and play around its edges, while couples sit on nearby benches, enjoying quiet moments together. The sound of birds chirping fills the air, adding to the peaceful ambiance.

As the day fades into evening, the park takes on a magical quality. Soft lights illuminate the pathways, casting a warm glow over the surroundings. The fountain dances with colorful lights, creating a mesmerizing display for all to enjoy. Families gather for picnics on the grass, while others gather around fire pits, roasting marshmallows and sharing stories.

In this urban oasis, amidst the hustle and bustle of city life, people find solace and connection with nature. It is a place of beauty and serenity, a retreat from the chaos of the world outside.In the heart of a bustling city, nestled between towering skyscrapers and bustling streets, lies a tranquil park. The park is a haven of greenery, with lush trees swaying gently in the breeze and colorful flowers blooming in every corner. Paths wind their way through the park, inviting visitors to take leisurely strolls and explore its hidden treasures.

At the center of the park stands a majestic fountain, its waters sparkling in the sunlight. Children laugh and play around its edges, while couples sit on nearby benches, enjoying quiet moments together. The sound of birds chirping fills the air, adding to the peaceful ambiance.

As the day fades into evening, the park takes on a magical quality. Soft lights illuminate the pathways, casting a warm glow over the surroundings. The fountain dances with colorful lights, creating a mesmerizing display for all to enjoy. Families gather for picnics on the grass, while others gather around fire pits, roasting marshmallows and sharing stories.

In this urban oasis, amidst the hustle and bustle of city life, people find solace and connection with nature. It is a place of beauty and serenity, a retreat from the chaos of the world outside.</Text>
        </View>
      </ScrollView>
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
  mainTitles:{
    fontFamily: 'ComfortaaBold',
    fontSize: 18
  },
  context:{
    fontFamily: 'Lato-Regular',
    fontSize: 24
  }
});
