import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spacing from '../utils/Spacing';
export default function CommunityScreen() {
  return (
    <SafeAreaView>
      <View
        style={{ paddingVertical: Spacing , paddingHorizontal: Spacing }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          

          <Text
            style={{
              fontSize: Spacing * 2.5,
              marginLeft: Spacing * 1.5,
              fontFamily: "ComfortaaBold",
            }}
          >
            Communities
          </Text>

          </View>
          </View>
          </SafeAreaView>
  );
}
