import {apiCall} from 'constants/axiosCalls';
import {manageErrors} from 'constants/handleErrors';

export const getFreeProducts = params => {
  // console.log(params.accessToken)
  params.setIsLoading(true);
  apiCall(
    {
      method: 'GET',
      url: `getFreeProducts`,
      data: null,
      accessToken: params.accessToken,
      // cancelToken: params.cancelToken,
      // params: {setIsLoading},
    },
    (res, err) => {
      if (!err) {
        // console.log('res free', res.data);
        params.setFreeProducts(res.data);
        // params.setFilteredProducts(res.data);
        params.setIsLoading(false);
      } else {
        // console.log('err free', err);
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

export const getSubscriptionBooks = params => {
  params.setIsLoading(true);
  apiCall(
    {
      method: 'GET',
      url: `subscriptions`,
      data: null,
      accessToken: params.accessToken,
      // cancelToken: params.cancelToken,
      // params: {setIsLoading},
    },
    (res, err) => {
      if (!err) {
        // console.log('res subs', res.data);
        if (res.data) {
          params.setSubscriptions(res.data[0]);
          params.setExpiresOn(res.data[1]);
        } else {
          params.setSubscriptions([]);
          params.setExpiresOn();
        }
        params.setIsLoading(false);
      } else {
        params.setIsLoading(false);
        // console.log('err subs', err);
        // manageErrors({
        //   err,
        //   navigation: params.navigation,
        //   setStoredUserData: params.setStoredUserData,
        // });
      }
    },
  );
};
