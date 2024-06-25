import React, { useState, useEffect } from 'react';
import { Image, View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { getFirestore, collection, doc, getDocs, getDoc, query, where } from 'firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Iconicons from "@expo/vector-icons/Ionicons.js";
import { MaterialIcons } from "@expo/vector-icons";
import { Skeleton } from 'moti/skeleton';
import { app } from '../services/config';
import UserPost from "../components/UserPost";
import SPACING from "../utils/Spacing";

const OtherUserProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params;
  const [userData, setUserData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [allPostsLoaded, setAllPostsLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 3;
  const deviceWidth = Dimensions.get("window").width;
console.log(posts)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const db = getFirestore(app);
        const userDocRef = doc(db, "users", userId);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          setUserData(userDocSnapshot.data());
        } else {
          console.log("User document not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchPosts = async () => {
      try {
        if (userId) {
          const db = getFirestore(app);
          const userDocRef = doc(db, "users", userId);
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
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchUserData();
    fetchPosts();
  }, [userId]);

  const fetchMorePosts = async () => {
    try {
      if (!allPostsLoaded && !loadingMore) {
        setLoadingMore(true);
        const newPage = currentPage + 1;
        const startIndex = newPage * postsPerPage;
        const endIndex = startIndex + postsPerPage;

        if (userId) {
          const db = getFirestore(app);
          const userDocRef = doc(db, "users", userId);
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
    } catch (error) {
      console.error("Error fetching more posts:", error);
      setLoadingMore(false);
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
            <View style={styles.headerBackground}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIconContainer}>
                <Iconicons
                  name="chevron-back"
                  style={styles.backIcon}
                  size={30}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.mainContent}>
              <View style={styles.profileContent}>
                <View style={styles.profileHeader}>
                  <Image
                    source={{ uri: userData?.profilePic || "https://via.placeholder.com/100" }}
                    style={styles.profileImage}
                  />
                  <View style={styles.profileInfo}>
                    <Text style={styles.userFullName}>{userData?.fullName}</Text>
                    <Text style={styles.userName}>@{userData?.username}</Text>
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
                      <Text style={styles.infoText}>{userData?.birthday}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <View style={styles.infoItem}>
                      <Image
                        source={require("../assets/icons/openbook.png")}
                        style={styles.infoIcon}
                      />
                      <Text style={styles.infoText}>{userData?.course }</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <View style={styles.infoItem}>
                      <Image
                        source={require("../assets/icons/yearofstudy.png")}
                        style={styles.infoIcon}
                      />
                      <Text style={styles.infoText}>{userData?.yearOfStudy}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <View style={styles.infoItem}>
                      <Image
                        source={require("../assets/icons/graduationcap.png")}
                        style={styles.infoIcon}
                      />
                      <Text style={styles.infoText}>JNTU {userData?.graduationYear}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.interestsContainer}>
                  <Text style={styles.mainTitles}>Interests</Text>
                  <FlatList
                    data={userData?.interests || []}
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
                    {userData?.bio || "No Bio"}
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
                <Skeleton colorMode="light" width={deviceWidth - SPACING * 2} height={deviceWidth * 0.5} />
                <View style={{ paddingHorizontal: SPACING }}>
                  <Skeleton colorMode="light" width={deviceWidth * 0.6} height={SPACING * 2} style={{ marginTop: SPACING }} />
                  <Skeleton colorMode="light" width={deviceWidth * 0.4} height={SPACING * 2} style={{ marginTop: SPACING * 0.3 }} />
                  <Skeleton colorMode="light" width={deviceWidth * 0.8} height={SPACING * 2} style={{ marginTop: SPACING * 0.3 }} />
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
    backgroundColor: "#f0f0f0",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  backIconContainer: {
    padding: 5,
  },
  backIcon: {
    color: "#000",
  },
  mainContent: {
    padding: 15,
  },
  profileContent: {
    marginBottom: 20,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  userFullName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  userName: {
    color: "#888",
    fontSize: 16,
  },
  moreIconContainer: {
    marginLeft: 'auto',
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 8,
  },
  infoIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  infoText: {
    fontSize: 14,
  },
  interestsContainer: {
    marginTop: 20,
  },
  mainTitles: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  interestItem: {
    backgroundColor: "#e0e0e0",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  interestText: {
    fontSize: 14,
  },
  bioText: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default OtherUserProfileScreen;
