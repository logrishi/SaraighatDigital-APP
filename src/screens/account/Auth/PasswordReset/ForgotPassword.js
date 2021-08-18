import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

//constants
import {deviceWidth, calcHeight, calcWidth} from 'constants/deviceConfig';
import Colors from 'constants/colors';
import {base_url} from 'constants/url';

//asyncstorage
import AsyncStorage from '@react-native-async-storage/async-storage';

//usenavigation
import {useNavigation} from '@react-navigation/native';

// react-native-elements
import {Input, Button} from 'react-native-elements';

//spinner overlay
import Spinner from 'react-native-loading-spinner-overlay';

//db & forms & validation
import axios from 'axios';
import {Formik} from 'formik';
import * as yup from 'yup';
import {requestOTP} from './passwordReset.actions';
import {scale} from 'react-native-size-matters';
import {showChase} from 'constants/loading';

//yup validation
const validation = yup.object({
  email: yup.string().email().required('Email is required'),
});

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // const requestOTP = values => {
  //   setIsLoading(true);
  //   axios
  //     .post(`${base_url}/sendOTP`, {
  //       email: values.email,
  //     })
  //     .then(res => {
  //       if (!res.data.errors) {
  //         // console.log('res.data', res.data);
  //         setIsLoading(false);
  //         navigation.navigate('Enter Otp', {
  //           email: values.email,
  //         });
  //       } else {
  //         // console.log('dataErr', res.data.errors);
  //         setErrors(res.data.errors);
  //         setIsLoading(false);
  //       }
  //     })
  //     .catch(function (error) {
  //       // console.log('error', error);
  //       setErrors(error);
  //       setIsLoading(false);
  //     });
  // };

  return (
    <View style={styles.screen}>
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
            email: '',
          }}
          validationSchema={validation}
          onSubmit={values => {
            requestOTP(values, {setIsLoading, setErrors, navigation});
          }}>
          {formikProps => (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.allInputsContainer}>
                <View>
                  <Input
                    label="Enter Email To reset password"
                    placeholder="Enter email"
                    onChangeText={formikProps.handleChange('email')}
                    value={formikProps.values.email}
                    onBlur={formikProps.handleBlur('email')}
                    autoFocus
                    errorStyle={styles.error}
                    errorMessage={
                      formikProps.touched.email && formikProps.errors.email
                    }
                  />
                  <View style={styles.errorContainer}>
                    {Object.keys(errors).length > 0 ? (
                      <Text style={styles.error}>{errors}</Text>
                    ) : null}
                  </View>
                </View>

                <Button
                  style={styles.button}
                  title="Get OTP"
                  onPress={formikProps.handleSubmit}
                />
              </View>
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
    color: Colors.primary,
  },
});
export default ForgotPassword;
