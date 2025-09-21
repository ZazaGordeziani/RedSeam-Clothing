import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductsList } from '@/pages/products/components/products-list'
import { ProductsToolbar } from '@/pages/products/components/products-toolbar'

export const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const [priceFrom, setPriceFrom] = useState<number | null>(null)
    const [priceTo, setPriceTo] = useState<number | null>(null)
    const [sort, setSort] = useState<string | null>(null)
    const SORT_OPTIONS = ['created_at', 'price', '-price']

    const sortParam = searchParams.get('sort')

    const validSort = SORT_OPTIONS.includes(sortParam || '')
        ? sortParam
        : undefined

    useEffect(() => {
        const fromParam = searchParams.get('filter[price_from]')
        const toParam = searchParams.get('filter[price_to]')
        const sortParam = searchParams.get('sort')

        setPriceFrom(fromParam ? Number(fromParam) : null)
        setPriceTo(toParam ? Number(toParam) : null)
        setSort(sortParam)
    }, [searchParams])

    const handleApplyFilter = (from?: number, to?: number) => {
        setPriceFrom(from ?? null)
        setPriceTo(to ?? null)

        const params: Record<string, string> = {}

        if (from !== undefined) params['filter[price_from]'] = from.toString()
        if (to !== undefined) params['filter[price_to]'] = to.toString()
        if (sort) params.sort = sort

        setSearchParams(params)
    }

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
                sort={validSort}
            />
        </div>
    )
}
