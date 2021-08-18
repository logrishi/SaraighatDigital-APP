import React, {useEffect, useState, useContext} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  KeyboardAvoidingView,
  StatusBar,
  ScrollView,
} from 'react-native';

//constants
import {deviceWidth, calcHeight, calcWidth} from 'constants/deviceConfig';
import Colors from 'constants/colors';
import {base_url} from 'constants/url';

// react-native-elements
import {Input, Button} from 'react-native-elements';

//context
import {UserContext} from '/context/UserContext';
// import {CartContext} from 'context/CartContext';

//asyncstorage
import AsyncStorage from '@react-native-async-storage/async-storage';

//usenavigation
import {useNavigation, StackActions} from '@react-navigation/native';
import {useHeaderHeight} from '@react-navigation/stack';

//db & forms & validation
import axios from 'axios';
import {Formik} from 'formik';
import * as yup from 'yup';

//push notification
import PushNotification from 'react-native-push-notification';

//spinner overlay
import Spinner from 'react-native-loading-spinner-overlay';
import {callSignUp} from './auth.actions';
import {successToast} from 'constants/toasts';
import {storeData} from 'constants/asyncStorage';
import {scale} from 'react-native-size-matters';
import {showChase} from 'constants/loading';

const validation = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Name too short - Enter more than 3 letters'),
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(3, 'pasword too short'),
});

const Registration = () => {
  const navigation = useNavigation();
  const {setStoredUserData} = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');
  const headerHeight = useHeaderHeight();

  const [result, setResult] = useState();
  let isMounted;

  useEffect(() => {
    isMounted = true;
    if (result) {
      setStoredUserData(result);
      setErrors({});
      storeData('userDetails', result, err => {
        // console.log(err);
      });
      setIsLoading(false);
      // console.log('isMounted main', isMounted);
      successToast('Welcome..', 0.8, 'top');
      navigation.dispatch(StackActions.popToTop());
      navigation.navigate('Products', {
        screen: 'Books',
      });

      // navigation.navigate('My Library');
    }
  }, [result]);

  useEffect(() => {
    getToken();
    return getToken();
  }, []);

  const getToken = () => {
    PushNotification.configure({
      onRegister: function (token) {
        // console.log('reg hit noti');
        setToken(token.token);
      },
    });
  };

  const submitInput = values => {
    callSignUp(values, {
      setIsLoading,
      setErrors,
      token,
      setStoredUserData,
      setResult,
      navigation,
    });
    // console.log(token);
    // setisLoading(true);
    // axios
    //   .post(`${base_url}/signup`, {
    //     name: values.name,
    //     email: values.email,
    //     password: values.password,
    //     token: token,
    //   })
    //   .then(res => {
    //     if (res.data) {
    //       if (!res.data.errors) {
    //         // console.log('res', res.data);
    //         storeUserDetails(res.data);
    //         setErrors({});
    //         if (cartQty > 0) {
    //           navigation.dispatch(StackActions.popToTop());
    //           navigation.navigate('Cart');
    //         } else {
    //           navigation.dispatch(StackActions.popToTop());
    //           navigation.navigate('Products', {
    //             screen: 'Books',
    //           });
    //         }
    //       } else {
    //         // console.log('res.data.errors', res.data.errors);
    //         setErrors(res.data.errors);
    //         storeUserDetails({});
    //         setisLoading(false);
    //       }
    //     }
    //   })
    //   .catch(function (error) {
    //     // console.log('error', error);
    //     setisLoading(false);
    //   });
  };

  return (
    <View
      style={styles.screen}
      // behavior="position"
      // keyboardVerticalOffset={
      //   headerHeight + StatusBar.currentHeight - calcHeight(29) //4.5
      // }
    >
      {isLoading ? (
        // <Spinner
        //   visible={isLoading}
        //   textContent={'Please wait ...'}
        //   color={Colors.btnGreen}
        //   textStyle={{color: 'black'}}
        // />
        showChase(scale(30))
      ) : (
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
          }}
          validationSchema={validation}
          onSubmit={(values, actions) => {
            // console.log(values);
            submitInput(values);
            // actions.resetForm();
          }}>
          {formikProps => (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ScrollView style={styles.allInputsContainer}>
                <Input
                  label="Enter Name"
                  placeholder="Enter Name"
                  onChangeText={formikProps.handleChange('name')}
                  value={formikProps.values.name}
                  onBlur={formikProps.handleBlur('name')}
                  // autoFocus
                  errorStyle={styles.error}
                  errorMessage={
                    formikProps.touched.name && formikProps.errors.name
                  }
                />

                <View>
                  <Input
                    label="Enter Email"
                    placeholder="Enter email"
                    onChangeText={formikProps.handleChange('email')}
                    value={formikProps.values.email}
                    onBlur={formikProps.handleBlur('email')}
                    errorStyle={styles.error}
                    errorMessage={
                      formikProps.touched.email && formikProps.errors.email
                    }
                  />
                  <View style={styles.errorContainer}>
                    {/* server val error - email exists */}
                    {Object.keys(errors).length > 0 && errors.email ? (
                      <Text style={styles.error}>{errors.email}</Text>
                    ) : null}
                  </View>
                </View>

                <Input
                  label="Enter Password"
                  placeholder="Password"
                  onChangeText={formikProps.handleChange('password')}
                  value={formikProps.values.password}
                  onBlur={formikProps.handleBlur('password')}
                  secureTextEntry={true}
                  onSubmitEditing={formikProps.handleSubmit}
                  errorStyle={styles.error}
                  errorMessage={
                    formikProps.touched.password && formikProps.errors.password
                  }
                />

                <Button
                  style={styles.button}
                  title="Sign Up"
                  onPress={formikProps.handleSubmit}
                />
              </ScrollView>
            </TouchableWithoutFeedback>
          )}
        </Formik>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    flex: 1,
  },
  allInputsContainer: {
    alignSelf: 'center',
    backgroundColor: Colors.inputHolder,
    width: calcWidth(80),
    marginTop: calcHeight(5),
  },

  errorContainer: {
    alignSelf: 'center',
  },
  error: {
    color: 'red',
    alignSelf: 'center',
    fontSize: calcWidth(4),
  },
});
export default Registration;
