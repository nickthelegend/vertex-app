import React from 'react';
import { View, Text,TextInput } from 'react-native';

export default function TextFieldPersonal({text}) {
  return (
    <View style={{
        marginTop:10
      }}>
      <Text
          style={{
            fontFamily: "ComfortaaBold",
          }}
        >
          {text}
        </Text>
        <View
          style={{
            borderWidth: 1,
            padding: 18,
            borderRadius: 10,
            marginRight: 20,
            marginTop: 5,
            // backgroundColor:'red'
          }}
        >
          <TextInput
            style={{
              // backgroundColor:'green',
              fontSize: 18,
              // padding:0.5
            }}
          />
        </View>
      </View>
  );
}
