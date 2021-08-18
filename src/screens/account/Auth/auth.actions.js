import {removeData, storeData} from 'constants/asyncStorage';
import {apiCall} from 'constants/axiosCalls';
import {errorToast, successToast} from 'constants/toasts';

export const callSignUp = async (values, params) => {
  params.setIsLoading(true);
  // console.log(values);
  apiCall(
    {
      method: 'POST',
      url: 'signup',
      data: {
        name: values.name,
        email: values.email,
        password: values.password,
        token: params.token,
      },
    },
    (res, err) => {
      if (!err) {
        if (!res.data.errors) {
          // console.log('res', res.data);
          params.setResult(res.data);
          // params.setStoredUserData(res.data);
          // params.setErrors({});
          // setLoggedIn(true);
          // storeData('userDetails', res.data, err => {
          //   // console.log(err);
          // });
          params.setIsLoading(false);
          // params.navigation.dispatch(StackActions.popToTop());
          // params.navigation.navigate('Products', {
          //   screen: 'Books',
          // });
          // successToast('Welcome..', 0.8, 'top');
        } else {
          params.setErrors(res.data.errors);
          params.setIsLoading(false);
          errorToast('Signup Failed! Pls try again..', 0.8, 'top');
        }
      } else {
        // console.log('err', err);
        params.setIsLoading(false);
        errorToast('Signup Failed! Pls try again..', 0.8, 'top');
      }
    },
  );
};

export const callLogin = async (values, params) => {
  params.setIsLoading(true);
  apiCall(
    {
      method: 'POST',
      url: 'login',
      data: {
        email: values.email,
        password: values.password,
        token: params.token,
      },
      // cancelToken: params.cancelToken,
    },
    (res, err) => {
      if (!err) {
        if (!res.data.errors) {
          // console.log('res login', res.data);
          // console.log('params.isMounted', params.isMounted);
          params.setResult(res.data);
          // successToast('Welcome back!', 0.8, 'top');
          // params.navigation.dispatch(StackActions.popToTop());
          // params.navigation.navigate('Products', {
          //   screen: 'Books',
          // });
          // setLoggedIn(true);
          // if (params.isMounted) {
          // storeData('userDetails', res.data, (err) => {
          //   // console.log(err);
          // });
          // params.setStoredUserData(res.data);
          params.setIsLoading(false);
          // console.log('params.isMounted2', params.isMounted);

          // if (params.cartQty > 0) {
          //   params.navigation.navigate('Cart');
          // } else {
          //   params.navigation.navigate('Home');
          // }
          // }
        } else {
          params.setErrors(res.data.errors);
          params.setIsLoading(false);
          errorToast('Login Failed! Pls try again..', 0.8, 'top');
        }
      } else {
        // console.log('err login', err);
        params.setIsLoading(false);
        errorToast('Login Failed! Pls try again..', 0.8, 'top');
      }
    },
  );
};

export const callSignOut = (token, params) => {
  params.setIsLoading(true);
  apiCall(
    {
      method: 'POST',
      url: 'logout',
      data: token,
      accessToken: params.accessToken,
    },
    (res, err) => {
      if (!err) {
        // console.log('res Logout', res.data);
        // console.log('token', token);
        removeData('userDetails', () => {
          params.setStoredUserData();
        });
        storeData('userDetails', {}, err => {
          // console.log(err);
        });
        params.setModalVisible(false);
        params.setIsLoading(false);
        params.navigation.navigate('Products', {
          screen: 'Books',
        });
        successToast('Logged out', 0.8, 'top');
      } else {
        // console.log('err Logout', err);
        params.setIsLoading(false);
        params.setModalVisible(false);
      }
    },
  );
};
