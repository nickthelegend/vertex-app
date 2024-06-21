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
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacing from "../utils/Spacing";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { getFirestore, collection, setDoc, doc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get('window').width;
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
  const [communities, setCommunities] = useState([]);

  const handleOpenDrawer = () => {
    navigation.openDrawer();
  };

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    const querySnapshot = await getDocs(collection(database, "communities"));
    const communityList = querySnapshot.docs.map((doc) => doc.data());
    setCommunities(communityList);
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

        setModalVisible(false);
        fetchCommunities();  // Refresh the community list
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleOpenDrawer}>
            <Image source={require("../assets/images/Avatar.png")} style={styles.profilePic} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Communities</Text>
          <TouchableOpacity
            style={styles.createCommunityButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.createCommunityButtonText}>Create Community</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 10 }}>
          <View style={styles.communitySectionHeader}>
            <Text style={styles.communitySectionTitle}>All Communities</Text>
            <TouchableOpacity>
              <Text>View All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.communityList}>
            {["Spirituality", "Art & Craft", "Anime", "Coding", "Games", "News"].map((topic) => (
              <TouchableOpacity key={topic}>
                <View style={styles.communityCard}>
                  <View style={styles.communityCardInner}>
                    <View style={styles.communityCardIcon}>
                      <View style={styles.communityCardAddIcon}>
                        <Image
                          source={require("../assets/icons/add.png")}
                          style={styles.communityCardAddImage}
                        />
                      </View>
                    </View>
                    <Text>{topic}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View>
            <Text style={styles.myCommunitiesTitle}>My Communities</Text>
            <View style={styles.myCommunityCard}>
              <Text style={styles.myCommunityTitle}>Reiki Healing</Text>
              <View style={styles.myCommunityRating}>
                <FontAwesome name="star" size={24} color="#ffcc01" />
                <Text style={styles.myCommunityRatingText}>4.3</Text>
                <Text style={styles.myCommunityMembers}>(10K+ members)</Text>
              </View>
              <TouchableOpacity style={styles.viewCommunityButton}>
                <LinearGradient colors={["#1d40bd", "#5075FA"]} style={styles.viewCommunityGradient}>
                  <Text style={styles.viewCommunityText}>View Community</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text style={styles.communitySectionTitle}>Community List</Text>
            {communities.map((community) => (
              <View key={community.communityId} style={styles.communityItem}>
                <View style={styles.communityItemHeader}>
                  <Image
                    source={community.imageUrl ? { uri: community.imageUrl } : require("../assets/images/Avatar.png")}
                    style={styles.communityAvatar}
                  />
                  <View style={styles.communityInfo}>
                    <Text style={styles.communityTitle}>{community.communityName}</Text>
                    <Text>{community.memberIds.length} members</Text>
                  </View>
                </View>
                <Text>{community.description}</Text>
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
          <View style={{flexDirection:'row', alignItems:"center", justifyContent:"space-between",marginBottom:20}}>
          <TouchableOpacity onPress={()=>{setModalVisible(false)}} style={styles.backButton}>

        <Ionicons name="arrow-back" size={30} color="black" />

        </TouchableOpacity>



        <Text style={styles.headerText}>Create Community</Text>
          <View>

          </View>
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
              onChangeText={(text) => setTags(text.split(",").map(tag => tag.trim()))}
              style={styles.input}
            />
            <TextInput
              placeholder="Theme"
              value={theme}
              onChangeText={setTheme}
              style={styles.input}
            />

            <Text style={styles.sectionTitle}>Community Picture</Text>

            {!image &&<TouchableOpacity onPress={handlePickImage} style={styles.addImageButton}>
              <Ionicons name="add" size={24} color="#000" />
            </TouchableOpacity>}
            {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
            <TouchableOpacity style={styles.createButton} onPress={handleCreateCommunity}>
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
    fontFamily: 'ComfortaaBold',
    // marginBottom:20,

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
  communityItem: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderColor: "#000",
    borderRadius: 15,
  },
  communityItemHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  communityAvatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 5,
  },
  communityInfo: {
    flexDirection: "column",
  },
  communityTitle: {
    fontWeight: "700",
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
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    fontFamily: "ComfortaaBold",
  },
  createButton: {
    flex: 1,
    backgroundColor: '#1c40bd',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop:20
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
    color: '#fff',
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
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },


  sectionTitle: {
    fontSize: 20,
    fontFamily: 'ComfortaaBold',
    marginBottom: 10,
  },
});
