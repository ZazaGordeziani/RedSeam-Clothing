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
            className={`pointer-events-none absolute font-poppins text-sm font-normal text-orange-600 ${className}`}
        >
            *
        </span>
    )
}
