import { request } from '../axios';
import { IBaseResponse } from '../interface';
import { ICollectionRes, ICollections, ICreateCollection, IReqParams, IUpdateCollection } from './types';

export const getCollections = async (params: IReqParams): Promise<ICollections> => {
  const { data } = await request({
    url: `/api/v1/collections?` + new URLSearchParams(params as Record<string, string>),
    method: 'GET',
  });
  return data;
};

export const getCollectionById = async (id: String): Promise<ICollectionRes> => {
  const { data } = await request({
    url: `/api/v1/collections/${id}`,
    method: 'GET',
  });
  return data;
};

export const createNewCollection = async (body: ICreateCollection): Promise<IBaseResponse> => {
  const { data } = await request({
    url: '/api/v1/collections',
    method: 'POST',
    data: body,
  });
  return data;
};

export const updateCollection = async (body: IUpdateCollection): Promise<IBaseResponse> => {
  const { id, ...updateBody } = body;
  const { data } = await request({
    url: `/api/v1/collections/${id}`,
    method: 'PUT',
    data: updateBody,
  });
  return data;
};

export const deleteCollection = async (id: String): Promise<IBaseResponse> => {
  const { data } = await request({
    url: `/api/v1/collections/${id}`,
    method: 'DELETE',
  });
  return data;
};


