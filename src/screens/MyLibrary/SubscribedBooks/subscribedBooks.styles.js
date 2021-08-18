import Colors from 'constants/colors';
import {StyleSheet} from 'react-native';
import {deviceWidth, calcHeight, calcWidth} from 'constants/deviceConfig';
import {scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  heading: {
    backgroundColor: Colors.inputHolder,
    height: calcHeight(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'sans-serif-medium',
    fontSize: calcWidth(4),
  },
  card: {
    alignItems: 'center',
    width: calcWidth(46),
    height: calcWidth(25),
    marginHorizontal: calcWidth(2),
    marginVertical: calcHeight(2),
    flexDirection: 'row',
  },
  cardImageContainer: {
    width: calcWidth(20),
    // height: calcHeight(5).
    resizeMode: 'contain',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  btnContainer: {
    flexDirection: 'row',
    height: calcHeight(8),
  },
  customButton: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: calcWidth(22),
    padding: calcWidth(2),
    borderRadius: deviceWidth / 2,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    flexDirection: 'row',
    backgroundColor: Colors.richDarkCyan,
    height: calcHeight(5),
    marginHorizontal: calcWidth(2),
  },
  customButtonText: {
    textAlign: 'center',
    color: 'white',
    paddingRight: calcWidth(2),
    fontFamily: 'sans-serif-medium',
    fontSize: calcWidth(4),
  },
  btnIcon: {
    // paddingRight: calcWidth(1),
  },
});
export default styles;
