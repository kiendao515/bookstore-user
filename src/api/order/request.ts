import { request } from "../axios";
import { IBaseResponse } from "../interface";
import { BaseResponse, IAddressRes, ICalculateFee, ICreateCart, ICreateOrder, ICreateOrderRes, IFullAddressRes, IOrderResponse, IReqParams, IUpdateOrder, OrderDetailRes, RetryPayment } from "./types";

export const createNewOrder = async (body: ICreateOrder): Promise<ICreateOrderRes> => {
  const { data } = await request({
    url: '/api/v1/orders',
    method: 'POST',
    data: body,
  });
  return data;
};
export const getOrders = async (params: IReqParams): Promise<IOrderResponse> => {
  const { data } = await request({
    url: `/api/v1/orders?` + new URLSearchParams(params as any),
    method: 'GET',
  });
  return data;
};
export const updateOrder = async (body: IUpdateOrder): Promise<IBaseResponse> => {
  const { id, ...updateBody } = body;
  const { data } = await request({
    url: `/api/v2/orders/${id}`,
    method: 'PUT',
    data: updateBody,
  });
  return data;
};

export const getCities = async (): Promise<IAddressRes> => {
  const { data } = await request({
    url: `/api/v1/provinces`,
    method: 'GET',
  });
  return data;
};

export const getDistricts = async (provinceCode: string): Promise<IAddressRes> => {
  const { data } = await request({
    url: `/api/v1/districts?province_code=${provinceCode}`,
    method: 'GET',
  });
  return data;
};

export const getWards = async (districtCode: string): Promise<IAddressRes> => {
  const { data } = await request({
    url: `/api/v1/wards?district_code=${districtCode}`,
    method: 'GET',
  });
  return data;
};

export const getFullAddress = async (wardCode: string): Promise<IFullAddressRes> => {
  const { data } = await request({
    url: `/api/v1/full-address?ward_code=${wardCode}`,
    method: 'GET',
  });
  return data;
}

export const getOrderById = async (id: string): Promise<OrderDetailRes> => {
  const { data } = await request({
    url: `/api/v1/orders/${id}`,
    method: 'GET',
  });
  return data;
}
export const retryPayment = async (id: string): Promise<RetryPayment> => {
  const { data } = await request({
    url: `/api/v2/orders/repayment/${id}`,
    method: 'GET',
  });
  return data;
}

export const addToCart = async (body:ICreateCart) => {
  const { data } = await request({
    url: '/api/v1/carts',
    method: 'POST',
    data: body,
  });
  return data;
};


export const getCarts = async (): Promise<IAddressRes> => {
  const { data } = await request({
    url: `/api/v1/carts`,
    method: 'GET',
  });
  return data;
};

export const calculateFee = async(body : ICalculateFee): Promise<BaseResponse>=>{
  const { data } = await request({
    url: '/api/v1/shipping/fee',
    method: 'POST',
    data: body,
  });
  return data;
}