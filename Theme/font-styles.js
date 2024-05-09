import {Dimensions} from 'react-native';

var width = Dimensions.get('window').width;

export const FontStyles = {
  // headerFontFamily: 'Roboto-Bold',
  // titleFontFamily: 'Roboto-Medium',
  // sub_titleFontFamily: 'Roboto-Thin',
  // textFontFamily: 'Roboto',
  headerFontFamily: 'HelveticaNeue-Bold',
  titleFontFamily: 'HelveticaNeue-Medium',
  sub_titleFontFamily: 'HelveticaNeue-Thin',
  textFontFamily: 'HelveticaNeue',

  helveticaRegular: 'HelveticaNeue',
  helveticaBold: 'HelveticaNeue-Bold',
  helveticaMedium: 'HelveticaNeue-Medium',

  headerFontSize: width / 19, //approx 20,
  titleFontSize: width / 22, //approx 18,
  textFontSize: width / 24, // approx 16,
  smallTextSize: width / 28, // approx 14
  miniTextSize: width / 30,
  smallTextSize26: width / 26, // approx 14

  MediumIconFont: width / 15, // approx 26
  LargeIconFont: width / 12, // approx 33
  extraLargeIconFont: width / 11, //approx 36

  // approx width / 15, 26
};

export const fontFamily = {
  headerFontFamily: 'Roboto-Bold',
  titleFontFamily: 'Roboto-Medium',
  sub_titleFontFamily: 'Roboto-Thin',
  textFontFamily: 'Roboto',
  // headerFontFamily: 'HelveticaNeue-Bold',
  // titleFontFamily: 'HelveticaNeue-Medium',
  // sub_titleFontFamily: 'HelveticaNeue-Thin',
  // textFontFamily: 'HelveticaNeue',

  helveticaRegular: 'HelveticaNeue',
  helveticaBold: 'HelveticaNeue-Bold',
  helveticaMedium: 'HelveticaNeue-Medium',
};

export const fontSize = {
  largeFontSize: 24,
  headerFontSize: 18,
  titleFontSize: 16,
  sub_titleFontSize: 14,
  textFontSize: 12,
  smallTextFontSize: 10,
  screenTitleFontSize:18
};

export const tabFontSize = {
  headerFontSize: 36,
  titleFontSize: 32,
  sub_titleFontSize: 28,
  textFontSize: 24,
};

export default FontStyles;
