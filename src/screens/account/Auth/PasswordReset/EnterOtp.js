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
import {submitOtp} from './passwordReset.actions';
import {scale} from 'react-native-size-matters';
import {showChase} from 'constants/loading';

//yup validation
const validation = yup.object({
  otp: yup.number().required('OTP is required'),
});

const EnterOtp = ({route}) => {
  const email = route.params.email;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // const submitOtp = values => {
  //   setIsLoading(true);
  //   axios
  //     .post(`${base_url}/verifyOtp`, {
  //       email: email,
  //       otp: values.otp,
  //     })
  //     .then(res => {
  //       if (!res.data.errors) {
  //         setIsLoading(false);
  //         navigation.navigate('Enter New Password', {
  //           email: email,
  //           otp: values.otp,
  //         });
  //       } else {
  //         setErrors(res.data.errors);
  //         setIsLoading(false);
  //       }
  //     })
  //     .catch(function (error) {
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
            otp: '',
          }}
          validationSchema={validation}
          onSubmit={values => {
            submitOtp(values, email, {setErrors, setIsLoading, navigation});
          }}>
          {formikProps => (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.allInputsContainer}>
                <View>
                  <Input
                    label="Enter OTP"
                    placeholder="Enter OTP received in email"
                    onChangeText={formikProps.handleChange('otp')}
                    value={formikProps.values.otp}
                    onBlur={formikProps.handleBlur('otp')}
                    autoFocus
                    errorStyle={styles.error}
                    errorMessage={
                      formikProps.touched.otp && formikProps.errors.otp
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
                  title="Submit"
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
export default EnterOtp;
