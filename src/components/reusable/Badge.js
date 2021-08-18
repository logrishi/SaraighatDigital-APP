import React, {useContext} from 'react';
import {Text, View, StyleSheet} from 'react-native';

//constants
import Colors from 'constants/colors';

//context
// import {CartContext} from 'context/CartContext';

const Badge = props => {
  // const {cartQty} = useContext(CartContext);

  return (
    <View style={{...styles.badgeView, ...props.style}}>
      {/* <Text style={styles.badgeText}>{cartQty}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  badgeView: {
    backgroundColor: Colors.red,
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    justifyContent: 'center',
  },
  badgeText: {
    color: Colors.whiteColor,
    alignSelf: 'center',
  },
});

export default Badge;
