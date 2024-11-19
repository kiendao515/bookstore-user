import { useQuery } from "react-query";
import { getShipmentById, getShipments } from "./request";
import { IReqParams } from "./types";
import { COOKIES, getCookies } from "@/utils/cookies";

export const useShippingAddresses = (params: IReqParams) => {
    const token = getCookies(COOKIES.token);
    const { data, ...rest } = useQuery([`/api/v1/shipping-addresses`, params, token],
        async () => {
            const result = await getShipments(params);
            return result;
        },
        {
            enabled: params != undefined
        }
    );
    return { shippingAddresses: data, ...rest };
}

export const useShippingAddressDetail = (id?: string, reload?: number) => {
    const token = getCookies(COOKIES.token);
    const { data, ...rest } = useQuery([`/api/v1/shipping-addresses/`, id, reload, token],
        async () => {
            const result = await getShipmentById(id);
            return result;
        },
        {
            enabled: id != undefined
        }
    );
    return { shippingAddress: data, ...rest };
}