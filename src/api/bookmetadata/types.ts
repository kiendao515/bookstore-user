import { IImage } from "@/utils/interfaces"

export interface IAuthor {
    success: boolean,
    data: Author[],
    page: number,
    size: number,
    total_elements: number,
    total_pages: number
}
export interface Author {
    id: string
    name: string,
    nationality: boolean
}
export interface ICreateAuthor {
    name: string,
    type: "AUTHOR",
    nationality: boolean
}

export interface ICreateNewPerson {
    name: string,
    type: string,
    nationality: boolean
}

export interface IUpdateAuthor {
    id: string,
    name: string,
    type: "AUTHOR",
    nationality: boolean
}
export interface ITag {
    success: boolean,
    data: Tag[],
    page: number,
    size: number,
    total_elements: number,
    total_pages: number
}
export interface Tag {
    id: string
    name: string
}
export interface IUpdateTag {
    id: string,
    name: string,
}
export interface ICreateTag {
    name: string,
    type: string
}

export interface ICategory {
    success: boolean,
    data: Category[],
    page: number,
    size: number,
    total_elements: number,
    total_pages: number
}
export interface Category {
    id: string
    name: string
}
export interface IUpdateCategory {
    id: string,
    name: string,
}
export interface ICreateCategory {
    name: string
}
export interface IFile {
    success: boolean
    data: File,
    message: string
}
export interface File {
    id: string,
    url: string,
    message: string
}
export interface ICreateSeller {
    name: string,
    image_id: string,
    other_information: [
        {
            type: "description",
            value: string
        }
    ]
}
export interface ISeller {
    success: boolean,
    data: Seller[],
    page: number,
    size: number,
    total_elements: number,
    total_pages: number
}
export interface Seller {
    id: string,
    name: string,
    image: {
        id: string,
        link: string
    },
    other_information: [
        {
            type: string,
            value: string
        }
    ]
}
export interface IUpdateSeller {
    id: string,
    name: string,
    image_id: string,
    other_information: [
        {
            type: 'description',
            value: string
        }
    ]
}

export interface IPublisher {
    success: boolean,
    data: Publisher[],
    page: number,
    size: number,
    total_elements: number,
    total_pages: number
}
export interface Publisher {
    id: string,
    name: string,
    description: string,
    image: {
        id: string,
        link: string
    }
}

export interface ICreateTagRes {
    id: string,
    name: string,
    description: string,
    image: {
        id: string,
        link: string
    }
}

export interface ICreatePublisher {
    name: string,
    thumbnail: string,
    description: string,
    type: "PUBLISHER"
}
export interface IUpdatePublisher {
    id: string,
    name: string,
    thumbnail: string,
    description: string
}

export interface IUpdateCommonEntity {
    id: string,
    name: string,
    thumbnail?: string,
    description?: string
}

export interface IGetRelatedPersonReqParams {
    type?: string,
    related_person_id?: string,
    sort_by?: string,
    order_by?: string,
    page?: number,
    size?: number,
    reload?: number
}

export interface IRelatedPerson {
    id: string
    name: string,
    num_of_books?: number,
    nationality: boolean,
    type: string;
}

export interface IPerson {
    id: string
    name: string,
    nationality: boolean,
    type: string;
    num_of_books?: number
}

export interface IPersonRes {
    success: boolean,
    data: IPerson
}

export interface IRelatedPersonRes {
    success: boolean,
    data: IRelatedPerson[],
    page: number,
    size: number,
    total_elements: number,
    total_pages: number
}

export interface ICommonEntityReqParams {
    show_quantity?: number,
    sort_by?: string,
    order_by?: string,
    type?: string,
    page?: number,
    size?: number,
    reload?: number
}

export interface ICommonEntity {
    id: string
    name: string,
    description: string,
    type: string;
    num_of_books?: number
    image: IImage,
    created_at: string,
    updated_at: string
}

export interface ICommonEntityDetailRes {
    success: boolean,
    data: ICommonEntity
}

export interface ICommonEntityRes {
    success: boolean,
    data: ICommonEntity[],
    page: number,
    size: number,
    total_elements: number,
    total_pages: number
}