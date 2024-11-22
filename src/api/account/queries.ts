import { useQuery } from 'react-query';
import { IReqParams } from './types';
import { getUserById, getUsers } from './request';

export const useUsers = (params: IReqParams) => {
  const { data, ...rest } = useQuery([`/api/v1/users`, params],
    async () => {
      const result = await getUsers(params);
      return result;
    },
    {
      enabled: params != undefined
    }
  );
  return { users: data, ...rest };
};

export const useUserDetail = (id: string, reload?: number) => {
  const { data, ...rest } = useQuery([`/api/v1/users/`, id, reload],
    async () => {
      const result = await getUserById(id);
      return result;
    },
    {
      enabled: id != undefined
    }
  );
  return { user: data, ...rest };
};