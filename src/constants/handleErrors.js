import {Text, TouchableOpacity} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {StackActions} from '@react-navigation/native';
import {calcWidth} from 'constants/deviceConfig';
import {errorToast} from 'constants/toasts';
import styles from './loadingStyles';
import {removeData, storeData} from './asyncStorage';

////*** above reqd. for show reload func only  ****/

const getConfig = storedUserData => {
  if (storedUserData != undefined) {
    let config = {};
    if ('auth' in storedUserData && 'access_token' in storedUserData.auth) {
      let accessToken = storedUserData.auth.access_token;
      config = {
        headers: {Authorization: `Bearer ${accessToken}`},
      };
      return config;
    }
  }
};

const isLoggedIn = storedUserData => {
  // console.log('isLoggedIn');
  if (storedUserData != undefined) {
    // console.log('isLoggedIn if');
    if ('auth' in storedUserData && 'access_token' in storedUserData.auth) {
      let accessToken = storedUserData.auth.access_token;
      return accessToken;
    }
  }
};

const isAdmin = storedUserData => {
  if (storedUserData != undefined) {
    if ('user' in storedUserData) {
      let isAdmin = storedUserData.user.is_admin;
      return isAdmin;
    }
  }
};

const showLogin = navigation => {
  removeData('userDetails', () => {
    params.setStoredUserData();
  });
  storeData('userDetails', {}, err => {
    // console.log(err);
  });
  navigation.dispatch(StackActions.popToTop());
  navigation.navigate('Account');

  // let index = navigation.dangerouslyGetState().index;

  // errorToast('Something went wrong!! Login to continue..', 1);
  // setLogOutData({});
  // if (index) {
  //   navigation.dispatch(StackActions.popToTop());
  //   navigation.navigate('Account');
  // } else {
  //   navigation.navigate('Account');
  // }
};

const manageErrors = params => {
  const tokenError = null;
  const validationErrors = null;
  // 'response' in e && typeof 'response' in e !== undefined;
  // console.log(params);
  // if ('response' in e) {
  //   if ('data' in e.response && typeof 'data' in e.response === 'object') {
  //     if ('tokenError' in e.response.data) {
  //       tokenError = true;
  //     }
  //     if ('error' in e.response.data) {
  //       validationErrors = true;
  //     }
  //   }
  //   if (e.response.status == '401') {
  //     console.log('yes 401');
  //     showLogin(navigation);
  //   }
  // }

  // // let customMsg = 'Something went wrong!! Please try again';

  // // msg ? (customMsg = msg) : customMsg;

  // if (tokenError) {
  //   showLogin(navigation);
  // } else if (validationErrors) {
  //   return validationErrors;
  // } else {
  //   // errorToast(customMsg, 1);
  // }
};

const showReload = callMethod => {
  return (
    <TouchableOpacity style={styles.loading} onPress={callMethod}>
      <MaterialCommunityIcons name="reload" color="red" size={calcWidth(10)} />
      <Text>Tap to retry</Text>
    </TouchableOpacity>
  );
};

export {isLoggedIn, isAdmin, getConfig, showLogin, manageErrors, showReload};
