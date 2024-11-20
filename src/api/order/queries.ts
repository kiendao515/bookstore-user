import { useQuery } from 'react-query';
import { getCarts, getCities, getDistricts, getFullAddress, getOrderById, getOrders, getWards } from './request';
import { IReqParams } from './types';

export const useOrderDetail = (id: string, reload?: number) => {
    const { data, ...rest } = useQuery([`/api/v2/orders`, id, reload],
        async () => {
            const result = await getOrderById(id);
            return result;
        },
        {
            enabled: id != undefined && id != ''
        }
    );
    return { order: data, ...rest };
};
export const useOrders = (params: IReqParams) => {
    const { data, ...rest } = useQuery([`/api/v2/orders`, params],
        async () => {
            const result = await getOrders(params);
            return result;
        },
        {
            enabled: params != undefined
        }
    );
    return { orders: data, ...rest };
};

export const useProvinces = (reload?: number) => {
    const { data, ...rest } = useQuery([`/get-city`, reload],
        async () => {
            const result = await getCities();
            return result;
        },
    );
    return { provinces: data, ...rest };
}

export const useDistricts = (id: string, reload?: number) => {
    const { data, ...rest } = useQuery([`/get-districts/${id}`, reload],
        async () => {
            const result = await getDistricts(id);
            return result;
        },
        {
            enabled: id != ''
        }
    );
    return { districts: data, ...rest };
}

export const useWards = (id: string, reload?: number) => {
    const { data, ...rest } = useQuery([`/get-wards/${id}`, reload],
        async () => {
            const result = await getWards(id);
            return result;
        },
        {
            enabled: id != ''
        }
    );
    return { wards: data, ...rest };
}

export const useFullAddress = (wardId: string, reload?: number) => {
    const { data, ...rest } = useQuery([`/get-full-address/${wardId}`, reload],
        async () => {
            const result = await getFullAddress(wardId);
            return result;
        },
        {
            enabled: wardId != ''
        }

    );
    return { fullAddress: data, ...rest };
}

export const useCart = (reload?: number) => {
    const { data, ...rest } = useQuery([`/api/v1/carts`, reload],
        async () => {
            const result = await getCarts();
            return result;
        },
    );
    return { data: data, ...rest };
}
