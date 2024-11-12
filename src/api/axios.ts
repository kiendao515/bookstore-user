import toast from 'react-hot-toast';

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { capitalizeFirstLetter } from '@/utils/common';
import { API_URL } from '@/utils/constant';
import { COOKIES, getCookies, removeCookies } from '@/utils/cookies';

export const request = axios.create({
  baseURL: API_URL,
});

const handleError = async (error: any) => {
  const data = error?.response?.data;

  if (error.response.status === 401) {
    localStorage.clear();
    removeCookies(COOKIES.token);
    if (data.error.message === 'TokenExpire') {
      location.href = '/';
      toast.error('Session expired !');
    }
  }

  const message = data?.meta?.message;
  if (!!message && error.config.method?.toUpperCase() !== 'GET') {
    toast.error(capitalizeFirstLetter(typeof message === 'string' ? message : message[0]));
  }
  return Promise.reject(data);
};

const handleSuccess = (res: AxiosResponse): any => {
  return res;
};

request.interceptors.response.use(handleSuccess, handleError);

request.interceptors.request.use(
  async (config: any) => {
    const token = getCookies(COOKIES.token);
    if (token) {
      config = {
        ...config,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    }

    return config;
  },
  (error) => Promise.reject(error),
);
