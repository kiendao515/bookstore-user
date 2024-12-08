export interface ICollection {
    id: string;
    name: string;
    quantity: number;
    image: {
      id: string;
      link: string;
    }
    tag: {
      id: string;
      name: string;
    }
    description: string;
    created_at: string;
    updated_at: string;
  }
  
  export interface ICollectionRes {
    result: boolean,
    data: ICollection
  }
  
  export interface ICollections {
    success: boolean;
    data: ICollection[];
    page: number;
    size: number;
    total_elements: number;
    total_pages: number;
  }
  
  export interface IReqParams {
    name?: string;
    page?: number;
    size?: number;
    show_quantity?: number;
    sort_by?: string;
    order_by?: string;
    reload?: number;
  }
  
  export interface ICreateCollection {
    tag_id: string;
    image_id: string;
    description: string;
  }
  
  export interface IUpdateCollection {
    id: string;
    image_id: string;
    tag_id: string;
    description: string;
  }