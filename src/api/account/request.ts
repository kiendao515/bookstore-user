import { request, requestPython } from '../axios';
import { IBaseResponse } from '../interface';
import { BookRecommendation, ICreateUser, IReqParams, IUpdateUser, IUserDetailRes, IUserRes } from './types';

export const getUsers = async (params: IReqParams): Promise<IUserRes> => {
  const { data } = await request({
    url: `/api/v1/users?` + new URLSearchParams(params as Record<string, string>),
    method: 'GET',
  });
  return data;
};

export const getUserById = async (id: String): Promise<IUserDetailRes> => {
  const { data } = await request({
    url: `/api/v1/users/${id}`,
    method: 'GET',
  });
  return data;
};

export const createUser = async (body: ICreateUser): Promise<IBaseResponse> => {
  const { data } = await request({
    url: '/api/v1/users',
    method: 'POST',
    data: body,
  });
  return data;
};

export const updateUser = async (body: IUpdateUser): Promise<IBaseResponse> => {
  const { id, ...updateBody } = body;
  const { data } = await request({
    url: `/api/v1/users/${id}`,
    method: 'PUT',
    data: updateBody,
  });
  return data;
};

export const deleteUser = async (id: String): Promise<IBaseResponse> => {
  const { data } = await request({
    url: `/api/v1/users/${id}`,
    method: 'DELETE',
  });
  return data;
};

export const sendChatMessage = async (message: string): Promise<BookRecommendation> => {
  const {data} = await requestPython({
    url:'/api/v1/books/search-book/',
    method: 'POST',
    data: {
      description:message
    }
  })
  return data;
}
