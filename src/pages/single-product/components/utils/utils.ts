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
