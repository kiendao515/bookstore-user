import { request } from '../axios';
import { IBaseResponse } from '../interface';
import { ICreateShipment, IReqParams, IShipmentRes, IShipments, IUpdateShipment } from './types';

export const getShipments = async (params: IReqParams): Promise<IShipments> => {
    const { data } = await request({
        url: `/api/v1/shipping-addresses?` + new URLSearchParams(params as any),
        method: 'GET',
    });
    return data;
}

export const getShipmentById = async (id?: String): Promise<IShipmentRes> => {
    const { data } = await request({
        url: `/api/v1/shipping-addresses/${id}`,
        method: 'GET',
    });
    return data;
}

export const createShipment = async (body: ICreateShipment): Promise<IBaseResponse> => {
    const { data } = await request({
        url: '/api/v1/shipping-addresses',
        method: 'POST',
        data: body,
    });
    return data;
}

export const updateShipment = async (body: IUpdateShipment) => {
    const { id, ...updateBody } = body;
    const { data } = await request({
        url: `/api/v1/shipping-addresses/${id}`,
        method: 'PUT',
        data: updateBody,
    });
    return data;
}

export const deleteShipment = async (id: String) => {
    const { data } = await request({
        url: `/api/v1/shipping-addresses/${id}`,
        method: 'DELETE',
    });
    return data;
}