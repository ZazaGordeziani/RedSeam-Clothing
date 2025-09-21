import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ProductsList } from '@/pages/products/components/products-list'
import { ProductsToolbar } from '@/pages/products/components/products-toolbar'

export const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const [priceFrom, setPriceFrom] = useState<number | null>(null)
    const [priceTo, setPriceTo] = useState<number | null>(null)

    useEffect(() => {
        const fromParam = searchParams.get('from')
        const toParam = searchParams.get('to')

        setPriceFrom(fromParam ? Number(fromParam) : null)
        setPriceTo(toParam ? Number(toParam) : null)
    }, [searchParams])

    const handleApply = (from?: number, to?: number) => {
        setPriceFrom(from ?? null)
        setPriceTo(to ?? null)

        const params: Record<string, string> = {}
        if (from !== undefined) params.from = from.toString()
        if (to !== undefined) params.to = to.toString()

        setSearchParams(params)
    }

    return (
        <div className="flex w-full max-w-[1920px] flex-col items-center">
            <ProductsToolbar
                onApply={handleApply}
                priceFrom={priceFrom}
                priceTo={priceTo}
            />

            <ProductsList priceFrom={priceFrom} priceTo={priceTo} />
        </div>
    )
}
