import { Dispatch } from "react";

export interface ICreateShippingAddressPopUp {
    setReload: Dispatch<React.SetStateAction<number>>,
    setToggle: Dispatch<React.SetStateAction<boolean>>,
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