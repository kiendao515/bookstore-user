import { BookTypeInfo } from "@/pages/BookDetailPage/interface";
import { IBook, ICreateBook } from "../books";
export interface ICreateCart {
    book_inventory_id: string;
    quantity: number,
    delete: boolean
}

export interface ICreateOrder {
    customer_name: string;
    customer_phone: string;
    email: string;
    province_code: string;
    district_code: string;
    ward_code: string;
    street: string;
    payment_method: boolean;
    note?: string,
    order_items: IOrderItem[];
}
export interface IOrderItem {
    book_inventory_id: string,
    quantity: number
}

export interface IBookOrder {
    book_id: string;
    quantity: number;
    type: string;
}

export interface ICreateOrderRes {
    result: boolean;
    reason: string;
    data: IOrder | string;
}
export interface IOrder {
    id: string;
    accountId: string;
    receiverName: string;
    receiverPhone: string;
    street: string;
    status: string;
    paymentType: boolean;
    shippingFee: number;
    totalAmount: number;
    transactionId?: any;
    orderCode: string;
    shippingCode?: any;
    shippingCompany: string;
    note: string;
    createdAt: string;
    updatedAt?: any;
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
export interface ICart {
    result: boolean,
    data: Cart[]
}
export interface Cart {
    id: string,
    book: IBook,
    type: string,
    quantity: number
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
    payment_type: boolean
    discount_point: number
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
    updated_at: any,
    address: string,
    order_items: OrderItem[],
    total_amount: number
}
export interface OrderItem {
    book_name: string,
    quantity: number,
    price: number,
    type: string
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
    result: boolean,
    data: ICreateOrderData,
    reason: string
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
export interface BaseResponse {
    result: boolean,
    reason: string,
    data: number
}
export interface ICalculateFee {
    address: string,
    province: string,
    district: string,
    weight: number,
    value: number
}
export interface IOrderCombinedResponse {
    result: boolean
    data: ICombinedOrder[]
}
export interface ICombinedOrder{
    order_code: string,
    total_amount: number
}
export interface ICombinedOrderFee{
    province_code: string;
    district_code: string;
    ward_code: string;
    street: string;
    order_items: IOrderItem[]
    related_order_id: string
}