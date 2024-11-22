import axios, { AxiosResponse } from 'axios';

import { capitalizeFirstLetter } from '@/utils/common';
import { API_URL } from '@/utils/constant';
import { COOKIES, getCookies, removeCookies } from '@/utils/cookies';
import toast from 'react-hot-toast';

export const request = axios.create({
  baseURL: API_URL,
});

const handleError = async (error: any) => {

  if (error.response?.status === 401 || error.response?.status === 403) {
    removeCookies(COOKIES.user);
    removeCookies(COOKIES.token);
    localStorage.clear();
    if (window.location.pathname.includes('/admin')) {
      window.location.href = '/admin/login';
    } else {
      window.location.href = '/';
    }
    toast.success("Vui lòng đăng nhập lại hệ thống");
  }

  const message = error?.message;
  if (!!message && error.config.method?.toUpperCase() !== 'GET') {
    console.log(capitalizeFirstLetter(typeof message === 'string' ? message : message[0]));
  }

  return Promise.reject(error);
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
