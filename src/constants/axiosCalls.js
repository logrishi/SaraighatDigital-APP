import axios from 'axios';
import {base_url} from 'constants/url';

let retry = 3;
// export const source = axios.CancelToken.source();
export const apiCall = async (request, callback) => {
  let config = {
    method: request.method,
    url: `${base_url}/${request.url}`,
    data: request.data,
    // cancelToken: request.cancelToken,
    headers: {Authorization: `Bearer ${request.accessToken}`},
    timeout: 3000,
  };
  // console.log(config);
  try {
    const res = await axios(config);
    callback(res, false);
    // console.log('res axios', res.data);
  } catch (err) {
    if (axios.isCancel(err.message)) {
      // console.log('Request canceled', err.message);
      callback(false, err);
    } else {
      retry--;
      if (retry > 0) {
        apiCall(request, callback);
      }
      callback(false, err);
      // console.log('err axios', err);
      // console.log('err Res', err.response);
      //   console.log('err Res Status', err.response.status);
      //   console.log('err Res data', err.response.data);
    }
  }
};
