import { IFilterValue } from "../FilterBar/interface";

export interface IBookCollectionProps {
    extendUrl?: string;
    firstIndex?: number;
    lastIndex?: number;
    currentPage?: number;
    totalPage?: number;
    totalElement?: number;
    title?: string;
    books?: IBookCardProps[],
    havePagination?: boolean,
    filterValues?: IFilterValue[],
    hasFilter?: boolean
    hasTitle?: boolean,
    hasHeader?: boolean
    setBookParams: React.Dispatch<React.SetStateAction<IReqParams>>
    bookParams?: IReqParams,
    isIndividualPage?: boolean,
    searchField?: string,
    isSearch?: boolean,
    searchText?: string,

}
export interface IBookCardProps {
    link: string;
    image: string;
    name?: string;
    author: string;
    type?: string;
    price: number;
    quantity?: number;
    description?: string;
    authorName: string;
    id: string;
    soldCount: number;
}

export interface IReqParams {
    page?: number;
    size?: number;
    name?: string | null;
    category_id?: string | null;
    collection_id?: string | null;
    book_search_ids?: string | null;
    author_id?: string | null;
    store_id?: string | null;
    reload?: number;
}

export interface IBook {
    link: string;
    name: string;
    price: number;
    type: string;
    authorName: string;
    quantity: number;
    description: string;
    image: string;
    id: string;
    soldCount: number;
}