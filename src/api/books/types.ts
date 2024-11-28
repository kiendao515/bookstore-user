
export interface IBook {
  id: string
  name: string
  number_of_page: number
  description: string
  publish_year: number
  isbn: string
  publishing_unit: ICommonEntity
  publisher: ICommonEntity
  author_name: string
  editor: IPerson
  translator: IPerson
  cover_drawer: IPerson
  cover_image: string
  detail_image: string
  demo_url: string
  content_image: string[]
  tags: string[],
  number_of_books: number,
  category: ICategory
  book_inventories: IBookReality[]
  book_store: IBookStore
  created_at: string
  updated_at: string,
  sold_quantity: number
}

export interface IBookReality {
  id: string
  book_id: string;
  price: number
  location: string
  type: string
  store_id: string
  cover_image: string
  created_at: string
  updated_at: string
}

export interface ICommonEntity {
  id: string
  name: string
  description: string
  type: string
  thumbnail: string
  createdAt: string
  updatedAt: string
}

export interface IPerson {
  id: string
  name: string
  type: string
  nationality: boolean
  descriptions: IDescription[]
  createdAt: string
  updatedAt: string
}

export interface IDescription {
  type: string
  value: string
}


export interface ICategory {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
}

export interface IBookResponse {
  success: boolean,
  data: IBook
}

export interface IBooks {
  success: boolean
  data: IBook[]
  page: number
  size: number
  total_elements: number
  total_pages: number
}

export interface IReqParams {
  page?: number;
  size?: number;
  name?: string | null;
  category_id?: string | null;
  collection_id?: string| null;
  book_search_ids?: string | null;
  author_id?: string | null;
  store_id?: string | null;
  reload?: number;
  created_at: string;
  updated_at : string
}

export interface ICreateBook {
  name?: string
  number_of_page?: number
  description?: string
  publish_year?: number
  isbn?: string
  publishing_unit_id?: string
  publisher_id?: string
  author_id?: string
  editor_id?: string
  translator_id?: string
  cover_drawer_id?: string
  cover_image_id?: string
  detail_image_id?: string
  demo_image_ids?: string[]
  tag_ids?: string[]
  category_ids?: string[]
  demo_url?: string
  store_id?: string
  book_realities: ICreateBookReality[]
}

export interface IUpdateBook {
  id: string
  name?: string
  number_of_page?: number
  description?: string
  publish_year?: number
  isbn?: string
  publishing_unit_id?: string
  publisher_id?: string
  author_id?: string
  editor_id?: string
  translator_id?: string
  cover_drawer_id?: string
  cover_image_id?: string
  detail_image_id?: string
  demo_image_ids?: string[]
  demo_url?: string
  tag_ids?: string[]
  category_ids?: string[]
  store_id?: string
}

export interface IUpdateMultipleBookReality {
  id: string
  type: string
  quantity: number
  price: number
  cover_image_id?: string
}

export interface ICreateBookReality {
  type: string
  quantity: number
  price: number
  cover_image_id: string
}

export interface IBookStore {
  id: string
  name: string
  address: IAddress[]
  otherInformation: IOtherInformation[]
  imageId: any
  createdAt: string
  updatedAt: string
}

export interface IAddress {
  type: string
  value: string
}

export interface IOtherInformation {
  type: string
  value: string
}

export interface IBookItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string,
  type: string
}
export interface IAuthor {
  id: string
  name: string,
  books: IBook[]
}

export interface ICreateBookSetting {
  author_nationality: number
  book_store_id: string
  category_id: string
}

export interface IBookSetting {
  author_nationality: number
  book_store_id: string
  category_id: string
}

export interface IBookSettingResponse {
  success: boolean
  data: IBookSetting
  message: string
}

export interface IBookFavorite {
  user_id: string
  book_ids: string[]
}

export interface IBookFavoriteResponse {
  result: boolean
  data: IBookFavorite
  message: string
}