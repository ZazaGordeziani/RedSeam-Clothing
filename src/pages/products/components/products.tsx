import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductsList } from '@/pages/products/components/products-list'
import { ProductsToolbar } from '@/pages/products/components/products-toolbar'

export const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const [priceFrom, setPriceFrom] = useState<number | null>(null)
    const [priceTo, setPriceTo] = useState<number | null>(null)
    const [sort, setSort] = useState<string | null>(null)

    // Load filters & sort from URL on mount / update
    useEffect(() => {
        const fromParam = searchParams.get('filter[price_from]')
        const toParam = searchParams.get('filter[price_to]')
        const sortParam = searchParams.get('sort')

        setPriceFrom(fromParam ? Number(fromParam) : null)
        setPriceTo(toParam ? Number(toParam) : null)
        setSort(sortParam)
    }, [searchParams])

    // Apply filter values from FilterDropdown
    const handleApplyFilter = (from?: number, to?: number) => {
        setPriceFrom(from ?? null)
        setPriceTo(to ?? null)

        const params: Record<string, string> = {}

        if (from !== undefined) params['filter[price_from]'] = from.toString()
        if (to !== undefined) params['filter[price_to]'] = to.toString()
        if (sort) params.sort = sort

        setSearchParams(params)
    }

    // Apply sort value from SortDropdown
    const handleApplySort = (sortValue: string) => {
        setSort(sortValue)

        const params: Record<string, string> = {}

        if (priceFrom !== null)
            params['filter[price_from]'] = priceFrom.toString()
        if (priceTo !== null) params['filter[price_to]'] = priceTo.toString()
        if (sortValue) params.sort = sortValue

        setSearchParams(params)
    }

    return (
        <div className="flex w-full max-w-[1920px] flex-col items-center">
            <ProductsToolbar
                onApplyFilter={handleApplyFilter}
                onApplySort={handleApplySort}
                priceFrom={priceFrom}
                priceTo={priceTo}
                sort={sort}
            />

            <ProductsList
                priceFrom={priceFrom}
                priceTo={priceTo}
                sort={sort} // pass sort so ProductsList can refetch
            />
        </div>
    )
}
