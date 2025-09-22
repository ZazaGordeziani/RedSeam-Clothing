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
    links: {
        first: string
        last: string
        prev?: string
        next?: string
    }
    meta: {
        current_page: number
        last_page: number
        from: number
        to: number
        per_page: number
        total: number
        path: string
    }
}
export interface ProductsListProps {
    priceFrom?: number | null
    priceTo?: number | null
    sort?: string | null
    onTotalPagesChange?: (totalPages: number) => void // to get amount of total pages
}
