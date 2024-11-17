import { useQuery } from 'react-query';
import { IReqParams } from './types';
import { getCategories, getCategoryById } from './request';

export const useCategories = (params: IReqParams) => {
  const { data, ...rest } = useQuery([`/api/v1/categories`, params],
    async () => {
      const result = await getCategories(params);
      return result;
    },
    {
      enabled: params != undefined
    }
  );
  return { categories: data, ...rest };
};

export const useCategoryDetail = (id: string, reload?: number) => {
  const { data, ...rest } = useQuery([`/api/v1/categories/`, id, reload],
    async () => {
      const result = await getCategoryById(id);
      return result;
    },
    {
      enabled: id != undefined
    }
  );
  return { category: data, ...rest };
};