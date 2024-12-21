import { IBook } from "../books";

export interface IUser {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  role: string;
  date_of_birth: string;
  enabled: number;
  note: string;
  point: number;
  num_of_order: number;
  default_address: string;
  created_at: string;
  updated_at: string;
}

export interface IUserRes {
  success: boolean;
  data: IUser[];
  page: number;
  size: number;
  total_elements: number;
  total_pages: number;
}

export interface IUserDetailRes {
  success: boolean;
  data: IUser;
}

export interface IReqParams {
  phone_number?: string | null;
  email?: string | null;
  role?: string | null;
  page?: number;
  size?: number;
  reload?: number;
}

export interface ICreateUser {
  email: string;
  full_name: string;
  password: string;
}

export interface IUpdateUser {
  id: string;
  full_name: string;
  phone_number: string;
  date_of_birth: string;
  note: string;
  enabled: number;
}

export interface BookRecommendation {
  status: boolean;
  message: string;
  books : IBook[]
}