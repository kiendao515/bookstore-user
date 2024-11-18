export interface IBookDescription {
    id:string,
    name: string;
    editor: string;
    translator: string
    author: IAuthor
    cover_drawer: string
    publication_year: number
    publishing_company: string
    summary: string
    number_of_page: number
    categories: string[]
    tags: ITag[]
    collections: string[]
    book_type: BookType
    image: Image
    demo_url: string
}

export interface ITag {
    id: string;
    name: string;
}
export interface IAuthor {
    id: string;
    name: string;
}
export interface BookLevelComponent{
    book_type:BookType,
    onClick : any
}
export interface BookType {
    old: BookTypeInfo
    medium: BookTypeInfo
    good: BookTypeInfo
    new: BookTypeInfo
}

export interface BookTypeInfo {
    quantity: number
    price: number
    image?: string
}

export interface Image {
    cover_page: string
    detail_page: string
    demo: string[]
}
