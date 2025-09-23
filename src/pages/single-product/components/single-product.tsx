// src/pages/products/components/ProductDetails.tsx
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { type SingleProduct } from '@/pages/single-product/components/utils/utils'
import { fetchProductById } from '@/react-query/query/single-product'
import { getColorHex } from '@/pages/single-product/components/utils/colors'
import { DownArrow } from '@/assets/down-arrow'
import CartIconWhite from '@/pages/single-product/components/assets/cart-icon-white'
import { formatProductName } from '@/pages/products/utils/utils'
import { BounceLoader } from 'react-spinners'

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
    console.log(data)

    useEffect(() => {
        if (!selectedColor) return
        const colorIndex =
            data?.available_colors?.indexOf(selectedColor ?? '') ?? -1
        if (colorIndex !== -1 && data?.images[colorIndex]) {
            setMainImage(data.images[colorIndex])
        }
    }, [selectedColor, data])
    if (isLoading)
        return (
            <div className="flex h-screen w-screen items-center justify-center">
                {' '}
                <BounceLoader color="#FF7F00" />
            </div>
        )
    if (isError) return <div>Error: {error?.message}</div>
    if (!data) return <div>No product found</div>

    const displayedImage = mainImage || data.images[0] || data.cover_image

    const hasColors = data.available_colors && data.available_colors.length > 0
    const hasSizes = data.available_sizes && data.available_sizes.length > 0

    return (
        <div className="flex flex-col gap-10 pl-[106px] pt-4">
            <p className="font-medium text-gray-500">Listing / Product</p>{' '}
            <div className="grid grid-cols-2 gap-48 pb-24 font-poppins">
                <div className="flex flex-col gap-8">
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-[9px]">
                            {data.images.map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    alt={`image-${i}`}
                                    className="max-h-[160px] max-w-[120px] cursor-pointer rounded border border-gray-300 object-contain shadow-md"
                                    onClick={() => setMainImage(img)}
                                />
                            ))}
                        </div>
                        <div className="">
                            <img
                                src={displayedImage}
                                alt={data.name}
                                style={{
                                    border: '1px solid white',
                                    borderRadius: '10px',
                                }}
                                className="h-[940px] w-full max-w-[700px] shadow-xl"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex max-w-[700px] flex-col gap-14">
                    <div className="flex flex-col gap-[21px] text-[32px] font-semibold leading-[100%]">
                        <h1>{formatProductName(data.name)}</h1>
                        <p>$ {data.price}</p>
                    </div>
                    <div className="flex flex-col gap-12">
                        <div className="flex flex-col gap-6">
                            <p className="font-medium">Colors:</p>
                            {hasColors ? (
                                <div className="flex gap-3">
                                    {data.available_colors!.map((color) => {
                                        const bgColor = getColorHex(color)
                                        const isSelected =
                                            selectedColor === color

                                        return (
                                            <button
                                                key={color}
                                                style={{
                                                    background: bgColor,
                                                    border: isSelected
                                                        ? '1px solid #E1DFE1'
                                                        : '',
                                                    padding: '4px',
                                                    borderRadius: '50%',
                                                    backgroundClip:
                                                        'content-box',
                                                }}
                                                className="h-[38px] w-[38px]"
                                                onClick={() =>
                                                    setSelectedColor(color)
                                                }
                                                title={color}
                                            />
                                        )
                                    })}
                                </div>
                            ) : (
                                <p className="text-gray-500">
                                    No available colors
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-4 text-base font-normal text-gray-900">
                            <p>Size:</p>
                            {hasSizes ? (
                                <div className="mt-1 flex gap-2">
                                    {data.available_sizes!.map((size) => (
                                        <button
                                            key={size}
                                            className={`h-[42px] w-[70px] rounded-[10px] border border-neutral-200 px-4 py-[9px] ${
                                                selectedSize === size
                                                    ? 'border-gray-900'
                                                    : ''
                                            }`}
                                            onClick={() =>
                                                setSelectedSize(size)
                                            }
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <p className="">No available sizes</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-4 font-normal">
                            <p className="text-base">Quantity</p>
                            <div className="relative flex">
                                <select
                                    value={quantity}
                                    onChange={(e) =>
                                        setQuantity(Number(e.target.value))
                                    }
                                    className="h-[42px] w-[70px] appearance-none rounded-[10px] border border-neutral-200 pl-4 text-sm"
                                >
                                    {Array.from(
                                        { length: 10 },
                                        (_, i) => i + 1,
                                    ).map((q) => (
                                        <option key={q} value={q}>
                                            {q}
                                        </option>
                                    ))}
                                </select>
                                <DownArrow />
                            </div>
                        </div>
                        <button
                            className="mt-4 flex items-center justify-center gap-[10px] rounded-[10px] bg-orange-600 px-[60px] py-4 text-lg font-medium text-white disabled:opacity-50"
                            disabled={!hasColors || !hasSizes}
                        >
                            <p>
                                <CartIconWhite />
                            </p>
                            <p>Add to cart</p>
                        </button>
                    </div>
                    <div>
                        <hr />
                    </div>

                    <div className="flex flex-col gap-[7px]">
                        <div className="flex items-center justify-between text-xl font-medium text-gray-900">
                            <h2>Details</h2>
                            <img
                                className="h-[61px] w-[109px]"
                                src={data?.brand.image}
                            ></img>
                        </div>
                        <div className="mt-2 flex flex-col gap-[19px] text-base font-normal">
                            <p>Brand: {data.brand.name}</p>
                            <p className="mt-2 text-gray-700">
                                {data.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
