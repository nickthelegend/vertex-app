import React,{useState, useEffect} from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet , Modal} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function CommunityPage({route}) {
    const { community, joinedCommunity } = route.params
    const [currentUser, setCurrentUser] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
      setModalVisible(!isModalVisible);
    };

    const [activeButton, setActiveButton] = useState('about'); // State to track active button
    const handleAbout = () => {
        setActiveButton('about'); // Set active button to 'inbox' when Inbox button is clicked
      };
    
      const handleFeed = () => {
        setActiveButton('feed'); // Set active button to 'community' when Community button is clicked
      };
    
      const handleImportant = () => {
        setActiveButton('important'); // Set active button to 'community' when Community button is clicked
      };
    
    
      const handleEvents = () => {
        setActiveButton('events'); // Set active button to 'community' when Community button is clicked
      };

      const handleEditCommunity = () => {
        // Navigation to edit screen or toggle edit modal
        console.log("Edit Community");
      };
      const renderEditButton = () => {
        if (currentUser && currentUser.userId === community.createdByUserId) {

          console.log("Edit Button on")
          return (
            <TouchableOpacity onPress={handleEditCommunity} style={styles.editButton}>
              <Ionicons name="create-outline" size={24} color="white" />
            </TouchableOpacity>
          );
        } else{


          return ( <View></View>)
        }
      };
      const renderButton = (text, onPress, isActive) => (
        <TouchableOpacity
          onPress={onPress}
          style={{
            padding: 10 * 1.5, // Adjust padding as needed
            backgroundColor: isActive ? '#1F41BB' : 'transparent', // Change background color based on isActive
            marginTop: 20, // Adjust margin as needed
            marginBottom:5,
            borderRadius: 8, // Adjust borderRadius as needed
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              color: isActive ? '#fff' : '#000', // Change text color based on isActive
              fontFamily: 'Poppins-SemiBold',
              fontSize: 16, // Adjust fontSize as needed
            }}
          >
            {text}
          </Text>
        </TouchableOpacity>
      );
  const navigation = useNavigation();
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await AsyncStorage.getItem("user");
      const user = userData ? JSON.parse(userData) : null;
      setCurrentUser(user);
    };
    fetchUserData();
  }, []);


  
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
            {community.memberIds.map((id, index) => (
              <Text key={index} style={styles.memberText}>
                {id}
              </Text>
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
        <Text style={styles.headerTitle}>Community Page</Text>

        {/* <View></View> */}
        {renderEditButton()}
      </View>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={styles.myCommunityCard}>
          <View style={styles.imageContainer}>
            {community.imageUrl ? (
              <Image source={{ uri: community.imageUrl }} style={styles.communityImage} />
            ) : (
              <View style={styles.noImagePlaceholder}>
                <Text style={styles.noImageText}>No Image</Text>
              </View>
            )}
            <LinearGradient colors={['rgba(0,0,0,0.8)', 'transparent']} style={styles.gradientOverlay}>
              <Text style={styles.myCommunityTitle}>{community.communityName}</Text>
              <View style={styles.myCommunityRating}>
                <FontAwesome name="star" size={24} color="#ffcc01" />
                <Text style={styles.myCommunityRatingText}>4.3</Text>
                <Text style={styles.myCommunityMembers}>({community.memberIds.length} members)</Text>
              </View>
              <Text style={styles.communityDescription}>{community.description}</Text>
              {currentUser && currentUser.userId === community.createdByUserId && (
                <TouchableOpacity onPress={toggleModal} style={styles.viewMembersButton}>
                  <Text style={styles.viewMembersButtonText}>View All Members</Text>
                </TouchableOpacity>
              )}
            </LinearGradient>
          </View>
        </View>
        {renderMembersModal()}
        <View style={styles.buttonGroup}>
          {renderButton('About Community', handleAbout, activeButton === 'about')}
          {renderButton('Feed', handleFeed, activeButton === 'feed')}
          {renderButton('Updates', handleImportant, activeButton === 'important')}
          {renderButton('Events', handleEvents, activeButton === 'events')}
        </View>
        <View>
          <Text>{community.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 23,
    fontFamily: "ComfortaaBold",
    marginRight: 10,
  },
  myCommunityCard: {
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    overflow: 'hidden',
  },
  communityImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  noImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#d9d9d9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noImageText: {
    color: '#666',
    fontSize: 18,
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  myCommunityTitle: {
    fontFamily: 'Baumans',
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  myCommunityRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  myCommunityRatingText: {
    color: '#fff',
    fontSize: 22,
    marginLeft: 5,
    fontWeight: '600',
  },
  myCommunityMembers: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 10,
  },
  communityDescription: {
    fontSize: 18,
    color: '#ddd',
    lineHeight: 24,
  },
  viewMembersButton: {
    marginTop: 15,
    backgroundColor: "#1d40bd",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewMembersButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
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
  memberText: {
    fontSize: 18,
    marginVertical: 10,
    color: 'black',
  },
  buttonGroup: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#dadbdf',
  },

  editButton: {
    backgroundColor: "#1d40bd",
    padding: 8,
    borderRadius: 20
  }
});