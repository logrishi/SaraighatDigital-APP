import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

//constants
import {deviceWidth, calcHeight, calcWidth} from 'constants/deviceConfig';
import Colors from 'constants/colors';
import {base_url} from 'constants/url';

//razorpay
import RazorpayCheckout from 'react-native-razorpay';

//push notification
import PushNotification from 'react-native-push-notification';
import axios from 'axios';
import {errorToast, infoToast, successToast, warnToast} from 'constants/toasts';

const Subscriptions = ({storedUserData, navigation, setIsLoading}) => {
  //   const [isLoading, setIsLoading] = useState(false);

  const [saved, setSaved] = useState(false);

  const totalPrice = 100;
  const successMsg = 'Your transaction was successful!!';
  const errorMsg = `Transaction Failed! If payment deducted please contact support from 'Account Screen'`;

  let accessToken;
  let config;
  if (storedUserData) {
    if (Object.keys(storedUserData).length) {
      accessToken = storedUserData.auth.access_token;
      config = {
        headers: {Authorization: `Bearer ${accessToken}`},
      };
    }
  }

  // send notif if app on foreground
  useEffect(() => {
    const e = PushNotification.configure({
      onNotification: function (notification) {
        // console.log('NOTIFICATION:', notification.foreground);

        if (notification.foreground == true) {
          sendNotification('New Order', 'New Order Placed');
        }
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
    return () => e;
  }, [saved]);

  // send notif if app on foreground
  const sendNotification = (title, message) => {
    PushNotification.localNotification({
      channelId: 'myChannelId',
      title: title,
      message: message,
    });
  };

  //send notification
  const fcm = () => {
    setSaved(true);
    axios
      .post(
        `${base_url}/fcm`,
        {
          title: 'New Order',
          message: 'New Order Placed',
          notification_ids: storedUserData.deviceToken,
        },
        config,
      )
      .then(res => {
        // console.log(res);
      })
      .catch(function (error) {
        // console.log(error);
      });
  };

  // uses orders API in laravel
  const createOrder = () => {
    let subscriptions;
    if (!accessToken) {
      warnToast('Login to continue', 0.8, 'top');
    } else {
      setIsLoading(true);
      //check if already subscribed
      axios
        .get(`${base_url}/subscriptions`, config)
        .then(res => {
          // console.log('ggggggg', res.data[0]);
          if (res.data[0] !== undefined) {
            setIsLoading(false);
            infoToast('You have already subscribed', 0.8, 'top');
          } else {
            axios
              .post(
                `${base_url}/createOrder`,
                {
                  amount: totalPrice,
                  userId: storedUserData.user.id, // for creating manual recpt in laravel (not related to rzPay)
                },
                config,
              )
              .then(res => {
                if (res.data) {
                  // console.log('createOrder S', res.data);
                  razorPay(
                    res.data.rzPayOrderId,
                    res.data.receipt,
                    res.data.api_key,
                  );
                }
              })
              .catch(function (error) {
                // console.log('createOrder F', error);
                setIsLoading(false);
                errorToast(errorMsg, 0.8, 'top');
              });
          }
        })
        .catch(error => {
          // console.log(error);
          setIsLoading(false);
          errorToast(errorMsg, 0.8, 'top');
        });
    }
  };

  // payment popup
  const razorPay = (rzPayOrderId, receipt, apiKey) => {
    setIsLoading(false);
    var options = {
      key: apiKey,
      name: 'Saraighat Digital',
      order_id: rzPayOrderId,
      prefill: {
        email: storedUserData.user.email,
        name: storedUserData.user.name,
      },
      theme: {color: '#52AD9C'},
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // console.log(`SuccessChkOut: ${data.razorpay_payment_id}`);
        storePayment(
          rzPayOrderId,
          receipt,
          data.razorpay_payment_id,
          data.razorpay_signature,
        );
      })
      .catch(error => {
        errorToast(errorMsg, 0.8, 'top');
        navigation.navigate('Products', {
          screen: 'Books',
        });
      });
  };

  // save to payments table in db
  const storePayment = (
    rzPayOrderId,
    receipt,
    rzPayPaymentId,
    razorpay_signature,
  ) => {
    setIsLoading(true);
    axios
      .post(
        `${base_url}/payments`,
        {
          razorpay_order_id: rzPayOrderId,
          razorpay_payment_id: rzPayPaymentId,
        },
        config,
      )
      .then(res => {
        // console.log('imp', res.data);
        storeSubscription(
          res.data,
          receipt,
          rzPayOrderId,
          razorpay_signature,
          rzPayPaymentId,
        );
      })
      .catch(function (error) {
        // console.log('storePayment F', error);
        setIsLoading(false);
        errorToast(errorMsg, 0.8, 'top');
        navigation.navigate('Products', {
          screen: 'Books',
        });
      });
  };

  // save order to db
  const storeSubscription = (
    paymentId,
    receipt,
    rzPayOrderId,
    razorpay_signature,
    rzPayPaymentId,
  ) => {
    const userId = storedUserData.user.id;

    axios
      .post(
        `${base_url}/subscriptions`,
        {
          userId: userId,
          price: totalPrice,
          paymentId: paymentId,
          receipt: receipt,
          rzPayOrderId: rzPayOrderId,
          razorpay_signature: razorpay_signature,
          rzPayPaymentId: rzPayPaymentId,
        },
        config,
      )
      .then(res => {
        if (res.data) {
          // console.log(res.data);
          // sendNotification('New Order', 'totalPrice');
          fcm();
          setIsLoading(false);
          navigation.navigate('My Library');
          successToast(successMsg, 0.8, 'top');
        }
      })
      .catch(function (error) {
        // console.log('storeOrder F', error);
        // console.log('storeOrder F', error.response);
        // console.log('storeOrder F', error);
        setIsLoading(false);
        errorToast(errorMsg, 0.8, 'top');
        navigation.navigate('Products', {
          screen: 'Books',
        });
      });
  };

  return (
    <View style={styles.subscribeView}>
      <Text style={styles.subscribeText}>
        Subscribe all books for 1 year @ ₹100
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => createOrder()}>
        <Text style={styles.textStyle}>Subscribe Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Subscriptions;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.btnGreen,
    alignSelf: 'center',
    justifyContent: 'center',
    width: calcWidth(30),
    borderRadius: deviceWidth / 20,
    padding: calcWidth(2),
    elevation: 2,
    height: calcHeight(5),
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: calcWidth(3),
    fontWeight: 'bold',
  },
  subscribeView: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: calcWidth(2),
    flexDirection: 'row',
    marginTop: calcHeight(2),
  },
  subscribeText: {
    color: Colors.btnGreen,
    fontSize: calcWidth(3),
    fontWeight: 'bold',
  },
  errorView: {
    alignItems: 'center',
  },
  errorText: {
    color: Colors.primary,
    fontSize: calcWidth(3.5),
    textAlign: 'center',
  },
});
