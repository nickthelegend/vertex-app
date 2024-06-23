import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, ActivityIndicator, RefreshControl, Dimensions } from "react-native";
import { useFonts } from "expo-font";
import * as NavigationBar from 'expo-navigation-bar';
import { Ionicons } from "@expo/vector-icons";
import { getFirestore, collection, query, where, orderBy, startAfter, limit, getDocs } from 'firebase/firestore';
import { app } from '../services/config';

import SPACING from "../utils/Spacing";
import CategoryButton from "../components/CategoryButton";
import UserPost from "../components/UserPost";
import HomeHeader from "../components/HomeHeader";
import { checkUserLoggedIn } from "../utils/FireBaseFunctions";

import currentUserProfilePic from "../assets/images/Avatar.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { Skeleton } from 'moti/skeleton';

export default function HomeScreen() {
  const [userFullName, setUserFullName] = useState('');
  const [currentUserId,setCurrentUserId] = useState(null)
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastVisiblePost, setLastVisiblePost] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTag, setSelectedTag] = useState("What's Happening");
  const deviceWidth = Dimensions.get("window").width;

  NavigationBar.setBackgroundColorAsync('#ffffff00');

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
    return null;
  }

  useEffect(() => {
    const fetchUserData = async () => {
      const loggedInUser = await checkUserLoggedIn();
      setUserFullName(loggedInUser.fullName);
      setCurrentUserId(loggedInUser.userId)
    };

    const fetchInitialPosts = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate 3 seconds loading
      const { posts, lastVisible } = await fetchPosts(null, selectedTag);
      setPosts(posts);
      setLastVisiblePost(lastVisible);
      setLoading(false);
    };

    fetchUserData();
    fetchInitialPosts();
  }, [selectedTag]);

  const fetchPosts = async (lastVisiblePost, tag) => {
    const db = getFirestore(app);
    let q;

    if (lastVisiblePost) {
      q = query(
        collection(db, 'posts'),
        where('postTags', '==', tag),
        orderBy('createdAt', 'desc'),
        startAfter(lastVisiblePost),
        limit(3)
      );
    } else {
      q = query(collection(db, 'posts'), where('postTags', '==', tag), orderBy('createdAt', 'desc'), limit(3));
    }

    const querySnapshot = await getDocs(q);
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, ...doc.data() });
    });

    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    return { posts, lastVisible };
  };

  const fetchMorePosts = async () => {
    if (loadingMore) return;
    setLoadingMore(true);
    const { posts: newPosts, lastVisible } = await fetchPosts(lastVisiblePost, selectedTag);

    // Filter out duplicates
    const existingPostIds = new Set(posts.map(post => post.id));
    const filteredNewPosts = newPosts.filter(post => !existingPostIds.has(post.id));

    setPosts([...posts, ...filteredNewPosts]);
    setLastVisiblePost(lastVisible);
    setLoadingMore(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setLoading(true); // Show skeleton during refresh
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate 3 seconds loading
    const { posts, lastVisible } = await fetchPosts(null, selectedTag);
    setPosts(posts);
    setLastVisiblePost(lastVisible);
    setRefreshing(false);
    setLoading(false); // Hide skeleton after refresh
  };

  const renderPostSkeleton = () => (
    <View style={{ backgroundColor: "#f7f7f7", padding: SPACING, marginBottom: SPACING * 1.7 }}>
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
  );

  const renderPost = ({ item }) => (
    (loading || refreshing) ? (
      renderPostSkeleton()
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
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: SPACING * 1, paddingTop: SPACING * 1 }}>
          <HomeHeader userFullName={userFullName} userProfilePic={currentUserProfilePic} userId={currentUserId} />
          <View style={{ flexDirection: "row", flexWrap: "wrap", marginVertical: SPACING * 2 }}>
            {["What's Happening", "Community", "Clubs", "Events", "Opportunities", "Question/Help"].map((tag) => (
              <CategoryButton 
                key={tag} 
                text={tag} 
                isSelected={selectedTag === tag}
                onPress={() => setSelectedTag(tag)}
              />
            ))}
          </View>
          <FlatList
            data={(loading || refreshing) ? Array(3).fill({}) : posts} // Display 3 skeletons while loading or refreshing
            renderItem={renderPost}
            keyExtractor={(item, index) => item.id || index.toString()} // Fallback to index as key when loading
            onEndReached={fetchMorePosts}
            onEndReachedThreshold={0.5}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
            ListFooterComponent={loadingMore ? <ActivityIndicator size="large" color="#0000ff" style={{ marginBottom: 50 }} /> : null}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
