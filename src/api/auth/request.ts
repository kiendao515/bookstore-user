import { request } from '../axios';
import { IBaseResponse } from '../interface';
import { IChangePasswordParams, IConfirmRegistrationParams, ILoginParams, ILoginResponse, IRegisterParams, IRegisterResponse, IResetPasswordParams, ISendResetPwdParams, IUpdateUserParams, IUserProfileResponse, IUserSummaryResponse } from './types';

export const userRegisterRequest = async (params: IRegisterParams): Promise<IRegisterResponse> => {
  const { data } = await request({
    url: '/api/v1/auth/register',
    method: 'POST',
    data: params,
  });
  return data;
};

export const userLoginRequest = async (params: ILoginParams): Promise<ILoginResponse> => {
  const { data } = await request({
    url: '/api/v1/auth/login',
    method: 'POST',
    data: params,
  });

  return data;
};

export const confirmRegistration = async (params: IConfirmRegistrationParams): Promise<IBaseResponse> => {
  const { data } = await request({
    url: '/api/v1/auth/registration/confirm?' + new URLSearchParams(params as any),
    method: 'GET',
  });
  return data
}

export const sendResetPassword = async (params: ISendResetPwdParams): Promise<IBaseResponse> => {
  const { data } = await request({
    url: '/api/v1/auth/send-reset-password',
    method: 'POST',
    data: params
  });
  return data
}

export const resetPassword = async (params: IResetPasswordParams): Promise<IBaseResponse> => {
  const { data } = await request({
    url: '/api/v1/auth/reset-password',
    method: 'POST',
    data: params
  });
  return data
}

export const changePassword = async (params: IChangePasswordParams): Promise<IBaseResponse> => {
  const { data } = await request({
    url: '/api/v1/auth/change-password',
    method: 'PUT',
    data: params
  });
  return data
}

export const updateUserInfo = async (body: IUpdateUserParams): Promise<IUserProfileResponse> => {
  const { data } = await request({
    url: '/api/v1/auth/user-info',
    method: 'PUT',
    data: body
  });
  return data
}

export const getProfile = async (): Promise<IUserProfileResponse> => {
  const { data } = await request({
    url: `/api/v1/auth/profile`,
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
