import React, { useState } from "react";
import { View, Text, Image, Dimensions } from "react-native";
import TwitterIcons from "./TwitterIcons";
import SPACING from "../utils/Spacing";
import { Skeleton } from "moti/skeleton";
const deviceWidth = Dimensions.get("window").width;

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
  const [imageLoaded, setImageLoaded] = useState(false);

  // console.log("userPostPicture:", userPostPicture); // Add this line for debugging

  const handleImageLoad = () => {
    setTimeout(() => {
      setImageLoaded(true);
    }, 1000); // 2-second delay
  };

  return (
    <View
      style={{
        backgroundColor: "#f7f7f7",
        padding: SPACING,
        marginBottom: SPACING * 1.7,
        flex:1
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: SPACING,
          marginBottom: SPACING * 2,
          flex:1
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

        <View>
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

        {userPostPicture && userPostPicture.uri ? (
          <>
            {!imageLoaded && (
              <Skeleton
                colorMode="light"
                width={deviceWidth - SPACING * 2}
                height={deviceWidth - SPACING * 2}
                aspectRatio={1}
              />
            )}
            <Image
              source={userPostPicture}
              style={{
                width: "100%",
                aspectRatio: 1,
                resizeMode: "cover",
                marginBottom: 10, // Add margin if you want space between the image and icons
                display: imageLoaded ? "flex" : "none",
              }}
              onLoad={handleImageLoad}
            />
          </>
        ) : null}

        <TwitterIcons
          postComments={postComments}
          postLikes={postLikes}
          postRetweets={postRetweets}
        />
      </View>
    </View>
  );
}
