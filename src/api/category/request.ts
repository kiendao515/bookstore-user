import { request } from '../axios';
import { IBaseResponse } from '../interface';
import { ICategories, ICategoryRes, ICreateCategory, IReqParams, IUpdateCategory } from './types';

export const getCategories = async (params: IReqParams): Promise<ICategories> => {
  const { data } = await request({
    url: `/api/v1/categories?` + new URLSearchParams(params as Record<string, string>),
    method: 'GET',
  });
  return data;
};

export const getCategoryById = async (id: String): Promise<ICategoryRes> => {
  const { data } = await request({
    url: `/api/v1/categories/${id}`,
    method: 'GET',
  });
  return data;
};

export const createNewCategory = async (body: ICreateCategory): Promise<IBaseResponse> => {
  const { data } = await request({
    url: '/api/v1/categories',
    method: 'POST',
    data: body,
  });
  return data;
};

export const updateCategory = async (body: IUpdateCategory): Promise<IBaseResponse> => {
  const { id, ...updateBody } = body;
  const { data } = await request({
    url: `/api/v1/categories/${id}`,
    method: 'PUT',
    data: updateBody,
  });
  return data;
};

export const deleteCategory = async (id: String): Promise<IBaseResponse> => {
  const { data } = await request({
    url: `/api/v1/categories/${id}`,
    method: 'DELETE',
  });
  return data;
};


