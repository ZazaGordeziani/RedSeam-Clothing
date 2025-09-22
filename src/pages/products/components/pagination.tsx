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

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    return (
        <div className="mt-6 flex gap-2">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="rounded border px-3 py-1 disabled:opacity-50"
            >
                Prev
            </button>

            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`rounded border px-3 py-1 ${
                        page === currentPage ? 'bg-blue-500 text-white' : ''
                    }`}
                >
                    {page}
                </button>
            ))}

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="rounded border px-3 py-1 disabled:opacity-50"
            >
                Next
            </button>
        </div>
    )
}
