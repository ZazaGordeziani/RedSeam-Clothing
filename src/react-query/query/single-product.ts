import { httpClient } from '@/api'
import type { SingleProduct } from '@/pages/single-product/components/utils'

export const fetchProductById = async (id: string): Promise<SingleProduct> => {
    const response = await httpClient.get<SingleProduct>(`/products/${id}`)
    return response.data
}
