import { SortArrow } from '@/pages/products/components/assets/sort-arrow'
import { useState, useRef, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export interface SortDropdownProps {
    onSelect?: (sortOption: string) => void
    isOpen?: boolean
    onToggle?: () => void
}

const sortOptions: Record<string, string> = {
    created_at: 'New products first',
    price: 'Price, low to high',
    '-price': 'Price, high to low',
}

export const SortDropdown = ({
    onSelect,
    isOpen,
    onToggle,
}: SortDropdownProps) => {
    const [selectedLabel, setSelectedLabel] = useState<string>('Sort by')
    const containerRef = useRef<HTMLDivElement>(null)

    const [searchParams] = useSearchParams()

    useEffect(() => {
        const sortParam = searchParams.get('sort')
        if (sortParam && sortOptions[sortParam]) {
            setSelectedLabel(sortOptions[sortParam])
        } else {
            setSelectedLabel('Sort by')
        }
    }, [searchParams, onSelect])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                if (isOpen && onToggle) onToggle()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () =>
            document.removeEventListener('mousedown', handleClickOutside)
    }, [isOpen, onToggle])

    const handleSelect = (option: string, label: string) => {
        setSelectedLabel(label)
        if (onSelect) onSelect(option)
        if (onToggle) onToggle()
    }

    return (
        <div ref={containerRef} className="relative inline-block text-left">
            <button
                type="button"
                className="flex items-center gap-1 text-base font-normal text-gray-900"
                onClick={onToggle}
            >
                {selectedLabel}
                <SortArrow />
            </button>

            {isOpen && (
                <div className="absolute left-[-118px] z-50 mt-2 flex w-[200px] flex-col gap-2 rounded border border-gray-200 bg-white p-4 font-poppins leading-[100%] text-gray-900 shadow-lg">
                    <h2 className="text-base font-semibold">Sort by</h2>
                    <p
                        className="cursor-pointer text-base font-normal"
                        onClick={() =>
                            handleSelect('created_at', 'New products first')
                        }
                    >
                        New products first
                    </p>
                    <p
                        className="cursor-pointer text-base font-normal"
                        onClick={() =>
                            handleSelect('price', 'Price, low to high')
                        }
                    >
                        Price, low to high
                    </p>
                    <p
                        className="cursor-pointer text-base font-normal"
                        onClick={() =>
                            handleSelect('-price', 'Price, high to low')
                        }
                    >
                        Price, high to low
                    </p>
                </div>
            )}
        </div>
    )
}
