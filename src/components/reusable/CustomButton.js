import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';

//constanst
import {deviceHeight, deviceWidth, calcWidth} from 'constants/deviceConfig';

const CustomButton = props => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
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
    padding: deviceHeight > 600 ? calcWidth(2) : calcWidth(1),
    borderRadius: deviceWidth / 2,
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

export default CustomButton;
