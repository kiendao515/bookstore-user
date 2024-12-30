export interface IFormValue {
    customer_email: string;
    customer_name: string;
    customer_phone: string;
    province_code: string;
    district_code: string;
    ward_code: string;
    street: string;
    payment_method: number;
    note?: string;
    discount_point?: number;
}