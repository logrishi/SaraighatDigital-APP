import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

//constants
import Colors from 'constants/colors';
import {calcWidth} from 'constants/deviceConfig';

//fonts
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

//animation
// import * as Animatable from 'react-native-animatable';

const Counter = props => {
  return (
    <View style={{...styles.counter, ...props.style}}>
      <TouchableOpacity onPress={props.decrement}>
        <FontAwesome5
          name="minus-circle"
          color={Colors.primary}
          size={calcWidth(5)}
          style={styles.iconLeft}
        />
      </TouchableOpacity>

      {/* <Animatable.Text
        animation="zoomInUp"
        style={{...styles.count, ...props.style}}>
        {props.count}
      </Animatable.Text> */}
      <Text style={{...styles.count, ...props.style}}>{props.count}</Text>

      <TouchableOpacity onPress={props.increment}>
        <FontAwesome5
          name="plus-circle"
          color={Colors.accent}
          size={calcWidth(5)}
          style={styles.iconRight}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  count: {
    fontSize: calcWidth(5),
  },
  iconLeft: {
    paddingRight: calcWidth(5),
  },
  iconRight: {
    paddingLeft: calcWidth(5),
  },
});

export default Counter;
