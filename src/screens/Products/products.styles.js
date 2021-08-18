import Colors from 'constants/colors';
import {StyleSheet} from 'react-native';
import {deviceWidth, calcHeight, calcWidth} from 'constants/deviceConfig';
import {scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    alignItems: 'center',
    width: calcWidth(46),
    marginHorizontal: calcWidth(2),
    marginVertical: calcHeight(2),
  },
  cardHeadingContainer: {
    flexDirection: 'row',
    width: '70%',
    // height: calcHeight(10),
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: calcHeight(2),
  },
  cardTitle: {
    // height: '90%',
    alignSelf: 'center',
    fontFamily: 'sans-serif-medium',
    // fontSize: deviceWidth > 500 ? calcWidth(3.5) : calcWidth(4.5),
    fontSize: scale(12),
  },
  line: {
    // borderBottomColor: '#447604',
    borderBottomColor: Colors.btnGreen,
    borderBottomWidth: calcWidth(1),
    borderRadius: deviceWidth / 2,
    width: '90%',
    overlayColor: 'hidden',
    paddingBottom: calcHeight(1),
  },
  cardImageContainer: {
    width: calcHeight(20),
    height: calcHeight(20),
    borderRadius: calcHeight(20) / 2,
    marginVertical: calcHeight(2),
    overflow: 'hidden',
    // resizeMode: 'cover',
    // borderWidth: 1,
    // borderColor: Colors.accent,
    // backgroundColor: 'red',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  cardDetailsContainer: {
    width: '90%',
    marginBottom: calcHeight(2),
  },
  cardDetails: {
    // fontSize: deviceWidth > 500 ? calcWidth(3) : calcWidth(4),
    fontSize: scale(10),
    fontFamily: 'serif',
    // height: calcHeight(6),
  },
  btnContainer: {
    width: '90%',
    height: calcHeight(11),
    alignContent: 'center',
    alignSelf: 'center',
  },
  NA: {
    textAlign: 'center',
    fontFamily: 'sans-serif-medium',
    color: Colors.primary,
    fontSize: calcWidth(4),
  },
  noProducts: {
    textAlign: 'center',
    fontFamily: 'sans-serif-medium',
    color: Colors.primary,
    fontSize: calcWidth(4),
  },
});

export default styles;
