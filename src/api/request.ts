import axios, { AxiosRequestConfig } from 'axios';

import { getToken } from '@/utils/token';
import qs from 'qs';

const request = (url: string, options: AxiosRequestConfig & {isAuthorized?:boolean}) => {
  const { data, headers = { 'Content-Type': 'application/json' } } = options;

  options.headers = {
    ...headers,
    ...(options.isAuthorized ? { Authorization: `Bearer ${getToken()}` } : {}),
  };

  if (options.method === 'GET') {
    options.params = data; 
  } else {
    options.data = data; 
  }

  options.paramsSerializer = params => qs.stringify(params, { arrayFormat: 'repeat' });

  return axios({ url, ...options })
    .then(response => {
      const { statusText, status, data } = response;
      return {
        success: true,
        message: statusText,
        statusCode: status,
        data,
      };
    })
    .catch(error => {
      const { response } = error;
      const { status } = response || {};

      if (status === 401 || status === 403) {
        console.error('Unauthorized or Forbidden');
      }
      return Promise.reject(error?.response?.data || error);
    });
};

export default request;
