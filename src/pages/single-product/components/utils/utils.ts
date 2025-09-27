import { httpClient } from '@/api'

export interface Brand {
    id: number
    name: string
    image: string
}

export interface SingleProduct {
    id: number
    name: string
    description: string
    release_date: string
    cover_image: string
    images: string[]
    price: number
    total_price: number
    quantity: number
    brand: Brand

    available_colors?: string[]
    available_sizes?: string[]
}

export const fetchProductById = async (id: string): Promise<SingleProduct> => {
    const response = await httpClient.get<SingleProduct>(`/products/${id}`)
    // console.log('backend response', response.data)
    return response.data
}
export interface BackendError {
    response?: {
        data?: {
            message?: string
            errors?: { message?: string }
        }
    }
}
