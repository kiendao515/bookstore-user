import { useQuery } from 'react-query';

import { COOKIES, getCookies } from '@/utils/cookies';

import { confirmRegistration, getProfile } from './request';
import { IConfirmRegistrationParams, IUserProfileResponse } from './types';


export const useUserProfile = (reload?: number) => {
  const token = getCookies(COOKIES.token);
  const { data, ...rest } = useQuery<IUserProfileResponse, Error>([`/api/v1/users/profile`, token, reload], async () => {
    const data = await getProfile();
    return data;
  });
  return { user: data, ...rest };
};

export const useRegistrationConfirm = (params: IConfirmRegistrationParams) => {
  const { data, ...rest } = useQuery([`/api/v1/auth/register/confirm`, params], async () => {
    const data = await confirmRegistration(params);
    return data;
  }, {
    enabled: params.token != null
  });
  return { data, ...rest };
};
