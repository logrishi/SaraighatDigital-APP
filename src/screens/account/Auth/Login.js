import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';

//constants
import {calcHeight, calcWidth} from 'constants/deviceConfig';
import Colors from 'constants/colors';
import {base_url} from 'constants/url';

//context
import {UserContext} from '/context/UserContext';
// import {CartContext} from 'context/CartContext';

//asyncstorage
import AsyncStorage from '@react-native-async-storage/async-storage';

//usenavigation
import {useNavigation, StackActions} from '@react-navigation/native';
import {useHeaderHeight} from '@react-navigation/stack';

// react-native-elements
import {Input, Button} from 'react-native-elements';

//db & forms & validation
import axios from 'axios';
import {Formik} from 'formik';
import * as yup from 'yup';

//push notification
import PushNotification from 'react-native-push-notification';

//spinner overlay
import Spinner from 'react-native-loading-spinner-overlay';
import {callLogin} from './auth.actions';
import {storeData} from 'constants/asyncStorage';
import {successToast} from 'constants/toasts';
import {scale} from 'react-native-size-matters';
import {showChase} from 'constants/loading';

//yup validation
const validation = yup.object({
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Login = ({route}) => {
  let msg = null;
  if (route.params) {
    msg = route.params.msg;
  }

  // const [loginData, setLoginData] = useState({});
  const {setStoredUserData} = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState('');
  const [result, setResult] = useState();
  let isMounted;

  useEffect(() => {
    isMounted = true;
    if (result) {
      setStoredUserData(result);
      storeData('userDetails', result, err => {
        // console.log(err);
      });
      setIsLoading(false);
      // console.log('isMounted main', isMounted);
      successToast('Welcome back!', 0.8, 'top');

      navigation.dispatch(StackActions.popToTop());
      navigation.navigate('Products', {
        screen: 'Books',
      });
      // navigation.navigate('My Library');
    }
  }, [result]);

  useEffect(() => {
    getToken();
  }, []);

  const getToken = () => {
    PushNotification.configure({
      onRegister: function (token) {
        setToken(token.token);
      },
    });
  };

  const userLogin = values => {
    callLogin(values, {
      setIsLoading,
      token,
      setStoredUserData,
      navigation,
      isMounted,
      setResult,
    });
    // setIsLoading(true);
    // axios
    //   .post(`${base_url}/login`, {
    //     email: values.email,
    //     password: values.password,
    //     token: token,
    //   })
    //   .then(res => {
    //     if (!res.data.errors) {
    //       storeLoginDetails(res.data);
    //       // setLoginData(res.data);
    //       setErrors({});
    //       if (cartQty > 0) {
    //         navigation.dispatch(StackActions.popToTop());
    //         navigation.navigate('Cart');
    //       } else {
    //         navigation.dispatch(StackActions.popToTop());
    //         navigation.navigate('Products', {
    //           screen: 'Books',
    //         });
    //       }
    //       setIsLoading(false);
    //     } else {
    //       setErrors(res.data.errors);
    //       storeLoginDetails({});
    //       // setLoginData({});
    //       // console.log(res.data.errors);
    //       setIsLoading(false);
    //     }
    //   })
    //   .catch(function (error) {
    //     // console.log(error);
    //     setIsLoading(false);
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
        //   textStyle={{color: 'black'}}
        //   color={Colors.btnGreen}
        // />
        showChase(scale(30))
      ) : (
        <View>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={validation}
            onSubmit={values => {
              userLogin(values);
            }}>
            {formikProps => (
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView style={styles.allInputsContainer}>
                  {msg ? (
                    <View style={styles.resetView}>
                      <Text style={styles.resetText}>{msg}</Text>
                    </View>
                  ) : null}
                  <View>
                    <Input
                      // inputStyle={styles.text}
                      // labelStyle={styles.text}
                      label="Enter Email"
                      placeholder="Enter email"
                      onChangeText={formikProps.handleChange('email')}
                      value={formikProps.values.email}
                      onBlur={formikProps.handleBlur('email')}
                      // autoFocus
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

                  <View>
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
                        formikProps.touched.password &&
                        formikProps.errors.password
                      }
                    />
                    <View style={styles.errorContainer}>
                      {/* server val error - email exists */}
                      {Object.keys(errors).length > 0 && errors.password ? (
                        <View>
                          <Text style={styles.error}>{errors.password}</Text>
                        </View>
                      ) : null}
                    </View>
                  </View>

                  <Button
                    style={styles.button}
                    title="Login"
                    onPress={formikProps.handleSubmit}
                  />
                </ScrollView>
              </TouchableWithoutFeedback>
            )}
          </Formik>
          <View style={styles.forgot}>
            {msg ? null : (
              <Button
                title="Forgot Password ?"
                type="clear"
                onPress={() => navigation.navigate('Forgot Password')}
              />
            )}
          </View>
        </View>
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
    color: Colors.primary,
    alignSelf: 'center',
    fontSize: calcWidth(4),
  },
  forgot: {
    alignSelf: 'center',
    // marginTop: calcHeight(1),
  },
  text: {
    // fontSize: calcWidth(5),
  },
  resetView: {
    alignItems: 'center',
  },
  resetText: {
    color: 'green',
  },
});
export default Login;
