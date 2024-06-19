import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Dimensions
} from "react-native";
import Iconicons from "@expo/vector-icons/Ionicons.js";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getFirestore, collection, doc, getDocs, query, where, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Skeleton } from 'moti/skeleton';
import { app } from '../services/config';
import UserPost from "../components/UserPost";
import SPACING from "../utils/Spacing";

const ProfileScreen = () => {
  const [currentUserObject, setCurrentUserObj]= useState(null)
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserFullName, setCurrentUserFullName] = useState("");
  const [currentUserName, setCurrentUserName] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 3;
  const navigation = useNavigation();
  const deviceWidth = Dimensions.get("window").width;

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const jsonObj = JSON.parse(userData);
        setCurrentUserObj(jsonObj)
        setCurrentUser(jsonObj.userId);
        setCurrentUserFullName(jsonObj.fullName);
        setCurrentUserName(jsonObj.username);
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
            const reversedPostsData = postsData.reverse();

            setPosts(reversedPostsData.slice(0, postsPerPage));
            setAllPostsLoaded(reversedPostsData.length <= postsPerPage);
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

  const fetchMorePosts = async () => {
    if (!allPostsLoaded && !loadingMore) {
      setLoadingMore(true);
      const newPage = currentPage + 1;
      const startIndex = newPage * postsPerPage;
      const endIndex = startIndex + postsPerPage;

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
            const reversedPostsData = postsData.reverse();

            const newPosts = reversedPostsData.slice(startIndex, endIndex);
            setPosts([...posts, ...newPosts]);
            setAllPostsLoaded(reversedPostsData.length <= endIndex);
          }
        } else {
          console.log("User document not found");
        }

        setCurrentPage(newPage);
        setLoadingMore(false);
      }
    }
  };

  const renderFooter = () => {
    return (
      loadingMore && !allPostsLoaded ? (
        <View style={{ padding: 10 }}>
          <ActivityIndicator size="large" color="#0095f6" />
        </View>
      ) : null
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={loading ? Array.from({ length: 3 }) : posts}
        keyExtractor={(item, index) => loading ? index.toString() : item.id}
        ListHeaderComponent={() => (
          <>
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
                  <FlatList
                    data={["Photography", "Videography", "Video Editing", "Films", "Dancing", "Swimming"]}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity>
                        <View style={styles.interestItem}>
                          <Text style={styles.interestText}>{item}</Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </View>
                <View>
                  <Text style={styles.bioText}>
                    {currentUserObject.bio}
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}
        renderItem={({ item, index }) =>
          loading ? (
            <View key={index} style={{ backgroundColor: "#f7f7f7", marginBottom: SPACING * 2 }}>
              <View style={{ flexDirection: "row", alignItems: "center", marginVertical: SPACING, marginBottom: SPACING * 2 }}>
                <Skeleton colorMode="light" width={SPACING * 5} height={SPACING * 5} borderRadius={SPACING * 2} style={{ marginRight: SPACING }} />
                <View style={{}}>
                  <Skeleton colorMode="light" width={deviceWidth * 0.3} height={SPACING * 2} />
                  <Skeleton colorMode="light" width={deviceWidth * 0.2} height={SPACING * 2} style={{ marginTop: SPACING * 0.3 }} />
                </View>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Skeleton colorMode="light" width={deviceWidth * 0.2} height={SPACING * 2} />
                    <Skeleton colorMode="light" width={20} height={20} borderRadius={10} style={{ marginLeft: SPACING * 0.3 }} />
                  </View>
                </View>
              </View>
              <View>
                <Skeleton colorMode="light" width={deviceWidth - SPACING * 2} height={SPACING * 3} style={{ marginBottom: 10 }} />
                <Skeleton colorMode="light" width={deviceWidth - SPACING * 2} height={deviceWidth - SPACING * 2} aspectRatio={1} />
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: SPACING }}>
                  <Skeleton colorMode="light" width={SPACING * 6} height={SPACING * 3} />
                  <Skeleton colorMode="light" width={SPACING * 6} height={SPACING * 3} />
                  <Skeleton colorMode="light" width={SPACING * 6} height={SPACING * 3} />
                </View>
              </View>
            </View>
          ) : (
            <UserPost
              key={item.id}
              userProfilePic={{ uri: item.createdByUserProfilePic }}
              userPostPicture={{ uri: item.imgUrl }}
              userFullName={item.createdByUserFullname}
              username={item.createdByUserName}
              datePosted={
                new Date(item.createdAt.seconds * 1000).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })
              }
              postComments={item.comments.length}
              postLikes={item.likes.length}
              postRetweets={item.retweets ? item.retweets.length : 0}
              postContext={item.caption}
            />
          )
        }
        onEndReached={fetchMorePosts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

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
    width: "100%",
    marginVertical: 5,
  },
  photosContainer: {
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
