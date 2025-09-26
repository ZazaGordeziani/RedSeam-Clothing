import { FilterDropdown } from './filter'
import { SortDropdown } from '@/pages/products/components/sort'
import type { ProductsToolbarProps } from '@/pages/products/components/utils'
import { CloseSign } from '@/pages/products/components/assets/close-sign'
import { useState } from 'react'

export const ProductsToolbar = ({
    priceFrom,
    priceTo,
    onApplyFilter,
    onApplySort,
    resultsRange,
}: ProductsToolbarProps) => {
    const [isSortOpen, setIsSortOpen] = useState(false)
    const toggleSort = () => setIsSortOpen((prev) => !prev)

    const handleClearFilter = () => {
        if (onApplyFilter) {
            onApplyFilter(undefined, undefined)
        }
    }
    const isFilterApplied = priceFrom !== null || priceTo !== null

    return (
        <div className="w-full max-w-[1920px]">
            <div className="mx-auto flex items-center justify-between pl-[100px] pr-24 pt-12 font-poppins">
                <h1 className="text-[42px] font-semibold text-gray-900">
                    Products
                </h1>
                <div className="flex items-center gap-8">
                    <p className="text-xs font-normal leading-[100%]">
                        {resultsRange
                            ? `showing ${resultsRange.start}-${resultsRange.end} of ${resultsRange.total} results`
                            : 'loading...'}
                    </p>
                    <span className="text-neutral-200"> | </span>

                    <FilterDropdown
                        priceFrom={priceFrom}
                        priceTo={priceTo}
                        onApply={onApplyFilter}
                    />

                    <div className="relative flex items-center gap-1">
                        <SortDropdown
                            onSelect={onApplySort}
                            isOpen={isSortOpen}
                            onToggle={toggleSort}
                        />
                    </div>
                </div>
            </div>
            {isFilterApplied && (
                <div
                    style={{
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: '#E1DFE1',
                        borderRadius: '50px',
                        color: '#3E424A',
                    }}
                    className="mb-2 ml-24 mt-5 inline-flex items-center justify-center gap-[6px] rounded-[50px] py-2 pl-4 pr-[10px] font-poppins text-sm font-normal"
                >
                    <p className="">
                        Price: {priceFrom !== null ? `$${priceFrom}` : 'min'} -{' '}
                        {priceTo !== null ? `$${priceTo}` : 'max'}
                    </p>
                    <button
                        onClick={handleClearFilter}
                        className="font-poppins"
                    >
                        <CloseSign />
                    </button>
                </div>
            )}
        </div>
    )
}
