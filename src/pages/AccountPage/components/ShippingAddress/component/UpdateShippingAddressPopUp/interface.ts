import { Dispatch } from "react";

export interface IUpdateShippingAddressPopUp {
    setReload: Dispatch<React.SetStateAction<number>>,
    id?: string
    setToggle: Dispatch<React.SetStateAction<boolean>>
    reload: number;
}
export interface IFormValue {
    full_name: string;
    phone_number: string;
    province_code: string;
    district_code: string;
    ward_code: string;
    street: string;
    default: boolean
}