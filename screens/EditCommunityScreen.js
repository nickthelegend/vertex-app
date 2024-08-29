import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const database = getFirestore();
const storage = getStorage();

export default function EditCommunityScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { community } = route.params; // Retrieve community data passed from CommunityPage

  const [communityName, setCommunityName] = useState(community.communityName);
  const [description, setDescription] = useState(community.description);
  const [admins, setAdmins] = useState(community.admins || []);
  const [members, setMembers] = useState(community.memberIds || []);
  const [selectedAdmin, setSelectedAdmin] = useState("");
  const [imageUrl, setImageUrl] = useState(community.imageUrl);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Fetch the current user details
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await AsyncStorage.getItem("user");
      const user = userData ? JSON.parse(userData) : null;
      // Use the user data if needed for admin privileges
    };
    fetchUserData();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSave = async () => {
    try {
      // Update the community document in Firestore
      const communityRef = doc(database, "communities", community.communityId);
      await updateDoc(communityRef, {
        communityName,
        description,
        admins,
        imageUrl,
      });

      Alert.alert("Success", "Community details updated successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating community:", error);
      Alert.alert("Error", "Failed to update community details.");
    }
  };

  const handleAddAdmin = (memberId) => {
    if (memberId && !admins.includes(memberId)) {
      setAdmins([...admins, memberId]);
      toggleModal(); // Close modal after promoting to admin
    }
  };

  const handleRemoveAdmin = (adminId) => {
    setAdmins(admins.filter((admin) => admin !== adminId));
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0].uri;
      uploadImage(selectedImage);
    }
  };

  const uploadImage = async (uri) => {
    try {
      setIsUploading(true); // Show loading state during upload
      const response = await fetch(uri);
      const blob = await response.blob();
      const imageRef = ref(storage, `community_images/${community.communityId}`);
      await uploadBytes(imageRef, blob);
      const newImageUrl = await getDownloadURL(imageRef);
      setImageUrl(newImageUrl); // Update state with new image URL
      setIsUploading(false);
      Alert.alert("Success", "Image updated successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsUploading(false);
      Alert.alert("Error", "Failed to upload image.");
    }
  };

  const renderMembersModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={toggleModal}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Ionicons name="close" size={30} color="black" />
          </TouchableOpacity>
          <ScrollView style={{ padding: 20 }}>
            {members.map((id, index) => (
              <View key={index} style={styles.memberItem}>
                <Text style={styles.memberText}>{id}</Text>
                <TouchableOpacity
                  style={styles.promoteButton}
                  onPress={() => handleAddAdmin(id)}
                >
                  <Text style={styles.promoteButtonText}>Promote to Admin</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={{ padding: 10, flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Community</Text>
        <View></View>
      </View>
      <ScrollView style={styles.container}>
        <TextInput
          placeholder="Community Name"
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
        <Text style={styles.sectionTitle}>Community Image</Text>
        {imageUrl ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUrl }} style={styles.communityImage} />
            <LinearGradient
              colors={["rgba(0,0,0,0.5)", "transparent"]}
              style={styles.gradientOverlay}
            >
              <TouchableOpacity style={styles.editImageButton} onPress={pickImage}>
                <Ionicons name="create-outline" size={20} color="#fff" />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        ) : (
          <TextInput
            placeholder="Image URL"
            value={imageUrl}
            onChangeText={setImageUrl}
            style={styles.input}
          />
        )}
        {isUploading && <Text style={styles.uploadingText}>Uploading...</Text>}
        <Text style={styles.sectionTitle}>Admins</Text>
        <View style={styles.adminsContainer}>
          {admins.map((adminId) => (
            <View key={adminId} style={styles.adminItem}>
              <Text>{adminId}</Text>
              <TouchableOpacity onPress={() => handleRemoveAdmin(adminId)}>
                <Ionicons name="close" size={20} color="red" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.addAdminButton} onPress={toggleModal}>
          <Text style={styles.addAdminButtonText}>Manage Admins</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        {renderMembersModal()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 25,
    fontFamily: "ComfortaaBold",
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
  sectionTitle: {
    fontSize: 18,
    fontFamily: "ComfortaaBold",
    marginBottom: 10,
  },
  imageContainer: {
    position: "relative",
    marginBottom: 20,
  },
  communityImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    resizeMode: "cover",
  },
  gradientOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 50,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 10,
    borderRadius: 10,
  },
  editImageButton: {
    backgroundColor: "#1d40bd",
    padding: 5,
    borderRadius: 5,
  },
  uploadingText: {
    textAlign: "center",
    color: "#1d40bd",
    marginBottom: 20,
    fontSize: 16,
  },
  adminsContainer: {
    marginBottom: 20,
  },
  adminItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginBottom: 10,
  },
  addAdminButton: {
    backgroundColor: "#1d40bd",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  addAdminButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#1d40bd",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "ComfortaaBold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  memberItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 10,
  },
  memberText: {
    fontSize: 18,
    color: 'black',
  },
  promoteButton: {
    backgroundColor: '#1d40bd',
    padding: 5,
    borderRadius: 8,
  },
  promoteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});
