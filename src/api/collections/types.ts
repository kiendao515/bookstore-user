

export interface ICollectionResponse {
    success: boolean
    data: Collection[]
    page: number
    size: number
    total_elements: number
    total_pages: number
}

export interface Collection {
    id: string
    name: string
    image: string
    description: string
    created_at: string
    updated_at: string
}

export interface IReqParams {
    page?: number;
    size?: number;
    name?: string | null
  }
