import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const LoadingIndicator = () => {
  return (
    <View style={styles.loadingContainer}>
      <LottieView style={styles.animation} source={require("../assets/lottie/Loading.json")} autoPlay loop />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  animation: {
    width: 300,
    height: 300,
  },
});

export default LoadingIndicator;
