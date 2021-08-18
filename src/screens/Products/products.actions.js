import {apiCall} from 'constants/axiosCalls';

export const getProducts = (params, callback) => {
  if (params.setIsLoading) {
    params.setIsLoading(true);
  }
  if (params.setIsLoadingMore) {
    params.setIsLoadingMore(true);
  }
  apiCall(
    {
      method: 'GET',
      // url: params.nextPageUrl ? `${params.nextPageUrl}` : `products`,
      url: params.nextPage ? `products?page=${params.nextPage}` : `products`,
      data: null,
      // cancelToken: params.cancelToken,
      // params: {setIsLoading},
    },
    (res, err) => {
      if (!err) {
        // console.log('res', res.data);
        if (params.setIsLoading) {
          params.setIsLoading(false);
        }
        if (params.setIsLoadingMore) {
          params.setIsLoadingMore(false);
        }
        params.setCurrentPage(res.data.current_page);
        params.setTotalPages(res.data.total);
        callback(res.data.data);
      } else {
        // console.log('err', err);
        if (params.setIsLoading) {
          params.setIsLoading(false);
        }
        if (params.setIsLoadingMore) {
          params.setIsLoadingMore(false);
        }
      }
    },
  );
};
