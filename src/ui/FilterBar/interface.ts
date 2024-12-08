import { IReqParams } from "@/api/books";

export interface IFilterBarProps {
    isPage?: boolean;
    filterValues?: IFilterValue[];
    bookParams?: IReqParams;
    searchField?: string;
    setBookParams: React.Dispatch<React.SetStateAction<IReqParams>>;
}

export interface IFilterValue {
    id: string;
    label: string;
    quantity?: number;
}