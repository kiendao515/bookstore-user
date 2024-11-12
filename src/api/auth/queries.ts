import { useQuery } from 'react-query';

import { COOKIES, getCookies } from '@/utils/cookies';

import { getProfile, getSummary } from './request';
import { IUserProfileResponse } from './types';

export const useUser = () => {
  const token = getCookies(COOKIES.token);
  const { data, ...rest } = useQuery<IUserProfileResponse, Error>([`/api/v1/users/profile`, token], async () => {
    const data = await getProfile();
    return data;
  });
  return { user: data, ...rest };
};

export const useUserSummary = () => {
  const token = getCookies(COOKIES.token);
  const { data, ...rest } = useQuery([`/api/v1/users/summary`, token], async () => {
    const data = await getSummary();
    return data;
  });
  return { user: data, ...rest };
};
