import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

//constanst
import {deviceWidth, calcWidth} from 'constants/deviceConfig';

const CustomButtonSquare = props => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => props.onPress()}
      style={{...styles.customButton, ...props.style}}>
      <Text style={{...styles.customButtonText, ...props.style}}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  customButton: {
    alignSelf: 'center',
    width: calcWidth(30),
    // padding: calcWidth(2),
    // borderRadius: deviceWidth / 2,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
  },
  customButtonText: {
    textAlign: 'center',
  },
});

export default CustomButtonSquare;
