import React from "react";
import {
  Image,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Iconicons from "@expo/vector-icons/Ionicons.js";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const images = [
    { id: 1, source: require("../assets/photos/download.jpg") },
    { id: 2, source: require("../assets/photos/dowload2.jpg") },
    { id: 3, source: require("../assets/photos/download3.jpg") },
    { id: 4, source: require("../assets/photos/download4.jpg") },
    { id: 5, source: require("../assets/photos/download4.jpg") },
    { id: 6, source: require("../assets/photos/download4.jpg") },
    { id: 7, source: require("../assets/photos/download4.jpg") },
    { id: 8, source: require("../assets/photos/download4.jpg") },
    { id: 9, source: require("../assets/photos/download4.jpg") },
    { id: 10, source: require("../assets/photos/download4.jpg") },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ImageBackground
          source={require("../assets/images/background.jpg")}
          style={styles.headerBackground}
        >
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIconContainer}>
            <Iconicons
              name="chevron-back"
              style={styles.backIcon}
              size={30}
            />
          </TouchableOpacity>
        </ImageBackground>
        <View style={styles.mainContent}>
          <View style={styles.profileContent}>
            <View style={styles.profileHeader}>
              <Image
                source={require("../assets/images/Avatar.png")}
                style={styles.profileImage}
              />
              <View style={styles.profileInfo}>
                <Text style={styles.userFullName}>Nihal</Text>
                <Text style={styles.userName}>@nihal</Text>
                {/* <View style={styles.statsContainer}>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>32</Text>
                    <Text style={styles.statTitle}>Posts</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>500</Text>
                    <Text style={styles.statTitle}>Followers</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>200</Text>
                    <Text style={styles.statTitle}>Following</Text>
                  </View>
                </View> */}
                {/* <TouchableOpacity style={styles.followButton}>
                  <Text style={styles.followButtonText}>Follow</Text>
                </TouchableOpacity> */}
              </View>
              <View style={styles.moreIconContainer}>
                <MaterialIcons name="more-horiz" size={24} color="black" />
              </View>
            </View>

            <View style={styles.infoRow}>
              <TouchableOpacity>
                <View style={styles.infoItem}>
                  <Image
                    source={require("../assets/icons/cake.png")}
                    style={styles.infoIcon}
                  />
                  <Text style={styles.infoText}>Sep 2</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.infoItem}>
                  <Image
                    source={require("../assets/icons/openbook.png")}
                    style={styles.infoIcon}
                  />
                  <Text style={styles.infoText}>B.tech CSE</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.infoItem}>
                  <Image
                    source={require("../assets/icons/yearofstudy.png")}
                    style={styles.infoIcon}
                  />
                  <Text style={styles.infoText}>1st Year</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.infoItem}>
                  <Image
                    source={require("../assets/icons/graduationcap.png")}
                    style={styles.infoIcon}
                  />
                  <Text style={styles.infoText}>JNTU 27</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.interestsContainer}>
              <Text style={styles.mainTitles}>Interests</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <TouchableOpacity>
                  <View style={styles.interestItem}>
                    <Text style={styles.interestText}>Photography</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.interestItem}>
                    <Text style={styles.interestText}>Videography</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.interestItem}>
                    <Text style={styles.interestText}>Video Editing</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.interestItem}>
                    <Text style={styles.interestText}>Films</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.interestItem}>
                    <Text style={styles.interestText}>Dancing</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View style={styles.interestItem}>
                    <Text style={styles.interestText}>Swimming</Text>
                  </View>
                </TouchableOpacity>
              </ScrollView>
            </View>

            <View>
              <Text style={styles.bioText}>
                Hi, this is Nihal and I love to take photos. Follow me on Instagram :)
              </Text>
            </View>

            <View style={styles.photosContainer}>
              {images.map((item) => (
                <View key={item.id} style={styles.imageContainer}>
                  <Image source={item.source} style={styles.image} />
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerBackground: {
    height: 200,
    padding: 10,
    justifyContent: "flex-end",
  },
  backIconContainer: {
    position: "absolute",
    top: 40,
    left: 10,
  },
  backIcon: {
    color: "#fff",
  },
  mainContent: {
    flex: 1,
  },
  profileContent: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: -30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 15,
  },
  userFullName: {
    fontSize: 22,
    fontWeight: "bold",
  },
  userName: {
    fontSize: 16,
    color: "#888",
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statTitle: {
    fontSize: 14,
    color: "#888",
  },
  followButton: {
    backgroundColor: "#0095f6",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  followButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  moreIconContainer: {
    paddingLeft: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  infoText: {
    fontSize: 14,
    color: "#333",
  },
  interestsContainer: {
    marginVertical: 10,
  },
  mainTitles: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  interestItem: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#e0e0e0",
    borderRadius: 15,
    marginRight: 10,
  },
  interestText: {
    fontSize: 14,
    color: "#333",
  },
  bioText: {
    fontSize: 14,
    color: "#333",
    marginVertical: 10,
    borderBottomWidth:1,
    marginHorizontal:-20,
    paddingHorizontal:20,
    paddingBottom:20
  },
  photosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  imageContainer: {
    width: "48%",
    marginVertical: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
});

export default ProfileScreen;
