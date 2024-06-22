import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacing from "../utils/Spacing";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  getDocs,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import * as ImagePicker from "expo-image-picker";
import { Skeleton } from "moti/skeleton";

const screenWidth = Dimensions.get("window").width;
const database = getFirestore();
const storage = getStorage();

export default function CommunityScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [communityName, setCommunityName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [theme, setTheme] = useState("");
  const [image, setImage] = useState(null);
  const [allCommunities, setAllCommunities] = useState([]);
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  const handleOpenDrawer = () => {
    navigation.openDrawer();
  };

  useEffect(() => {
    fetchUserAndCommunities();
  }, []);

  const fetchUserAndCommunities = async () => {
    setLoading(true);
    const userData = await AsyncStorage.getItem("user");
    if (userData) {
      const jsonObj = JSON.parse(userData);
      if (jsonObj.userId) {
        setUserId(jsonObj.userId);
        const querySnapshot = await getDocs(collection(database, "communities"));
        const communityList = querySnapshot.docs.map((doc) => doc.data());

        const userCommunities = jsonObj.communitiesIds || [];
        setJoinedCommunities(
          communityList.filter((c) => userCommunities.includes(c.communityId))
        );
        setAllCommunities(
          communityList.filter((c) => !userCommunities.includes(c.communityId))
        );
      }
    }
    setTimeout(() => setLoading(false), 3000);
  };


  const handleViewCommunity = (community) => {
    navigation.navigate("CommunityPage", { community });
  };

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleCreateCommunity = async () => {
    const communityId = uuid.v4();
    const userData = await AsyncStorage.getItem("user");

    if (userData) {
      const jsonObj = JSON.parse(userData);

      if (jsonObj.userId) {
        const createdByName = jsonObj.fullName;
        const createdAt = new Date().toISOString();
        const createdByUserId = jsonObj.userId;

        let imageUrl = "";
        if (image) {
          const imageRef = ref(storage, `community_images/${communityId}`);
          const response = await fetch(image);
          const blob = await response.blob();
          await uploadBytes(imageRef, blob);
          imageUrl = await getDownloadURL(imageRef);
        }
        
        await setDoc(doc(collection(database, "communities"), communityId), {
          communityId,
          communityName,
          description,
          tags,
          theme,
          memberIds: [createdByUserId],
          postFeedIds: [],
          eventPostIds: [],
          importTantPostIds: [],
          challengesPostIds: [],
          createdAt,
          createdByName,
          createdByUserId,
          imageUrl,
        });
        const userRef = doc(database, "users", userId);
        await updateDoc(userRef, {
          communitiesIds: arrayUnion(community.communityId),
        });
  
        setModalVisible(false);
        fetchUserAndCommunities(); // Refresh the community list
      }
    }
  };

  const handleJoinCommunity = async (community) => {
    if (userId) {
      const communityRef = doc(database, "communities", community.communityId);
      const userRef = doc(database, "users", userId);

      // Update community data
      await updateDoc(communityRef, {
        memberIds: arrayUnion(userId),
      });

      // Update user data
      await updateDoc(userRef, {
        communitiesIds: arrayUnion(community.communityId),
      });

      await fetchUserAndCommunities(); // Refresh the community list
      console.log("Joined Community=>", community.communityName);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleOpenDrawer}>
            <Image
              source={require("../assets/images/Avatar.png")}
              style={styles.profilePic}
            />
          </TouchableOpacity>
          <Text style={styles.headerText}>Communities</Text>
          <TouchableOpacity
            style={styles.createCommunityButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.createCommunityButtonText}>
              Create Community
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 10 }}>
          <View style={styles.communitySectionHeader}>
            <Text style={styles.communitySectionTitle}>All Communities</Text>
            <TouchableOpacity>
              <Text>View All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.communityList}
            pagingEnabled
          >
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                <View key={index} style={{ marginRight: 20 }}>
                  <Skeleton
                    width={150}
                    height={150}
                    colorMode="light"
                    show={loading}
                    backgroundColor="#f2f2f2"
                    radius={12}
                    style={styles.skeletonCard}
                  />
                </View>
              ))
              : allCommunities.map((community) => (
                <TouchableOpacity
                  key={community.communityId}
                  onPress={() => handleJoinCommunity(community)}
                >
                  <View style={styles.communityCard}>
                    <View style={styles.communityCardInner}>
                      <View style={styles.communityCardIcon}>
                        <TouchableOpacity
                          style={styles.communityCardAddIcon}
                          onPress={() => handleJoinCommunity(community)}
                        >
                          <Image
                            source={require("../assets/icons/add.png")}
                            style={styles.communityCardAddImage}
                          />
                        </TouchableOpacity>
                      </View>
                      <Text>{community.communityName}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
          </ScrollView>

          <View>
            <Text style={styles.myCommunitiesTitle}>My Communities</Text>
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                <View key={index} style={{ marginBottom: 12 }}>
        <Skeleton
          width="100%"
          height={150}
          colorMode="light"
          show={loading}
          backgroundColor="#f2f2f2"
          radius={12}
          style={styles.skeletonCard}
        />
      </View>
                ))
              : joinedCommunities.map((community) => (
                  <View key={community.communityId} style={styles.myCommunityCard}>
                    <Text style={styles.myCommunityTitle}>
                      {community.communityName}
                    </Text>
                    <View style={styles.myCommunityRating}>
                      <FontAwesome
                        name="star"
                        size={24}
                        color="#ffcc01"
                      />
                      <Text style={styles.myCommunityRatingText}>4.3</Text>
                      <Text style={styles.myCommunityMembers}>
                        ({community.memberIds.length} members)
                      </Text>
                    </View>
                    <TouchableOpacity style={styles.viewCommunityButton}>
                      <LinearGradient
                        colors={["#1d40bd", "#5075FA"]}
                        style={styles.viewCommunityGradient}
                      >
                        <Text style={styles.viewCommunityText}>
                          View Community
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                ))}
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <ScrollView>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}
                style={styles.backButton}
              >
                <Ionicons name="arrow-back" size={30} color="black" />
              </TouchableOpacity>
              <Text style={styles.headerText}>Create Community</Text>
              <View></View>
            </View>
            <TextInput
              placeholder="Name of the community"
              value={communityName}
              onChangeText={setCommunityName}
              style={styles.input}
            />
            <TextInput
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
              style={styles.input}
              multiline
            />
            <TextInput
              placeholder="Tags (comma separated)"
              value={tags.join(", ")}
              onChangeText={(text) =>
                setTags(text.split(",").map((tag) => tag.trim()))
              }
              style={styles.input}
            />
            <TextInput
              placeholder="Theme"
              value={theme}
              onChangeText={setTheme}
              style={styles.input}
            />
            <Text style={styles.sectionTitle}>Community Picture</Text>
            {!image && (
              <TouchableOpacity onPress={handlePickImage} style={styles.addImageButton}>
                <Ionicons name="add" size={24} color="#000" />
              </TouchableOpacity>
            )}
            {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
            <TouchableOpacity
              style={styles.createButton}
              onPress={handleCreateCommunity}
            >
              <Text style={styles.createButtonText}>Create</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing,
    paddingHorizontal: Spacing,
    flex: 1,
  },
  headerText: {
    fontSize: 25,
    fontFamily: "ComfortaaBold",
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  profilePic: {
    height: Spacing * 5,
    width: Spacing * 5,
    borderRadius: Spacing * 2,
    marginRight: Spacing * 2,
  },
  createCommunityButton: {
    backgroundColor: "#1d40bd",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  createCommunityButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  communitySectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  communitySectionTitle: {
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
  },
  communityList: {
    flexDirection: "row",
  },
  communityCard: {
    alignItems: "center",
    marginRight: 30,
  },
  communityCardInner: {
    alignItems: "center",
  },
  communityCardIcon: {
    borderRadius: 50,
    backgroundColor: "red",
    width: 100,
    height: 100,
    marginBottom: 10,
    position: "relative",
  },
  communityCardAddIcon: {
    backgroundColor: "#1d40bd",
    borderRadius: 50,
    width: 40,
    height: 40,
    position: "absolute",
    bottom: -1,
    right: -1,
    justifyContent: "center",
    alignItems: "center",
  },
  communityCardAddImage: {
    width: "50%",
    height: "50%",
    tintColor: "white",
    resizeMode: "contain",
  },
  myCommunitiesTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 30,
  },
  myCommunityCard: {
    backgroundColor: "green",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },
  myCommunityTitle: {
    fontFamily: "Baumans",
    fontSize: 35,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  myCommunityRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  myCommunityRatingText: {
    color: "#fff",
    fontSize: 20,
    marginLeft: 5,
  },
  myCommunityMembers: {
    color: "#fff",
    fontSize: 20,
    marginLeft: 5,
  },
  viewCommunityButton: {
    marginTop: 20,
    flexDirection: "row",
  },
  viewCommunityGradient: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  viewCommunityText: {
    color: "white",
    fontFamily: "Comfortaa",
  },
  modalView: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
    fontFamily: "ComfortaaBold",
  },
  createButton: {
    flex: 1,
    backgroundColor: "#1c40bd",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  createButtonGradient: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  createButtonText: {
    fontSize: 18,
    color: "#fff",
    fontFamily: "ComfortaaBold",
  },
  imagePreview: {
    width: screenWidth / 3 - 20,
    height: screenWidth / 3 - 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  addImageButton: {
    width: screenWidth / 3 - 20,
    height: screenWidth / 3 - 20,
    borderRadius: 10,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "ComfortaaBold",
    marginBottom: 10,
  },
  skeletonCard: {
    backgroundColor: "#e0e0e0",
    marginBottom: 12,
  },
});
