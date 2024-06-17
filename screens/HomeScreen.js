import React, { useEffect, useState } from "react";
import { View, FlatList, SafeAreaView, StyleSheet, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import { Dimensions } from "react-native";
import * as NavigationBar from 'expo-navigation-bar';
import { Ionicons } from "@expo/vector-icons";
import { getFirestore, collection, query, orderBy, startAfter, limit, getDocs } from 'firebase/firestore';
import { app } from '../services/config';

import SPACING from "../utils/Spacing";
import CategoryButton from "../components/CategoryButton";
import UserPost from "../components/UserPost";
import HomeHeader from "../components/HomeHeader";
import { checkUserLoggedIn } from "../utils/FireBaseFunctions";

import currentUserProfilePic from "../assets/images/Avatar.png";

export default function HomeScreen() {
  const [userFullName, setUserFullName] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastVisiblePost, setLastVisiblePost] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
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
    };

    const fetchInitialPosts = async () => {
      setLoading(true);
      const { posts, lastVisible } = await fetchPosts(null);
      setPosts(posts);
      setLastVisiblePost(lastVisible);
      setLoading(false);
    };

    fetchUserData();
    fetchInitialPosts();
  }, []);

  const fetchPosts = async (lastVisiblePost) => {
    const db = getFirestore(app);
    let q;

    if (lastVisiblePost) {
      q = query(
        collection(db, 'posts'),
        orderBy('createdAt', 'desc'),
        startAfter(lastVisiblePost),
        limit(3)
      );
    } else {
      q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'), limit(3));
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
    const { posts: newPosts, lastVisible } = await fetchPosts(lastVisiblePost);
    setPosts([...posts, ...newPosts]);
    setLastVisiblePost(lastVisible);
    setLoadingMore(false);
  };

  const renderPost = ({ item }) => (
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
}     postComments={item.comments.length}
      postLikes={item.likes.length}
      postRetweets={item.retweets ? item.retweets.length : 0}
      postContext={item.caption}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: SPACING * 1, paddingTop: SPACING * 1 }}>
          <HomeHeader userFullName={userFullName} userProfilePic={currentUserProfilePic} />
          <View style={{ flexDirection: "row", flexWrap: "wrap", marginVertical: SPACING * 2 }}>
            <CategoryButton text="What's Happening" />
            <CategoryButton text="Community" />
            <CategoryButton text="Clubs" />
            <CategoryButton text="Events" />
            <CategoryButton text="Opportunities" />
            <CategoryButton text="Question/Help" />
          </View>
          <FlatList
            data={posts}
            renderItem={renderPost}
            keyExtractor={(item) => item.id}
            onEndReached={fetchMorePosts}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loadingMore ? <ActivityIndicator size="large" color="#0000ff" /> : null}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
