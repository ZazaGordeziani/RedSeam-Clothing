import { useState, useRef, useEffect } from 'react'
import { FilterIcon } from '@/pages/products/assets/filter-icon'
import { InputAsterisk } from '@/components/ui/asterisk'

export interface FilterDropdownProps {
    onApply?: (from?: number, to?: number) => void
}

export const FilterDropdown = ({ onApply }: FilterDropdownProps) => {
    const [open, setOpen] = useState(false)
    const [fromValue, setFromValue] = useState('')
    const [toValue, setToValue] = useState('')
    const [error, setError] = useState('')
    const containerRef = useRef<HTMLDivElement>(null)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')

        const fromNumber = Number(fromValue)
        const toNumber = Number(toValue)

        //check if number is negative and display error
        if ((fromValue && fromNumber < 0) || (toValue && toNumber < 0)) {
            setError('Negative numbers are not allowed')
            return
        }

        // check if starting price is higher than end price and display error
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
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [])

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
                                <InputAsterisk
                                    visible={!fromValue}
                                    className="left-[48px] top-1"
                                />
                            </div>
                            <div className="relative">
                                <input
                                    type="number"
                                    placeholder="To"
                                    className="[&-moz-appearance]:textfield w-full appearance-none rounded border px-2 py-1 text-sm [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                    value={toValue}
                                    onChange={(e) => setToValue(e.target.value)}
                                />
                                <InputAsterisk
                                    visible={!toValue}
                                    className="left-[30px] top-1"
                                />
                            </div>
                        </div>

                        {/* Error message */}
                        {error && (
                            <p className="text-sm text-red-600">{error}</p>
                        )}

                        {/* Apply button */}
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
