import { ProductsList } from '@/pages/products/components/products-list'
import { ProductsToolbar } from '@/pages/products/components/products-toolbar'

export const Products = () => {
    return (
        <div className="flex w-full max-w-[1920px] flex-col items-center">
            <ProductsToolbar />
            <ProductsList />
        </div>
    )
}
