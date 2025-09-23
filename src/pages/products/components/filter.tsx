import { useState, useRef, useEffect } from 'react'
import { FilterIcon } from '@/pages/products/components/assets/filter-icon'
import { useSearchParams } from 'react-router-dom'
import type { FilterDropdownProps } from '@/pages/products/components/utils'

export const FilterDropdown = ({
    onApply,
    priceFrom,
    priceTo,
}: FilterDropdownProps) => {
    const [open, setOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const [searchParams] = useSearchParams()

    const initialFrom =
        priceFrom?.toString() || searchParams.get('filter[price_from]') || ''

    const initialTo =
        priceTo?.toString() || searchParams.get('filter[price_to]') || ''
    const [fromValue, setFromValue] = useState(initialFrom)
    const [toValue, setToValue] = useState(initialTo)

    const [error, setError] = useState('')

    useEffect(() => {
        setFromValue(priceFrom?.toString() ?? '')
        setToValue(priceTo?.toString() ?? '')
    }, [priceFrom, priceTo])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')
        setOpen(false)

        const fromNumber = Number(fromValue)
        const toNumber = Number(toValue)

        if ((fromValue && fromNumber < 0) || (toValue && toNumber < 0)) {
            setError('Negative numbers are not allowed')
            return
        }
        if (fromValue && toValue && fromNumber > toNumber) {
            setError('From value should be less than To value')
            return
        }

        if (onApply)
            onApply(
                fromValue ? fromNumber : undefined,
                toValue ? toNumber : undefined,
            )
    }

    return (
        <div ref={containerRef} className="relative inline-block text-left">
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
                    onSubmit={handleSubmit}
                    style={{ border: '1px solid #E1DFE1', borderRadius: '8px' }}
                    className="absolute right-0 z-50 mt-2 w-[392px] bg-white p-4"
                >
                    <p className="mb-5 mt-1 h-6 font-poppins font-semibold leading-[100%] text-gray-900">
                        Select price
                    </p>

                    <div className="flex flex-col gap-[10px]">
                        <div className="flex gap-[10px]">
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="From"
                                    className="[&-moz-appearance]:textfield w-full appearance-none rounded border px-2 py-1 text-sm [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                    value={fromValue}
                                    onChange={(e) =>
                                        setFromValue(e.target.value)
                                    }
                                />
                                {/* <InputAsterisk
                                    visible={!fromValue}
                                    className="left-[48px] top-1"
                                /> */}
                            </div>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="To"
                                    className="[&-moz-appearance]:textfield w-full appearance-none rounded border px-2 py-1 text-sm [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                    value={toValue}
                                    onChange={(e) => setToValue(e.target.value)}
                                />
                                {/* <InputAsterisk
                                    visible={!toValue}
                                    className="left-[30px] top-1"
                                /> */}
                            </div>
                        </div>

                        {error && (
                            <p className="text-sm text-red-600">{error}</p>
                        )}

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
