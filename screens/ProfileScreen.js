import React, { useEffect, useState } from "react";
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
import { getFirestore, collection, doc, getDocs, query, where, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Skeleton } from 'moti/skeleton';
import { app } from '../services/config';

const ProfileScreen = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserFullName, setCurrentUserFullName] = useState("");
  const [currentUserName, setCurrentUserName] = useState("");
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const jsonObj = JSON.parse(userData);
        setCurrentUser(jsonObj.userId);
        setCurrentUserFullName(jsonObj.fullName);
        setCurrentUserName(jsonObj.username)
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      if (currentUser) {
        const db = getFirestore(app);
        const userDocRef = doc(db, "users", currentUser);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          const userPosts = userData.posts || [];

          if (userPosts.length > 0) {
            const postsQuery = query(
              collection(db, "posts"),
              where("id", "in", userPosts)
            );
            const postsSnapshot = await getDocs(postsQuery);
            const postsData = postsSnapshot.docs.map(doc => doc.data());

            setPosts(postsData);
          }
        } else {
          console.log("User document not found");
        }
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate 3 seconds loading

        setLoading(false);
      }
    };

    fetchPosts();
  }, [currentUser]);

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
                <Text style={styles.userFullName}>{currentUserFullName}</Text>
                <Text style={styles.userName}>{currentUserName}</Text>
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
            {loading ? (
  Array.from({ length: 10 }).map((_, index) => (
    <View key={index} style={styles.skeletonContainer}>
      <Skeleton width="100%" height={200} borderRadius={10} colorMode="light"  />
    </View>
  ))
) : (
  posts.map((post) => (
    post.imgUrl ? (
      <View key={post.id} style={styles.imageContainer}>
        <Image source={{ uri: post.imgUrl }} style={styles.image} />
      </View>
    ) : (
      <View key={post.id} style={styles.imageContainer}>
        <Text style={styles.postText}>{post.caption}</Text>
      </View>
    )
  ))
)}
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
    borderBottomWidth: 1,
    marginHorizontal: -20,
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  skeletonContainer: {
    width: "48%",
    marginVertical: 5,
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
  postText: {
    padding: 10,
    textAlign: "center",
    fontSize: 16,
  },
});

export default ProfileScreen;
