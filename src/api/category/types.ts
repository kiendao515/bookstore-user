export interface ICategory {
  id: string;
  name: string;
  num_of_books: number;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface ICategoryRes {
  result: boolean,
  data: ICategory
}

export interface ICategories {
  result: boolean;
  data: ICategory[];
  page: number;
  size: number;
  total_elements: number;
  total_pages: number;
}

export interface IReqParams {
  sort_by?: string;
  order_by?: string;
  page?: number;
  size?: number;
  reload?: number;
}

export interface ICreateCategory {
  name: string;
  description: string;
}

export interface IUpdateCategory {
  id: string;
  name: string;
  description?: string;
}