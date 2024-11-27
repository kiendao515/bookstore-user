import { request } from "../axios";
import { IBaseResponse } from "../interface";
import { ICollectionResponse, IReqParams } from "./types";

export const getCollections = async (params: IReqParams): Promise<ICollectionResponse> => {
  const { data } = await request({
    url: `/api/v1/collections?` + new URLSearchParams(params as any),
    method: 'GET',
  });
  return data;
};
