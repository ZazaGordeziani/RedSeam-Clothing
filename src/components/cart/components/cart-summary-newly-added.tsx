// src/components/cart/CartSummary.tsx
import { useNavigate } from 'react-router-dom'

interface Props {
    subtotal: number
    delivery: number
    total: number
    onClose?: () => void
    showCheckoutButton?: boolean
}

export const CartSummary = ({
    subtotal,
    delivery,
    total,
    onClose,
    showCheckoutButton = true,
}: Props) => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col gap-4 border-t p-4 font-poppins text-base font-normal text-zinc-700">
            <div className="flex justify-between">
                <span>Items subtotal</span>
                <span>${subtotal}</span>
            </div>
            <div className="flex justify-between">
                <span>Delivery</span>
                <span>${delivery}</span>
            </div>
            <div className="flex justify-between text-xl font-medium text-gray-900">
                <span>Total</span>
                <span>${total}</span>
            </div>
            {showCheckoutButton && (
                <button
                    onClick={() => {
                        navigate('/checkout')
                        onClose?.()
                    }}
                    className="mb-2 mt-32 w-full rounded-[10px] bg-orange-600 py-4 text-lg font-medium text-white"
                >
                    Go to checkout
                </button>
            )}
        </div>
    )
}
