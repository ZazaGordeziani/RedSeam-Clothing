import { useState, useRef, useEffect } from 'react'

export interface SortDropdownProps {
    onSelect?: (sortOption: string) => void
}

export const SortDropdown = ({ onSelect }: SortDropdownProps) => {
    const [open, setOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    // Close dropdown if clicked outside
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

    const handleSelect = (option: string) => {
        if (onSelect) onSelect(option)
        setOpen(false)
    }

    return (
        <div ref={containerRef} className="relative inline-block text-left">
            {/* Button label is always "Sort by" */}
            <button
                type="button"
                className="flex items-center gap-1 text-base font-normal text-gray-900"
                onClick={() => setOpen((prev) => !prev)}
            >
                Sort by
            </button>

            {open && (
                <div className="absolute right-0 z-50 mt-2 w-[200px] rounded border border-gray-200 bg-white p-4 shadow-lg">
                    <h2 className="mb-3 text-sm font-semibold text-gray-900">
                        Sort by
                    </h2>
                    <p
                        className="cursor-pointer py-1 text-sm hover:text-orange-600"
                        onClick={() => handleSelect('created_at')}
                    >
                        New products first
                    </p>
                    <p
                        className="cursor-pointer py-1 text-sm hover:text-orange-600"
                        onClick={() => handleSelect('price')}
                    >
                        Price, low to high
                    </p>
                    <p
                        className="cursor-pointer py-1 text-sm hover:text-orange-600"
                        onClick={() => handleSelect('-price')}
                    >
                        Price, high to low
                    </p>
                </div>
            )}
        </div>
    )
}
