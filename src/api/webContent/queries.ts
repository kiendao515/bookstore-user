import { useQuery } from 'react-query';
import { IReqParams } from './types';
import { getWebContentById, getWebContents } from './request';

export const useWebContents = (params: IReqParams) => {
  const { data, ...rest } = useQuery([`/api/v1/web-contents`, params],
    async () => {
      const result = await getWebContents(params);
      return result;
    },
    {
      enabled: params != undefined
    }
  );
  return { webContents: data, ...rest };
};

export const useWebContentDetail = (id: string, reload?: number) => {
  const { data, ...rest } = useQuery([`/api/v1/web-contents`, id, reload],
    async () => {
      const result = await getWebContentById(id);
      return result;
    },
    {
      enabled: id != undefined
    }
  );
  return { webContent: data, ...rest };
};