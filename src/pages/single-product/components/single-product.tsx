// src/pages/products/components/ProductDetails.tsx
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import type { SingleProduct } from '@/pages/single-product/components/utils'
import { fetchProductById } from '@/react-query/query/single-product'

export const SingleProductPage = () => {
    const { id } = useParams<{ id: string }>()
    const [mainImage, setMainImage] = useState<string | null>(null)
    const [selectedColor, setSelectedColor] = useState<string | null>(null)
    const [selectedSize, setSelectedSize] = useState<string | null>(null)
    const [quantity, setQuantity] = useState<number>(1)

    const { data, isLoading, isError, error } = useQuery<SingleProduct>({
        queryKey: ['single-product', id],
        queryFn: () => fetchProductById(id!),
    })

    useEffect(() => {
        if (data) {
            console.log('Full product response from backend:', data)
        }
    }, [data])

    useEffect(() => {
        if (!selectedColor) return
        const colorIndex =
            data?.available_colors?.indexOf(selectedColor ?? '') ?? -1
        if (colorIndex !== -1 && data?.images[colorIndex]) {
            setMainImage(data.images[colorIndex])
        }
    }, [selectedColor, data])
    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error: {error?.message}</div>
    if (!data) return <div>No product found</div>

    const displayedImage = mainImage || data.images[0] || data.cover_image

    const hasColors = data.available_colors && data.available_colors.length > 0
    const hasSizes = data.available_sizes && data.available_sizes.length > 0

    return (
        <div className="grid grid-cols-2 gap-10 p-10 font-poppins">
            <div className="flex flex-col gap-8">
                <p className="font-medium text-gray-500">Listing / Product</p>{' '}
                <div className="flex gap-4">
                    {/* <-- added text */}
                    <div className="flex flex-col gap-2">
                        {data.images.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt={`thumbnail-${i}`}
                                className="h-20 w-20 cursor-pointer rounded border border-gray-300 object-cover"
                                onClick={() => setMainImage(img)}
                            />
                        ))}
                    </div>
                    <div className="flex-1">
                        <img
                            src={displayedImage}
                            alt={data.name}
                            className="w-full rounded-lg border border-gray-200"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold">{data.name}</h1>
                <p className="text-xl font-semibold">$ {data.price}</p>

                <div>
                    <p className="font-medium">Colors:</p>
                    {hasColors ? (
                        <div className="mt-1 flex gap-2">
                            {data.available_colors!.map((color) => (
                                <button
                                    key={color}
                                    className={`rounded border px-3 py-1 ${
                                        selectedColor === color
                                            ? 'bg-gray-800 text-white'
                                            : 'bg-white text-gray-800'
                                    }`}
                                    onClick={() => setSelectedColor(color)}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No available colors</p>
                    )}
                </div>

                <div>
                    <p className="font-medium">Sizes:</p>
                    {hasSizes ? (
                        <div className="mt-1 flex gap-2">
                            {data.available_sizes!.map((size) => (
                                <button
                                    key={size}
                                    className={`rounded border px-3 py-1 ${
                                        selectedSize === size
                                            ? 'bg-gray-800 text-white'
                                            : 'bg-white text-gray-800'
                                    }`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <p className="">No available sizes</p>
                    )}
                </div>

                <div>
                    <p className="font-medium">Quantity:</p>
                    <select
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="mt-1 rounded border px-2 py-1"
                    >
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(
                            (q) => (
                                <option key={q} value={q}>
                                    {q}
                                </option>
                            ),
                        )}
                    </select>
                </div>

                <button
                    className="mt-4 rounded bg-orange-600 px-4 py-2 text-white disabled:opacity-50"
                    disabled={!hasColors || !hasSizes}
                >
                    Add to cart
                </button>

                <div className="mt-6">
                    <p className="font-medium">Brand: {data.brand.name}</p>
                    <p className="mt-2 text-gray-700">{data.description}</p>
                </div>
            </div>
        </div>
    )
}
