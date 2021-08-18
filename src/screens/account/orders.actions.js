import {apiCall} from 'constants/axiosCalls';
import {manageErrors} from 'constants/handleErrors';

export const getOrders = params => {
  params.setIsLoading(true);
  // console.log(params.accessToken);
  apiCall(
    {
      method: 'GET',
      url: `orders`,
      // url: `subscriptions`,
      data: null,
      accessToken: params.accessToken,
      // cancelToken: params.cancelToken,
      // params: {setIsLoading},
    },
    (res, err) => {
      if (!err) {
        // console.log('ORDERS', res.data);
        // params.organiseData(res.data);
        params.setOrders(res.data);
        params.setIsLoading(false);
      } else {
        // console.log(err);
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

export const handleData = (data, params) => {
  let orderArr = [];
  let count = 1;
  data.map(item => {
    item.order_items.map(orderItem => {
      let exists = orderArr.find(e => e.orderId == item.id);
      if (!exists) {
        orderArr.push({
          orderId: item.id,
          totalPrice: item.total_price,
          orderDate: item.created_at,
          receipt: item.receipt,
          products: [
            {
              name: orderItem.product_name,
              price: orderItem.price,
              count: 1,
            },
          ],
        });
      } else {
        var currIndex = orderArr.indexOf(exists);
        count++;
        orderArr[currIndex].products.push({
          name: orderItem.product_name,
          price: orderItem.price,
          count: count,
        });
      }
    });
  });
  params.setOrders(orderArr);
};
