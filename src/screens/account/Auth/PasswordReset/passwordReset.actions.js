import {apiCall} from 'constants/axiosCalls';
import {manageErrors} from 'constants/handleErrors';

export const resetPassword = (values, email, otp, params) => {
  params.setIsLoading(true);
  apiCall(
    {
      method: 'POST',
      url: `resetPassword`,
      data: {
        email: email,
        otp: otp,
        password: values.password,
      },
      // accessToken: params.accessToken,
      // cancelToken: params.cancelToken,
      // params: {setIsLoading},
    },
    (res, err) => {
      if (!err) {
        if (!res.data.errors) {
          // console.log(res.data);
          params.navigation.dispatch(params.StackActions.popToTop());
          params.navigation.navigate('Login', {
            msg: res.data,
          });
          params.setIsLoading(false);
        } else {
          params.setErrors(res.data.errors);
          params.setIsLoading(false);
        }
      } else {
        // console.log(err);
        params.setIsLoading(false);
        params.setErrors(err);
        // manageErrors({
        //   err,
        //   navigation: params.navigation,
        //   setStoredUserData: params.setStoredUserData,
        // });
      }
    },
  );
};

export const submitOtp = (values, email, params) => {
  params.setIsLoading(true);
  apiCall(
    {
      method: 'POST',
      url: `verifyOtp`,
      data: {
        email: email,
        otp: values.otp,
      },
      // accessToken: params.accessToken,
      // cancelToken: params.cancelToken,
      // params: {setIsLoading},
    },
    (res, err) => {
      if (!err) {
        if (!res.data.errors) {
          // console.log(res.data);
          params.setIsLoading(false);
          params.navigation.navigate('Enter New Password', {
            email: email,
            otp: values.otp,
          });
        } else {
          params.setErrors(res.data.errors);
          params.setIsLoading(false);
        }
      } else {
        // console.log(err);
        params.setErrors(err);
        params.setIsLoading(false);
        // manageErrors({
        //   err,
        //   navigation: params.navigation,
        //   setStoredUserData: params.setStoredUserData,
        // });
      }
    },
  );
};

export const requestOTP = (values, params) => {
  params.setIsLoading(true);
  apiCall(
    {
      method: 'POST',
      url: `sendOTP`,
      data: {
        email: values.email,
      },
      // accessToken: params.accessToken,
      // cancelToken: params.cancelToken,
      // params: {setIsLoading},
    },
    (res, err) => {
      if (!err) {
        if (!res.data.errors) {
          // console.log(res.data);
          params.setIsLoading(false);
          params.navigation.navigate('Enter Otp', {
            email: values.email,
          });
        } else {
          // console.log(err);
          params.setErrors(res.data.errors);
          params.setIsLoading(false);
        }
      } else {
        // console.log(err);
        params.setErrors(err);
        params.setIsLoading(false);
      }
    },
  );
};
