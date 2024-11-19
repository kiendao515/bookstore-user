import { IBook } from "../book";

export interface ICreateOrder {
    customer_name: string;
    customer_phone: string;
    customer_email: string;
    province_code: string;
    district_code: string;
    ward_code: string;
    street: string;
    payment_type: number;
    shipping_address_id?: string;
    note?: string,
    book_orders: IBookOrder[];
}

export interface IBookOrder {
    book_id: string;
    quantity: number;
    type: string;
}

export interface ICreateOrderRes {
    success: boolean;
    message: string;
    data: ICreateOrderData;
}
export interface ICreateOrderData {
    message: string;
    qr_code_url: string;
    order_code: string;
    id: string;
    payment_type: number;
}

export interface IOrderResponse {
    success: boolean
    data: OrderDetail[]
    page: number
    size: number
    total_elements: number
    total_pages: number
}
export interface IAddressRes {
    success: boolean;
    data: IAddress[]
}

export interface IAddress {
    code: string,
    full_name: string,
}
export interface IFullAddress {
    code: string,
    full_name: string,
}
export interface IFullAddressRes {
    success: boolean;
    data: IFullAddress
}
export interface OrderDetailRes {
    success: boolean,
    data: OrderDetail,
    message: string
}
export interface OrderDetail {
    id: string
    province: IAddress
    district: IAddress
    ward: IAddress
    customer_name: string
    customer_phone: string
    customer_email: string
    street: string
    status: string
    payment_type: number
    shipping_code: string
    shipping_company: string
    note: string
    order_code: string
    total_book_price: number
    total_price: number
    total_discount: number
    shipping_fee: number
    is_paid: boolean
    book_orders: IBookOrderDetail[]
    created_at: string
    updated_at: any
}

export interface IAddress {
    code: string,
    full_name: string,
}

export interface IBookOrderDetail {
    book_id: string
    name: string
    type: string
    thumbnail: string
    quantity: number
    price: number
}

export interface IBookItem {
    id: string
    name: string
    price: number
    quantity: number
    image: string,
    type: string,
    number_of_page: number,
    book: IBook
}
export interface RetryPayment {
    success: boolean,
    data: ICreateOrderData,
    message: string
}
export interface IReqParams {
    page?: number;
    size?: number;
    name?: string;
    category_ids?: string[];
    collection_ids?: string[];
    related_person_ids?: string[];
    store_id?: string | null;
    user_id?: string | null;
    reload?: number;
}
export interface IUpdateOrder {
    id: string
    province_code: string;
    district_code: string;
    ward_code: string;
    street: string;
    customer_email: string;
    customer_name: string,
    customer_phone: string,
    status: string,
    note: string,
    shipping_code: string,
    shipping_company: string
    is_paid?: boolean
}