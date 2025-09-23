import { httpClient } from '@/api'
import type {
    ProductResponse,
    ProductsListProps,
} from '@/pages/products/components/utils'
import { useQuery, type UseQueryOptions } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

export const ProductsList = ({
    priceFrom,
    priceTo,
    sort,
    currentPage,
    onTotalPagesChange,
    onResultsRangeChange,
}: ProductsListProps & {
    currentPage: number
    onTotalPagesChange?: (total: number) => void
    onResultsRangeChange?: (start: number, end: number, total: number) => void
}) => {
    const totalPagesRef = useRef<number>(0)
    const resultsRef = useRef({ start: 0, end: 0, total: 0 })
    const queryOptions: UseQueryOptions<
        ProductResponse,
        Error,
        ProductResponse,
        readonly unknown[]
    > = {
        queryKey: [
            'products',
            priceFrom ?? 0,
            priceTo ?? 1000000,
            sort ?? '',
            currentPage,
        ],
        queryFn: async () => {
            const res = await httpClient.get<ProductResponse>('/products', {
                params: {
                    'filter[price_from]': priceFrom ?? 0,
                    'filter[price_to]': priceTo ?? 1000000,
                    ...(sort ? { sort } : {}),
                    page: currentPage,
                },
            })

            const result = res.data

            if (result.meta?.last_page && onTotalPagesChange) {
                onTotalPagesChange(result.meta.last_page)
            }

            return result
        },
        staleTime: 2 * 60 * 1000,
        refetchOnWindowFocus: false,
    }

    const { data, isLoading, isError, error } = useQuery(queryOptions)

    useEffect(() => {
        if (data) {
            console.log(data)
        }
        if (!data?.meta) return

        if (
            onTotalPagesChange &&
            data.meta.last_page !== totalPagesRef.current
        ) {
            onTotalPagesChange(data.meta.last_page)
            totalPagesRef.current = data.meta.last_page
        }

        if (onResultsRangeChange) {
            const perPage = data.meta.per_page ?? 10
            const total = data.meta.total ?? 0
            const start = (currentPage - 1) * perPage + 1
            const end = Math.min(currentPage * perPage, total)

            if (
                start !== resultsRef.current.start ||
                end !== resultsRef.current.end ||
                total !== resultsRef.current.total
            ) {
                onResultsRangeChange(start, end, total)
                resultsRef.current = { start, end, total }
            }
        }
    }, [data, currentPage, onTotalPagesChange, onResultsRangeChange])

    if (isError) return <div>Error: {error?.message}</div>

    const placeholderItems = Array.from({ length: 8 })

    return (
        <div className="w-full px-24 py-8">
            {isLoading && (
                <div className="grid grid-cols-4 gap-3 gap-y-6">
                    {placeholderItems.map((_, index) => (
                        <div
                            key={index}
                            className="h-[614px] max-w-[412px] animate-pulse rounded border border-gray-200 bg-gray-100 shadow"
                        >
                            <div className="h-[549px] w-full rounded-[10px] bg-gray-300" />
                            <div className="mt-3 flex flex-col gap-1 px-2">
                                <div className="h-5 w-3/4 rounded bg-gray-300"></div>
                                <div className="h-4 w-1/2 rounded bg-gray-300"></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!isLoading && data?.data.length === 0 && (
                <div className="w-full py-20 text-center text-gray-500">
                    No products found for selected price
                </div>
            )}

            <div className="grid grid-cols-4 gap-3 gap-y-6">
                {data?.data.map((product) => (
                    <Link
                        to={`/products/${product.id}`}
                        key={product.id}
                        className="rounded shadow"
                    >
                        <img
                            src={product.cover_image}
                            alt={product.name}
                            className="aspect-[4/5] w-full rounded-[10px] object-contain"
                        />
                        <div className="mt-3 flex flex-col gap-[2px] font-poppins font-medium leading-[100%]">
                            <h2 className="text-lg">{product.name}</h2>
                            <p className="text-base">$ {product.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
