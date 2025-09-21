import { SortArrow } from '@/pages/products/assets/sort-arrow'
import { FilterDropdown, type FilterDropdownProps } from './filter'

export const ProductsToolbar = ({ onApply }: FilterDropdownProps) => {
    return (
        <div className="flex w-[1920px] items-center justify-between pl-[100px] pr-24 pt-12 font-poppins">
            <h1 className="text-[42px] font-semibold text-gray-900">
                Products
            </h1>
            <div className="flex items-center gap-8">
                <p className="text-xs font-normal leading-[100%]">{`showing ${1}-${10} of ${100} results`}</p>
                <span className="text-neutral-200"> | </span>
                <FilterDropdown onApply={onApply} />
                <p className="flex items-center gap-1">
                    <span className="text-base font-normal leading-[100%] text-gray-900">
                        Sort by
                    </span>
                    <SortArrow />
                </p>
            </div>
        </div>
    )
}
