import {Dimensions, PixelRatio} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const calcWidth = x => PixelRatio.roundToNearestPixel((deviceWidth * x) / 100);
const calcHeight = x =>
  PixelRatio.roundToNearestPixel((deviceHeight * x) / 100);

export {
  deviceHeight,
  deviceWidth,
  calcHeight,
  calcWidth,
  screenWidth,
  screenHeight,
};
