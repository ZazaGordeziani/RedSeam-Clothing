import { httpClient } from '@/api'
import { useQuery } from '@tanstack/react-query'

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

export const ProductsList = () => {
    const { data, isLoading, isError, error } = useQuery<
        ProductResponse,
        Error
    >({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await httpClient.get<ProductResponse>('/products')
            console.log(res.data)
            return res.data
        },
    })

    if (isLoading) return <div>Loading products...</div>
    if (isError) return <div>Error: {error?.message}</div>

    return (
        <div className="grid grid-cols-4 gap-3 gap-y-6 px-24 py-8">
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
    )
}
