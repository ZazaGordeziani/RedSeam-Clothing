import { SortArrow } from '@/pages/products/assets/sort-arrow'
import { FilterDropdown } from './filter'
import { SortDropdown } from '@/pages/products/components/sort'
import type { ProductsToolbarProps } from '@/pages/products/components/utils'

export const ProductsToolbar = ({
    priceFrom,
    priceTo,

    onApplyFilter,
    onApplySort,
}: ProductsToolbarProps) => {
    return (
        <div className="mx-auto flex w-full max-w-[1920px] items-center justify-between pl-[100px] pr-24 pt-12 font-poppins">
            <h1 className="text-[42px] font-semibold text-gray-900">
                Products
            </h1>
            <div className="flex items-center gap-8">
                <p className="text-xs font-normal leading-[100%]">{`showing ${1}-${10} of ${100} results`}</p>
                <span className="text-neutral-200"> | </span>

                <FilterDropdown
                    priceFrom={priceFrom}
                    priceTo={priceTo}
                    onApply={onApplyFilter}
                />

                <div className="relative flex items-center gap-1">
                    <SortDropdown onSelect={onApplySort} />
                    <SortArrow />
                </div>
            </div>
        </div>
    )
}
