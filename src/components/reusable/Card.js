import React from 'react';
import {View, StyleSheet} from 'react-native';

//constants
import {deviceWidth} from 'constants/deviceConfig';

const Card = props => {
  return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: 'white',
    elevation: 8,
    borderRadius: deviceWidth / 40,
  },
});

export default Card;
