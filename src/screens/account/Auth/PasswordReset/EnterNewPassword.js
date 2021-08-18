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

//usenavigation
import {useNavigation, StackActions} from '@react-navigation/native';

// react-native-elements
import {Input, Button} from 'react-native-elements';

//spinner overlay
import Spinner from 'react-native-loading-spinner-overlay';

//db & forms & validation
import axios from 'axios';
import {Formik} from 'formik';
import * as yup from 'yup';
import {resetPassword} from './passwordReset.actions';
import {scale} from 'react-native-size-matters';
import {showChase} from 'constants/loading';

//yup validation
const validation = yup.object({
  password: yup.string().required('Password is required'),
  confirmPassword: yup
    .string()
    .required()
    .when('password', {
      is: password => (password && password.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref('password')], "Password doesn't match"),
    }),
});

const EnterNewPassword = ({route}) => {
  const email = route.params.email;
  const otp = route.params.otp;

  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // const resetPassword = values => {
  //   setIsLoading(true);
  //   axios
  //     .post(`${base_url}/resetPassword`, {
  //       email: email,
  //       otp: otp,
  //       password: values.password,
  //     })
  //     .then(res => {
  //       if (!res.data.errors) {
  //         setIsLoading(false);
  //         navigation.dispatch(StackActions.popToTop());
  //         navigation.navigate('Login', {
  //           msg: res.data,
  //         });
  //       } else {
  //         setErrors(res.data.errors);
  //         setIsLoading(false);
  //       }
  //     })
  //     .catch(function(error) {
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
            password: '',
            confirmPassword: '',
          }}
          validationSchema={validation}
          onSubmit={values => {
            resetPassword(values, email, otp, {
              setErrors,
              setIsLoading,
              navigation,
              StackActions,
            });
          }}>
          {formikProps => (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.allInputsContainer}>
                <Input
                  label="Enter New Password"
                  placeholder="Enter New Password"
                  onChangeText={formikProps.handleChange('password')}
                  value={formikProps.values.password}
                  onBlur={formikProps.handleBlur('password')}
                  autoFocus
                  secureTextEntry
                  errorStyle={styles.error}
                  errorMessage={
                    formikProps.touched.password && formikProps.errors.password
                  }
                />

                <Input
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  onChangeText={formikProps.handleChange('confirmPassword')}
                  value={formikProps.values.confirmPassword}
                  onBlur={formikProps.handleBlur('confirmPassword')}
                  secureTextEntry
                  errorStyle={styles.error}
                  errorMessage={
                    formikProps.touched.confirmPassword &&
                    formikProps.errors.confirmPassword
                  }
                />
                <View style={styles.errorContainer}>
                  {Object.keys(errors).length > 0 ? (
                    <Text style={styles.error}>{errors}</Text>
                  ) : null}
                </View>
                <Button
                  style={styles.button}
                  title="Reset Password"
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
export default EnterNewPassword;
