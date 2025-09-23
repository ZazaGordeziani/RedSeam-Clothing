import { LeftArrow } from '@/pages/products/components/assets/left-arrow-svg'
import { RightArrow } from '@/pages/products/components/assets/right-arrow-svg'

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) => {
    if (totalPages <= 1) return null

    const candidateSet = new Set<number>()

    candidateSet.add(1)
    if (totalPages >= 2) candidateSet.add(2)

    if (totalPages - 1 > 2) candidateSet.add(totalPages - 1)
    candidateSet.add(totalPages)

    if (currentPage - 1 > 2) candidateSet.add(currentPage - 1)
    if (currentPage > 2 && currentPage < totalPages - 1)
        candidateSet.add(currentPage)
    if (currentPage + 1 < totalPages - 1) candidateSet.add(currentPage + 1)

    const sortedPages = Array.from(candidateSet).sort((a, b) => a - b)

    const pages: (number | string)[] = []
    for (let i = 0; i < sortedPages.length; i++) {
        pages.push(sortedPages[i])
        if (
            i < sortedPages.length - 1 &&
            sortedPages[i + 1] - sortedPages[i] > 1
        ) {
            pages.push('...')
        }
    }
    const handlePageChange = (page: number) => {
        onPageChange(page)
        window.scrollTo({ top: 0, behavior: 'auto' })
    }

    return (
        <div className="mb-48 mt-20 flex gap-2">
            <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="disabled:opacity-50"
            >
                <LeftArrow />
            </button>

            {pages.map((page, index) =>
                page === '...' ? (
                    <p
                        key={`gap-${index}`}
                        style={{
                            border: '1px solid #F8F6F7',
                            borderRadius: '0.25rem',
                        }}
                        className="inline-flex h-8 w-8 flex-none items-center justify-center font-poppins"
                    >
                        ...
                    </p>
                ) : (
                    <button
                        key={`page-${page}-${index}`}
                        onClick={() => handlePageChange(Number(page))}
                        className={`h-8 w-8 rounded border font-poppins text-sm font-medium leading-[100%] ${
                            page === currentPage
                                ? 'rounded border border-orange-600 text-orange-600'
                                : 'border-neutral-100 text-gray-800'
                        }`}
                    >
                        {page}
                    </button>
                ),
            )}

            <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="disabled:opacity-50"
            >
                <RightArrow />
            </button>
        </div>
    )
}
