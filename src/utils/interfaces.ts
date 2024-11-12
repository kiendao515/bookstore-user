export interface HeadCell {
    disablePadding: boolean;
    id: string;
    label: string;
    numeric: boolean;
}

export interface IPagination {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}

export interface ISelectBox {
    label: string;
    value: any;
    isDisabled: boolean;
}

export interface ITab {
    label: string;
    isShow: boolean;
}
