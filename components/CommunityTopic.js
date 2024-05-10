import React from 'react';
import { View, Text } from 'react-native';
import Spacing from '../utils/Spacing';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function CommunityTopic({text}) {
  return (
    <TouchableOpacity>
              <View
                style={{
                  borderRadius: Spacing * 0.9,
                  borderWidth: 1,
                  alignSelf: "flex-start", // Adjust to occupy its containing space
                  padding: Spacing * 0.5,
                  marginRight: Spacing * 1.2,
                  marginBottom: Spacing * 1.2, // Add marginBottom for space between rows
                }}
              >
                <Text
                  style={{
                    fontSize: Spacing * 1.2,
                    fontFamily: "Comfortaa",
                  }}
                >
                  {text}
                </Text>
              </View>
            </TouchableOpacity>
  );
}
