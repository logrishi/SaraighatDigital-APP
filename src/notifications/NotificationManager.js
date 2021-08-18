import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';

import PushNotification from 'react-native-push-notification';

const NotificationManager = () => {
  PushNotification.configure({
    onRegister: function(token) {
      // console.log('TOKEN:', token);
    },

    onNotification: function(notification) {
      // console.log('NOTIFICATION:', notification.foreground);
      // if (notification.foreground == true) {
      //   sendNotification('hey', 'msg');
      // }
    },

    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    popInitialNotification: true,
    requestPermissions: true,
  });
  const sendNotification = (title, message) => {
    console.log('hit');
    PushNotification.localNotification({
      channelId: 'myChannelId',
      title: title,
      message: message,
      // actions: '["Yes", "No"]', // (Android only) See the doc for notification actions to know more
    });
  };
  return (
    <View>
      <Text>notification</Text>
      <Button title="Send" onPress={() => sendNotification('hey', 'msg')} />
    </View>
  );
};

export default NotificationManager;
