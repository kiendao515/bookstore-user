import { request } from '../axios';
import { ILoginParams, ILoginResponse, IUserProfile, IUserProfileResponse, IUserSummaryResponse } from './types';

export const adminLoginRequest = async (params: ILoginParams): Promise<ILoginResponse> => {
  const { data } = await request({
    url: '/api/v1/admin/login',
    method: 'POST',
    data: params,
  });
  return data;
};

export const teacherLoginRequest = async (params: ILoginParams): Promise<ILoginResponse> => {
  const { data } = await request({
    url: '/api/v1/teacher/login',
    method: 'POST',
    data: params,
  });

  return data;
};

export const getProfile = async (): Promise<IUserProfileResponse> => {
  const { data } = await request({
    url: `/api/v1/users/profile`,
    method: 'GET',
  });
  return data;
};

export const getSummary = async (): Promise<IUserSummaryResponse> => {
  const { data } = await request({
    url: `/api/v1/users/summary`,
    method: 'GET',
  });
  return data;
};
