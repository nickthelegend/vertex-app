import React,{useState, useEffect} from "react";
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet , Modal} from "react-native";
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


  
  const renderMembersModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={toggleModal}
            >
              <Ionicons name="close" size={30} color="black" />
            </TouchableOpacity>
            <ScrollView style={{ padding: 20 }}>
              {community.memberIds.map((id, index) => (
                <Text key={index} style={styles.memberText}>{id}</Text>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };
  return (
    <SafeAreaView style={{ padding: 10, flex: 1 }}>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
            justifyContent: "space-between"
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>
          <View>
            <Text
              style={{
                fontSize: 23,
                fontFamily: "ComfortaaBold",
                marginRight: 10,
              }}
            >
              Community Page
            </Text>

            
          </View>

          

          <View>

          {renderEditButton()}
          </View>
        </View>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
       

        <ImageBackground
          // style={{
          //   backgroundColor: "green",
          //   borderRadius: 12,
          //   padding: 15,
          //   marginBottom: 12,
          // }}

          source={community.imageUrl ? { uri: community.imageUrl } : null}
    style={styles.myCommunityCard} // Using the existing style for the full-size effect
    imageStyle={{ borderRadius: 12 }}
        >
          <View>
            <Text
              style={{
                fontFamily: "Baumans",
                fontSize: 35,
                fontWeight: "bold",
                color: "#fff",
                marginBottom: 5,
              }}
            >
              {community.communityName}
            </Text>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome name="star" size={24} color="#ffcc01" />
              <Text style={{ color: "#fff", fontSize: 20, marginLeft: 5 }}>
                4.3
              </Text>

              <Text style={{ color: "#fff", fontSize: 20, marginLeft: 5 }}>
              ({community.memberIds.length} members)
              </Text>

              
            </View>
            <Text style={{ marginBottom: 30, fontSize: 18, color: "#fff" }}>
                  {community.description}
                </Text>

                {currentUser && currentUser.userId === community.createdByUserId && (
            <TouchableOpacity onPress={toggleModal} style={styles.viewMembersButton}>
              <Text style={styles.viewMembersButtonText}>View All Members</Text>
            </TouchableOpacity>
          )}
          {renderMembersModal()}
            <View style={{ marginTop: 20, flexDirection: "row" }}>
              
              {!joinedCommunity && <TouchableOpacity>
                
                <LinearGradient
                  colors={["#1d40bd", "#5075FA"]}
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 20,
                    flexDirection: "row",
                  }}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontFamily: "Comfortaa",
                      marginRight: 5,
                    }}
                  >
                    Join Community
                  </Text>
                  <Ionicons name="arrow-forward" size={23} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>}
            </View>
          </View>
        </ImageBackground>


        <View>
        <TouchableOpacity>
        <View>
        
</View>
        </TouchableOpacity>
            
        </View>

        <View style={{ flexDirection: 'row',borderBottomWidth:1,borderBottomColor:'#dadbdf' }}>
      <View style={{}}>
        {renderButton('About Community', handleAbout, activeButton === 'about')}
      </View>
      <View>
        {renderButton('Feed', handleFeed, activeButton === 'feed')}
      </View>

      <View>
        {renderButton('Updates', handleImportant, activeButton === 'important')}
      </View>

      <View>
        {renderButton('Events', handleEvents, activeButton === 'events')}
      </View>
    </View>

                    {/*you can remote the view below*/}
    <View>
        <Text>{community.description}</Text>
    </View>
      </ScrollView>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({

  myCommunityCard: {
    backgroundColor: "green",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },
  editButton: {
    backgroundColor: "#1d40bd",
    padding: 8,
    borderRadius: 20
  },
  viewMembersButton: {
    marginTop: 20,
    backgroundColor: "#1d40bd",
    padding: 10,
    borderRadius: 10,
    alignItems: 'center'
  },
  viewMembersButtonText: {
    color: 'white',
    fontSize: 16
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  memberText: {
    fontSize: 16,
    marginVertical: 10,
    color: 'black',
  },
})