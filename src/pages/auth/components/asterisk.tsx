interface InputAsteriskProps {
    visible: boolean
    className?: string
}

export const InputAsterisk = ({
    visible,
    className = '',
}: InputAsteriskProps) => {
    if (!visible) return null
    return (
        <span
            className={`pointer-events-none absolute top-2 font-poppins text-sm font-normal text-orange-600 ${className}`}
        >
            *
        </span>
    )
}
