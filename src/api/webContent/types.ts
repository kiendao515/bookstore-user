import { IImage } from "@/utils/interfaces";

export interface IWebContent {
  id: string;
  key: string;
  page_name: string;
  title: string;
  image: IImage;
  property: string;
  value: string;
  created_at: string;
  updated_at: string;
}

export interface IWebContentRes {
  result: boolean;
  data: IWebContent[];
  page: number;
  size: number;
  total_elements: number;
  total_pages: number;
}

export interface IWebContentDetailRes {
  result: boolean;
  data: IWebContent;
}

export interface IReqParams {
  page?: number;
  size?: number;
  reload?: number;
}

export interface ICreateWebContent {
  key: string;
  page_name: string;
  title: string;
  property: string;
  value: string;
}

export interface IUpdateWebContent {
  id: string;
  key: string;
  page_name: string;
  title: string;
  property: string;
  value: string;
}