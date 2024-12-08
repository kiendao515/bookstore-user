import { useQuery } from 'react-query';
import { IReqParams } from './types';
import { getCollectionById, getCollections } from './request';

export const useCollections = (params: IReqParams) => {
  const { data, ...rest } = useQuery([`/api/v1/collections`, params],
    async () => {
      const result = await getCollections(params);
      return result;
    },
    {
      enabled: params != undefined
    }
  );
  return { collections: data, ...rest };
};

export const useCollectionDetail = (id: string, reload?: number) => {
  const { data, ...rest } = useQuery([`/api/v1/collections/`, id, reload],
    async () => {
      const result = await getCollectionById(id);
      return result;
    },
    {
      enabled: id != undefined
    }
  );
  return { collection: data, ...rest };
};