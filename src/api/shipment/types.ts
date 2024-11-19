
export interface IShipment {
    id: string;
    full_name: string;
    phone_number: string;
    province: IAddressDetail;
    district: IAddressDetail;
    ward: IAddressDetail;
    street: string;
    default: boolean;
}

export interface IAddressDetail {
    code: string;
    full_name: string;
}

export interface IShipmentRes {
    success: boolean;
    data: IShipment;
    message: string;
}

export interface IShipments {
    success: boolean;
    data: IShipment[];
    message: string;
    page: number
    size: number
    total_elements: number
    total_pages: number
}

export interface IReqParams {
    page?: number;
    limit?: number;
    reload?: number;
    user_id?: string | null;
}

export interface ICreateShipment {
    full_name: string;
    phone_number: string;
    province_code: string;
    district_code: string;
    ward_code: string;
    street: string;
    default: boolean;
}


export interface IUpdateShipment {
    id?: string;
    full_name: string;
    phone_number: string;
    province_code: string;
    district_code: string;
    ward_code: string;
    street: string;
    default: boolean;
}