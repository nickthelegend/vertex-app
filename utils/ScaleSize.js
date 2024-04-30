import { Dimensions, PixelRatio } from 'react-native';

// Function to convert pixels to dp
const scaleSize = (size) => {
  const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
  const scale = Math.min(deviceWidth / 375, deviceHeight / 812); // iPhone 11 Pro dimensions as reference
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export default scaleSize;
