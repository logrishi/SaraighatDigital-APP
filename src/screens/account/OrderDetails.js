import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

//constants
import {calcHeight, calcWidth} from 'constants/deviceConfig';
import Colors from 'constants/colors';

const OrderDetails = ({route}) => {
  const orderId = route.params.orderId;
  const products = route.params.products;
  return (
    <View style={styles.screen}>
      <View style={styles.body}>
        <View style={styles.info}>
          <Text style={styles.text}>Book Purchased: </Text>
          {products.map(e => (
            <View key={orderId}>
              <Text>{e.name}</Text>
              <View style={styles.price}>
                <Text style={styles.text}>Price - </Text>
                <Text>₹ {e.price}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    backgroundColor: Colors.inputHolder,
  },
  info: {
    marginHorizontal: calcWidth(2),
    marginVertical: calcHeight(1),
  },
  text: {
    fontFamily: 'sans-serif-medium',
  },
  price: {
    flexDirection: 'row',
  },
});

export default OrderDetails;
