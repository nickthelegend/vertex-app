import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { app } from '../services/config';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import ProfilePicture from '../components/ProfilePicture';  // Adjust the path as necessary
import { Skeleton } from 'moti/skeleton';
import UserPost from '../components/UserPost';  // Adjust the path as necessary
import SPACING from "../utils/Spacing";

const deviceWidth = Dimensions.get("window").width;

export default function SearchPage() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ users: [], posts: [] });
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Users');

  useEffect(() => {
    if (searchQuery) {
      handleSearch();
    } else {
      setSearchResults({ users: [], posts: [] });
    }
  }, [searchQuery]);

  const handleSearch = async () => {
    setLoading(true);
    const db = getFirestore(app);
    const usersRef = collection(db, 'users');
    const postsRef = collection(db, 'posts');

    const userDocs = await getDocs(usersRef);
    const postDocs = await getDocs(postsRef);

    const lowerCaseQuery = searchQuery.toLowerCase();
    const users = [];
    const posts = [];

    userDocs.forEach((doc) => {
      const user = doc.data();
      if (
        user.username.toLowerCase().includes(lowerCaseQuery) ||
        user.fullName.toLowerCase().includes(lowerCaseQuery)
      ) {
        users.push({ id: doc.id, ...user });
      }
    });

    postDocs.forEach((doc) => {
      const post = doc.data();
      if (post.caption.toLowerCase().includes(lowerCaseQuery)) {
        posts.push({ id: doc.id, ...post });
      }
    });

    setSearchResults({ users, posts });
    setLoading(false);
  };

  const renderUser = ({ item }) => (
    <View style={styles.resultItem}>
      {item.profilepic ? (
        <Image source={{ uri: item.profilepic }} style={styles.profilePic} />
      ) : (
        <ProfilePicture fullName={item.fullName} />
      )}

      <View style={styles.textContainer}>
        <Text style={styles.fullNameText}>{item.fullName}</Text>
        <Text style={styles.usernameText}>@{item.username}</Text>
      </View>
    </View>
  );

  const renderPost = ({ item }) => {
    const createdAt = item.createdAt ? new Date(item.createdAt.seconds * 1000) : null;
    const datePosted = createdAt ? createdAt.toDateString() : "Unknown date";

    return (
      <UserPost
        userProfilePic={{ uri: item.profilepic }}
        postContext={item.caption}
        userFullName={item.createdByUserFullname}
        username={item.createdByUserName}
        datePosted={datePosted}
        userPostPicture={item.imgUrl ? { uri: item.imgUrl } : null}
        postLikes={item.likes.length}
        postComments={item.comments.length}
        postRetweets={item.retweets ? item.retweets.length : 0}
      />
    );
  };

  const renderSkeleton = () => (
    <View style={styles.resultItem}>
      <Skeleton colorMode="light" radius={20} width={40} height={40} />
      <View style={styles.textContainer}>
        <Skeleton colorMode="light" width={120} height={16} />
        <Skeleton colorMode="light" width={80} height={14} style={{ marginTop: 4 }} />
      </View>
    </View>
  );

  const renderPostSkeleton = () => (
    <View style={{ backgroundColor: "#f7f7f7", padding: SPACING, marginBottom: SPACING * 1.7 }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginVertical: SPACING, marginBottom: SPACING * 2 }}>
        <Skeleton colorMode="light" width={SPACING * 5} height={SPACING * 5} borderRadius={SPACING * 2} style={{ marginRight: SPACING }} />
        <View>
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Search</Text>
        <View></View>
      </View>
      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={styles.categoryContainer}>
        <TouchableOpacity
          onPress={() => setSelectedCategory('Users')}
          style={[
            styles.categoryButton,
            selectedCategory === 'Users' && styles.categoryButtonSelected,
          ]}
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategory === 'Users' && styles.categoryTextSelected,
            ]}
          >
            Users
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedCategory('Posts')}
          style={[
            styles.categoryButton,
            selectedCategory === 'Posts' && styles.categoryButtonSelected,
          ]}
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategory === 'Posts' && styles.categoryTextSelected,
            ]}
          >
            Posts
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.resultsContainer}>
        {loading ? (
          <>
            {selectedCategory === 'Users' && (
              <>
                {Array.from({ length: 6 }).map((_, index) => (
                  <View key={index}>{renderSkeleton()}</View>
                ))}
              </>
            )}
            {selectedCategory === 'Posts' && (
              <>
                {Array.from({ length: 6 }).map((_, index) => (
                  <View key={index}>{renderPostSkeleton()}</View>
                ))}
              </>
            )}
          </>
        ) : (
          <>
            {selectedCategory === 'Users' && (
              <>
                <Text style={styles.resultsHeader}>Users</Text>
                <FlatList
                  data={searchResults.users}
                  renderItem={renderUser}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}
                />
              </>
            )}
            {selectedCategory === 'Posts' && (
              <>
                <Text style={styles.resultsHeader}>Posts</Text>
                <FlatList
                  data={searchResults.posts}
                  renderItem={renderPost}
                  keyExtractor={(item) => item.id}
                  showsVerticalScrollIndicator={false}

                />
              </>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    justifyContent: 'space-between',
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 25,
    fontFamily: 'ComfortaaBold',
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  categoryButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 4,
  },
  categoryButtonSelected: {
    backgroundColor: '#1c40bd',
    borderColor: '#1c40bd',
  },
  categoryText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  categoryTextSelected: {
    color: '#fff',
  },
  resultsContainer: {
    flex: 1,
  },
  resultsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 8,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textContainer: {
    marginLeft: 10,
  },
  fullNameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  usernameText: {
    fontSize: 14,
    color: '#888',
  },
  resultText: {
    fontSize: 16,
  },
});
