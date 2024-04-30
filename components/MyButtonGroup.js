import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Spacing from '../utils/Spacing';

const MyButtonGroup = () => {
  const [activeButton, setActiveButton] = useState('inbox'); // State to track active button

  const handleInbox = () => {
    setActiveButton('inbox'); // Set active button to 'inbox' when Inbox button is clicked
  };

  const handleCommunity = () => {
    setActiveButton('community'); // Set active button to 'community' when Community button is clicked
  };

  const handleClubs = () => {
    setActiveButton('clubs'); // Set active button to 'community' when Community button is clicked
  };


  const handleEvents = () => {
    setActiveButton('events'); // Set active button to 'community' when Community button is clicked
  };

  const renderButton = (text, onPress, isActive) => (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: Spacing * 1.5, // Adjust padding as needed
        backgroundColor: isActive ? '#1F41BB' : 'transparent', // Change background color based on isActive
        marginVertical: 20, // Adjust margin as needed
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

  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={{ marginRight: 15 }}>
        {renderButton('Inbox', handleInbox, activeButton === 'inbox')}
      </View>
      <View>
        {renderButton('Communities', handleCommunity, activeButton === 'community')}
      </View>

      <View>
        {renderButton('Clubs', handleClubs, activeButton === 'clubs')}
      </View>

      <View>
        {renderButton('Events', handleEvents, activeButton === 'events')}
      </View>
    </View>
  );
};

export default MyButtonGroup;