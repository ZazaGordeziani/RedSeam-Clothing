import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductsList } from '@/pages/products/components/products-list'
import { ProductsToolbar } from '@/pages/products/components/products-toolbar'
import { Pagination } from '@/pages/products/components/pagination'

export const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const [priceFrom, setPriceFrom] = useState<number | null>(null)
    const [priceTo, setPriceTo] = useState<number | null>(null)
    const [sort, setSort] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)
    const [resultsRange, setResultsRange] = useState({
        start: 0,
        end: 0,
        total: 0,
    })

    const SORT_OPTIONS = ['created_at', 'price', '-price']

    const sortParam = searchParams.get('sort')

    const validSort = SORT_OPTIONS.includes(sortParam || '')
        ? sortParam
        : undefined

    useEffect(() => {
        const fromParam = searchParams.get('filter[price_from]')
        const toParam = searchParams.get('filter[price_to]')
        const sortParam = searchParams.get('sort')
        const pageParam = searchParams.get('page') // NEW: get page from URL

        setPriceFrom(fromParam ? Number(fromParam) : null)
        setPriceTo(toParam ? Number(toParam) : null)
        setSort(sortParam)
        setCurrentPage(pageParam ? Number(pageParam) : 1)
    }, [searchParams])

    const handleApplyFilter = (from?: number, to?: number) => {
        setPriceFrom(from ?? null)
        setPriceTo(to ?? null)

        const params: Record<string, string> = {}

        if (from !== undefined) params['filter[price_from]'] = from.toString()
        if (to !== undefined) params['filter[price_to]'] = to.toString()
        if (sort) params.sort = sort
        params.page = '1'
        setSearchParams(params)
    }

    const handleApplySort = (sortValue: string) => {
        setSort(sortValue)

        const params: Record<string, string> = {}

        if (priceFrom !== null)
            params['filter[price_from]'] = priceFrom.toString()
        if (priceTo !== null) params['filter[price_to]'] = priceTo.toString()
        if (sortValue) params.sort = sortValue
        params.page = '1'

        setSearchParams(params)
    }

    const handlePageChange = (page: number) => {
        const params: Record<string, string> = {}

        if (priceFrom !== null)
            params['filter[price_from]'] = priceFrom.toString()
        if (priceTo !== null) params['filter[price_to]'] = priceTo.toString()
        if (sort) params.sort = sort
        params.page = page.toString()

        setSearchParams(params)
    }
    console.log('totalPages:', totalPages)

    return (
        <div className="flex w-full max-w-[1920px] flex-col items-center">
            <ProductsToolbar
                onApplyFilter={handleApplyFilter}
                onApplySort={handleApplySort}
                priceFrom={priceFrom}
                priceTo={priceTo}
                sort={sort}
                resultsRange={resultsRange}
            />

            <ProductsList
                priceFrom={priceFrom}
                priceTo={priceTo}
                sort={validSort}
                currentPage={currentPage}
                onTotalPagesChange={setTotalPages}
                onResultsRangeChange={(start, end, total) =>
                    setResultsRange({ start, end, total })
                }
            />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    )
}
