import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

//constants
import {calcHeight, calcWidth} from 'constants/deviceConfig';
import Colors from 'constants/colors';

const ManageOrderDetails = ({route}) => {
  const orderDate = route.params.orderDate;
  const razorpayOrderId = route.params.rrazorpayOrderId;
  const razorpayPaymentId = route.params.razorpayPaymentId;
  const receipt = route.params.receipt;
  const customer = route.params.customer;

  return (
    <View style={styles.screen}>
      <View style={styles.body}>
        <View style={styles.info}>
          <Text style={styles.text}>Customer: </Text>
          <Text>{customer}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.text}>Order Date: </Text>
          <Text>{orderDate}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.text}>Razorpay OrderId: </Text>
          <Text>{razorpayOrderId}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.text}>Razorpay PaymentId: </Text>
          <Text>{razorpayPaymentId}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.text}>Receipt: </Text>
          <Text>{receipt}</Text>
        </View>
        <View />
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
});

export default ManageOrderDetails;
