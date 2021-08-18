import Colors from 'constants/colors';
import {StyleSheet} from 'react-native';
import {deviceWidth, calcHeight, calcWidth} from 'constants/deviceConfig';
import {scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  pdf: {
    flex: 1,
  },
  heading: {
    backgroundColor: Colors.divider,
    height: calcHeight(4),
    width: calcWidth(15),
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageNum: {
    fontFamily: 'sans-serif-medium',
    fontSize: calcWidth(4),
  },
});
export default styles;
