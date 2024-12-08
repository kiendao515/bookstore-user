import { IImage } from "@/utils/interfaces";
import { request } from "../axios";
import { IBaseResponse } from "../interface";
import { Author, IAuthor, ICategory, ICommonEntityDetailRes, ICommonEntityReqParams, ICommonEntityRes, ICreateAuthor, ICreateCategory, ICreateNewPerson, ICreatePublisher, ICreateSeller, ICreateTag, ICreateTagRes, IFile, IGetRelatedPersonReqParams, IPersonRes, IPublisher, IRelatedPersonRes, ISeller, ITag, IUpdateAuthor, IUpdateCategory, IUpdateCommonEntity, IUpdatePublisher, IUpdateSeller, IUpdateTag, Publisher } from "./types";

export const getListAuthor = async (page: number, size: number): Promise<IAuthor> => {
  const { data } = await request({
    url: `/api/v1/people?page=${page}&size=${size}&type=AUTHOR`,
    method: 'GET',
  });
  return data;
}

export const addAuthor = async (body: ICreateAuthor): Promise<IBaseResponse> => {
  const { data } = await request({
    url: '/api/v1/people',
    method: 'POST',
    data: body,
  });
  return data;
}

export const getPersonById = async (id?: string): Promise<IPersonRes> => {
  const { data } = await request({
    url: `/api/v1/people/${id}`,
    method: 'GET',
  });
  return data;
}

export const addNewPerson = async (body: ICreateNewPerson): Promise<IBaseResponse<Author>> => {
  const { data } = await request({
    url: '/api/v1/people',
    method: 'POST',
    data: body,
  });
  return data;
}
export const updateAuthor = async (body: IUpdateAuthor): Promise<IBaseResponse> => {
  const { id, ...updateBody } = body;
  const { data } = await request({
    url: `/api/v1/people/${id}`,
    method: 'PUT',
    data: updateBody,
  });
  return data;
};

export const deleteAuthor = async (id: String): Promise<IBaseResponse> => {
  const { data } = await request({
    url: `/api/v1/people/${id}`,
    method: 'DELETE',
  });
  return data;
};

export const getTags = async (page: number, size: number): Promise<ITag> => {
  const { data } = await request({
    url: `/api/v1/entity/common?page=${page}&size=${size}&type=TAG`,
    method: 'GET',
  });
  return data;
}

export const addTag = async (body: ICreateTag): Promise<IBaseResponse<ICreateTagRes>> => {
  const { data } = await request({
    url: '/api/v1/entity/common',
    method: 'POST',
    data: body,
  });
  return data;
}
export const updateTag = async (body: IUpdateTag): Promise<IBaseResponse> => {
  const { id, ...updateBody } = body;
  const { data } = await request({
    url: `/api/v1/entity/common/${id}`,
    method: 'PUT',
    data: updateBody,
  });
  return data;
}
export const deleteTag = async (id: String): Promise<IBaseResponse> => {
  const { data } = await request({
    url: `/api/v1/entity/common/${id}`,
    method: 'DELETE',
  });
  return data;
};
export const getCategory = async (page: number, size: number): Promise<ICategory> => {
  const { data } = await request({
    url: `/api/v1/categories?page=${page}&size=${size}`,
    method: 'GET',
  });
  return data;
}

export const addCategory = async (body: ICreateCategory): Promise<IBaseResponse> => {
  const { data } = await request({
    url: '/api/v1/categories',
    method: 'POST',
    data: body,
  });
  return data;
}
export const updateCategory = async (body: IUpdateCategory): Promise<IBaseResponse> => {
  const { id, ...updateBody } = body;
  const { data } = await request({
    url: `/api/v1/categories/${id}`,
    method: 'PUT',
    data: updateBody,
  });
  return data;
}

export const deleteCategory = async (id: String): Promise<IBaseResponse> => {
  const { data } = await request({
    url: `/api/v1/categories/${id}`,
    method: 'DELETE',
  });
  return data;
};
export const uploadFile = async (body: File | IImage): Promise<IFile> => {
  const formData = new FormData();
  formData.append('file', body);
  const { data } = await request({
    url: `/api/v1/file/upload`,
    method: 'POST',
    data: formData
  })
  return data;
};
export const addSeller = async (body: ICreateSeller): Promise<IBaseResponse> => {
  const { data } = await request({
    url: '/api/v1/book-stores',
    method: 'POST',
    data: body,
  });
  return data;
}

export const getSeller = async (page: number, size: number): Promise<ISeller> => {
  const { data } = await request({
    url: `/api/v1/book-stores?page=${page}&size=${size}`,
    method: 'GET',
  });
  return data;
}

export const updateSeller = async (body: IUpdateSeller): Promise<IBaseResponse> => {
  const { id, ...updateBody } = body;
  const { data } = await request({
    url: `/api/v1/book-stores/${id}`,
    method: 'PUT',
    data: updateBody,
  });
  return data;
}

export const deleteSeller = async (id: String): Promise<IBaseResponse> => {
  const { data } = await request({
    url: `/api/v1/book-stores/${id}`,
    method: 'DELETE',
  });
  return data;
};

export const getPublisher = async (page: number, size: number): Promise<IPublisher> => {
  const { data } = await request({
    url: `/api/v1/entity/common?page=${page}&size=${size}&type=PUBLISHER`,
    method: 'GET',
  });
  return data;
}
export const addPublisher = async (body: ICreatePublisher): Promise<IBaseResponse<Publisher>> => {
  const { data } = await request({
    url: '/api/v1/entity/common',
    method: 'POST',
    data: body,
  });
  return data;
}
export const updatePublisher = async (body: IUpdatePublisher): Promise<IBaseResponse> => {
  const { id, ...updateBody } = body;
  const { data } = await request({
    url: `/api/v1/entity/common/${id}`,
    method: 'PUT',
    data: updateBody,
  });
  return data;
}
export const deletePublisher = async (id: String): Promise<IBaseResponse> => {
  const { data } = await request({
    url: `/api/v1/entity/common/${id}`,
    method: 'DELETE',
  });
  return data;
};

export const getRelatedPeople = async (params: IGetRelatedPersonReqParams): Promise<IRelatedPersonRes> => {
  const { data } = await request({
    url: `/api/v1/people?` + new URLSearchParams(params as any),
    method: 'GET',
  });
  return data;
}

export const getCommonEntities = async (params: ICommonEntityReqParams): Promise<ICommonEntityRes> => {
  const { data } = await request({
    url: `/api/v1/entity/common?` + new URLSearchParams(params as any),
    method: 'GET',
  });
  return data;
}

export const getCommonEntityById = async (id?: String): Promise<ICommonEntityDetailRes> => {
  const { data } = await request({
    url: `/api/v1/entity/common/${id}`,
    method: 'GET',
  });
  return data;
}

export const deleteCommonEntity = async (id: String): Promise<IBaseResponse> => {
  const { data } = await request({
    url: `/api/v1/entity/common/${id}`,
    method: 'DELETE',
  });
  return data;
};

export const updateCommonEntity = async (body: IUpdateCommonEntity): Promise<IBaseResponse> => {
  const { id, ...updateBody } = body;
  const { data } = await request({
    url: `/api/v1/entity/common/${id}`,
    method: 'PUT',
    data: updateBody,
  });
  return data;
}