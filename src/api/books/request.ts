import { request } from '../axios';
import { IBaseResponse } from '../interface';
import { IAuthor, IBook, IBookFavoriteResponse, IBookResponse, IBooks, IBookSettingResponse, ICreateBook, ICreateBookSetting, IReqParams, IUpdateBook, IUpdateMultipleBookReality } from './types';

export const getBooks = async (params: IReqParams): Promise<IBooks> => {
  const { data } = await request({
    url: `/api/v1/books?` + new URLSearchParams(params as any),
    method: 'GET',
  });
  return data;
};

export const getBookById = async (id: String): Promise<IBookResponse> => {
  const { data } = await request({
    url: `/api/v1/books/${id}`,
    method: 'GET',
  });
  return data;
};

export const createNewBook = async (body: ICreateBook): Promise<IBaseResponse> => {
  const { data } = await request({
    url: '/api/v1/books',
    method: 'POST',
    data: body,
  });
  return data;
};

export const updateBook = async (body: IUpdateBook): Promise<IBaseResponse> => {
  const { id, ...updateBody } = body;
  const { data } = await request({
    url: `/api/v1/books/${id}`,
    method: 'PUT',
    data: updateBody,
  });
  return data;
};

export const updateMultipleBookRealities = async (body: IUpdateMultipleBookReality): Promise<IBaseResponse> => {
  const { id, ...updateBody } = body;
  const { data } = await request({
    url: `/api/v1/books/${id}/reality-books`,
    method: 'PUT',
    data: updateBody,
  });
  return data;
};

export const deleteBook = async (id: String): Promise<IBaseResponse> => {
  const { data } = await request({
    url: `/api/v1/books/${id}`,
    method: 'DELETE',
  });
  return data;
};
export const getAuthorByNameStart = async (name: String): Promise<IAuthor> => {
  const { data } = await request({
    url: `/api/v1/people/author?name=${name}`,
    method: 'GET',
  });
  return data;
}
export const getBookByAuthor = async (id: String): Promise<IBook> => {
  const { data } = await request({
    url: `/api/v1/people/books?authorId=${id}`,
    method: 'GET',
  });
  return data;
}


export const getBookSetting = async (): Promise<IBookSettingResponse> => {
  const { data } = await request({
    url: `/api/v1/books/setting`,
    method: 'GET',
  });
  return data;
};

export const createBookSetting = async (body: ICreateBookSetting): Promise<IBaseResponse> => {
  const { data } = await request({
    url: '/api/v1/books/setting',
    method: 'POST',
    data: body,
  });
  return data;
};

export const getBookFavorite = async (): Promise<IBookFavoriteResponse> => {
  const { data } = await request({
    url: `/api/v1/books/favorite`,
    method: 'GET',
  });
  return data;
};

export const updateBookFavorite = async (id: string): Promise<IBaseResponse> => {
  const { data } = await request({
    url: `/api/v1/books/favorite/${id}`,
    method: 'PUT',
  });
  return data;
};