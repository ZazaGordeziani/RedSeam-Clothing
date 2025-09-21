export interface FilterDropdownProps {
    onApply?: (from?: number, to?: number) => void
    priceFrom?: number | null
    priceTo?: number | null
}
export interface ProductsToolbarProps {
    priceFrom?: number | null
    priceTo?: number | null
    sort?: string | null
    onApplyFilter?: (from?: number, to?: number) => void
    onApplySort?: (sortValue: string) => void
}

export interface Product {
    id: number
    name: string
    release_year: string
    cover_image: string
    price: number
}

export interface ProductResponse {
    data: Product[]
}

export interface ProductsListProps {
    priceFrom?: number | null
    priceTo?: number | null
    sort?: string | null
}
