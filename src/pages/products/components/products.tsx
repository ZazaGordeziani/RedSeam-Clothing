console.log('Products page loaded') // <-- this runs when the module loads
import { useState } from 'react'
import { ProductsList } from '@/pages/products/components/products-list'
import { ProductsToolbar } from '@/pages/products/components/products-toolbar'

export const Products = () => {
    const [priceFrom, setPriceFrom] = useState<number | null>(null)
    const [priceTo, setPriceTo] = useState<number | null>(null)

    return (
        <div className="flex w-full max-w-[1920px] flex-col items-center">
            <ProductsToolbar
                onApply={(from, to) => {
                    setPriceFrom(from ?? null)
                    setPriceTo(to ?? null)
                }}
            />
            <ProductsList priceFrom={priceFrom} priceTo={priceTo} />
        </div>
    )
}
