import React from "react";
import { View, Text, Image } from "react-native";
import TwitterIcons from "./TwitterIcons";
import SPACING from "../utils/Spacing";
export default function UserPost({
  userProfilePic,
  postContext,
  userFullName,
  username,
  datePosted,
  userPostPicture,
  postLikes,
  postComments,
  postRetweets,
}) {
  return (

     {/* Use this if the thing is internet image source={{ uri: userProfilePicUri }} */},
    <View
      style={{
        backgroundColor: "#f7f7f7",
        padding: SPACING,
        marginBottom: SPACING * 1.7,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          // justifyContent: "space-between",
          marginVertical: SPACING,
          marginBottom: SPACING * 2,
        }}
      >
        <Image
          source={userProfilePic}
          style={{
            height: SPACING * 5,
            width: SPACING * 5,
            borderRadius: SPACING * 2,
            marginRight: SPACING,
          }}
        />

        <View style={{}}>
          <Text
            style={{
              color: "black",
            }}
          >
            {userFullName}
          </Text>
          <Text
            style={{
              color: "grey",
            }}
          >
            @{username}
          </Text>
        </View>

        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <View style={{ flexDirection: "row" }}>
            <Text>{datePosted}</Text>
            <Image
              source={require("../assets/icons/dropdown.png")}
              style={{
                marginLeft: SPACING * 0.3,
                width: 20,
                height: 20,
              }}
            />
          </View>
        </View>
      </View>

      <View>
        <Text style={{ marginBottom: 10 }}>{postContext}</Text>
        <Image
          source={userPostPicture}
          style={{
            width: "100%",
            aspectRatio: 1,
            resizeMode: "cover",
          }}
        />

        {/* Assuming TwitterIcons component is imported correctly */}
        <TwitterIcons
          postComments={postComments}
          postLikes={postLikes}
          postRetweets={postRetweets}
        />
      </View>
    </View>
  );
}
