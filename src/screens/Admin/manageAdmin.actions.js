import {apiCall} from 'constants/axiosCalls';
import {errorToast, successToast} from 'constants/toasts';

export const getAllProducts = params => {
  params.setIsLoading(true);
  apiCall(
    {
      method: 'GET',
      // url: params.nextPageUrl ? `${params.nextPageUrl}` : `products`,
      url: 'getAllProducts',
      data: null,
      accessToken: params.accessToken,
    },
    (res, err) => {
      if (!err) {
        // console.log('res', res.data);
        if (res.data !== 'Forbidden') {
          params.setAllProducts(res.data);
        }
        params.setIsLoading(false);
      } else {
        // console.log('err', err);
        params.setIsLoading(false);
      }
    },
  );
};

export const updateProducts = (formData, params) => {
  params.setIsLoading(true);
  apiCall(
    {
      method: 'POST',
      url: 'updateProducts',
      data: formData,
      accessToken: params.accessToken,
    },
    (res, err) => {
      if (!err) {
        // console.log('res', res.data);

        params.setIsLoading(false);
        params.setImagePath('');
        params.setDocPath('');
        params.navigation.goBack();
        params.callback();
        successToast('Update Successful', 0.8, 'top');
      } else {
        // console.log('err', err);
        params.setIsLoading(false);
        errorToast('Error! Please try again!', 0.8, 'top');
      }
    },
  );
};
