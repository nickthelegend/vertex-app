import React,{useState} from "react";
import { View, Text, Image } from "react-native";
import Iconicons from "@expo/vector-icons/Ionicons.js";
import Spacing from "../utils/Spacing";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from "react-native-responsive-screen";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
// import { useState } from "react";
export default function SendMessage() {
  const [messageText, setMessageText] = useState('');
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor: "#e9f3fb",
        flex: 1,
      }}
    >
      <View
        style={{
          borderRadius: 30,
          // borderWidth: 10,
          backgroundColor: "#dcedf7",

          padding: 25,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginTop: 30,
            marginRight: 10,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Iconicons
              name="chevron-back"
              style={{ color: "#000",marginRight:10 }}
              size={12 * 3}
            />
          </TouchableOpacity>

          <View
            style={{
              flex: 1,
              //  backgroundColor: 'red'
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../assets/images/avatarboy1.png")}
                style={{
                  width: 40,
                  height: 40,
                  marginRight: Spacing * 1,
                }}
              />
              <View>
                <Text
                  style={{
                    fontFamily: "ComfortaaBold",
                    fontSize: Spacing * 1.6,
                  }}
                >
                  Sai Siddu
                </Text>
                <Text>@saisiddu</Text>
              </View>

              <View
                style={{
                  flex: 1,
                  alignItems: "flex-end",
                }}
              >
                <MaterialIcons name="more-horiz" size={24} color="black" />
              </View>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          bottom: 0,
          right: 0,
          left: 0,
          position: "absolute",
          paddingHorizontal: 20,
          paddingVertical: 20,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 30,
              padding: 21,
              flex: 1,
              justifyContent:"center"
            }}
          >
            <TextInput placeholder="Message" fontSize={wp(3)} onChangeText={setMessageText}/>
          </View>
          {messageText !== '' && (
            <TouchableOpacity>
              <View
                style={{
                  backgroundColor: "#e4cfff",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 20,
                  padding: 20,
                  marginLeft: 10,
                }}
              >
                <Ionicons name="send" size={30} color="black" />
              </View>
            </TouchableOpacity>
          )}
          
        </View>
      </View>
    </View>
  );
}
