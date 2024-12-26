import { IBookReality } from "@/api/books";
import { IFilterValue } from "../FilterBar/interface";

export interface IBookCollectionProps {
    filterValues?: IFilterValue[];
    bookParams: IReqParams;
    setBookParams: React.Dispatch<React.SetStateAction<IReqParams>>;
    searchField?: string;
    books?: IBook[];
    totalElements?: number;
    showFilter?: boolean;

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
    bookInventory: IBookReality[];
    quantity: number;
    description: string;
    image: string;
    id: string;
    soldCount: number;
}