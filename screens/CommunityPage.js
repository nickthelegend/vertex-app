import React,{useState} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";


export default function CommunityPage() {

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
  return (
    <SafeAreaView style={{ padding: 10, flex: 1 }}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
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
              Reiki Healing Community
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "green",
            borderRadius: 12,
            padding: 15,
            marginBottom: 12,
          }}
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
              Reiki Healing
            </Text>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesome name="star" size={24} color="#ffcc01" />
              <Text style={{ color: "#fff", fontSize: 20, marginLeft: 5 }}>
                4.3
              </Text>

              <Text style={{ color: "#fff", fontSize: 20, marginLeft: 5 }}>
                (10K+ members)
              </Text>
            </View>
            <View style={{ marginTop: 20, flexDirection: "row" }}>
              <TouchableOpacity>
                <Text style={{ marginBottom: 30, fontSize: 18, color: "#fff" }}>
                  Relki healing channels universal energy, restoring balance and
                  promoting holistic well-being.
                </Text>
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
              </TouchableOpacity>
            </View>
          </View>
        </View>


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
        <Text>Welcome to Reiki Healing Community.</Text>
    </View>
      </ScrollView>
    </SafeAreaView>
  );
}