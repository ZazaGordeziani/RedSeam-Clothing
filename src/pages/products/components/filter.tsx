import { useState, useRef } from 'react'
import { FilterIcon } from '@/pages/products/assets/filter-icon'

export interface FilterDropdownProps {
    onApply?: (from?: number, to?: number) => void
}

export const FilterDropdown = ({ onApply }: FilterDropdownProps) => {
    const [open, setOpen] = useState(false)
    const [fromValue, setFromValue] = useState<number>()
    const [toValue, setToValue] = useState<number>()
    const formRef = useRef<HTMLFormElement>(null)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() // Prevent page reload
        if (onApply) onApply(fromValue, toValue) // Trigger parent filter
        // setOpen(false) // Close dropdown
    }

    return (
        <div
            className="relative inline-block text-left"
            onBlur={() => setOpen(false)}
        >
            {/* Toggle dropdown */}
            <button
                type="button"
                className="flex items-center gap-2 text-base font-normal text-gray-900"
                onClick={() => setOpen((prev) => !prev)}
            >
                <FilterIcon />
                <p>Filter</p>
            </button>

            {open && (
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    style={{ border: '1px solid #E1DFE1', borderRadius: '8px' }}
                    className="absolute right-0 z-50 mt-2 w-[392px] bg-white p-4"
                >
                    <p className="mb-5 mt-1 h-6 font-poppins font-semibold leading-[100%] text-gray-900">
                        Select price
                    </p>

                    <div className="flex flex-col gap-[10px]">
                        <div className="flex gap-[10px]">
                            <input
                                type="number"
                                placeholder="From"
                                className="w-full rounded border px-2 py-1 text-sm"
                                value={fromValue ?? ''}
                                onChange={(e) =>
                                    setFromValue(Number(e.target.value))
                                }
                            />
                            <input
                                type="number"
                                placeholder="To"
                                className="w-full rounded border px-2 py-1 text-sm"
                                value={toValue ?? ''}
                                onChange={(e) =>
                                    setToValue(Number(e.target.value))
                                }
                            />
                        </div>{' '}
                        <button
                            type="submit"
                            className="ml-auto w-[124px] rounded-[10px] bg-orange-600 px-[20px] py-[10px] font-poppins text-sm font-normal text-white"
                        >
                            Apply
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
}
