import { request } from '../axios';
import { IBaseResponse } from '../interface';
import { ICreateWebContent, IReqParams, IUpdateWebContent, IWebContentDetailRes, IWebContentRes } from './types';

export const getWebContents = async (params: IReqParams): Promise<IWebContentRes> => {
  const { data } = await request({
    url: `/api/v1/web-contents?` + new URLSearchParams(params as Record<string, string>),
    method: 'GET',
  });
  return data;
};

export const getWebContentById = async (id: String): Promise<IWebContentDetailRes> => {
  const { data } = await request({
    url: `/api/v1/web-contents/${id}`,
    method: 'GET',
  });
  return data;
};

export const createWebContent = async (body: ICreateWebContent): Promise<IBaseResponse> => {
  const { data } = await request({
    url: '/api/v1/web-contents',
    method: 'POST',
    data: body,
  });
  return data;
};

export const updateWebContent = async (body: IUpdateWebContent): Promise<IBaseResponse> => {
  const { id, ...updateBody } = body;
  const { data } = await request({
    url: `/api/v1/web-contents/${id}`,
    method: 'PUT',
    data: updateBody,
  });
  return data;
};

export const deleteWebContent = async (id: String): Promise<IBaseResponse> => {
  const { data } = await request({
    url: `/api/v1/web-contents/${id}`,
    method: 'DELETE',
  });
  return data;
};
