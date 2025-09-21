import { httpClient } from '@/api'
import { useQuery, type UseQueryOptions } from '@tanstack/react-query'

interface Product {
    id: number
    name: string
    release_year: string
    cover_image: string
    price: number
}

interface ProductResponse {
    data: Product[]
}

interface ProductsListProps {
    priceFrom?: number | null
    priceTo?: number | null
}

export const ProductsList = ({ priceFrom, priceTo }: ProductsListProps) => {
    const queryOptions: UseQueryOptions<
        ProductResponse,
        Error,
        ProductResponse,
        readonly unknown[]
    > = {
        queryKey: ['products', priceFrom ?? 0, priceTo ?? 1000000],
        queryFn: async () => {
            const res = await httpClient.get<ProductResponse>('/products', {
                params: {
                    'filter[price_from]': priceFrom ?? 0,
                    'filter[price_to]': priceTo ?? 1000000,
                },
            })
            return res.data
        },
        staleTime: 2 * 60 * 1000,
        refetchOnWindowFocus: false,
    }

    const { data, isLoading, isError, error } = useQuery(queryOptions)
    if (isError) return <div>Error: {error?.message}</div>
    const placeholderItems = Array.from({ length: 8 }) // number of placeholders

    return (
        <div className="mx-auto min-h-[614px] w-full max-w-[1920px] px-24 py-8">
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
                    <div
                        key={product.id}
                        className="h-[614px] max-w-[412px] rounded border border-red-600 shadow"
                    >
                        <img
                            src={product.cover_image}
                            alt={product.name}
                            className="h-[549px] w-full rounded-[10px] object-cover"
                        />
                        <div className="mt-3 flex flex-col gap-1 font-poppins font-medium leading-[100%]">
                            <h2 className="text-lg">{product.name}</h2>
                            <p className="text-base">Price: ${product.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
