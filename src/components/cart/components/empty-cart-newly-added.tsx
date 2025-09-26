// src/components/cart/EmptyCart.tsx
import EmtpyCartLogo from './assets/empty-cart-logo'
import { useNavigate } from 'react-router-dom'

export const EmptyCart = ({ onClose }: { onClose?: () => void }) => {
    const navigate = useNavigate()
    return (
        <div className="mt-14 flex flex-col items-center gap-4 text-center">
            <EmtpyCartLogo />
            <div className="mt-4 flex flex-col gap-4">
                <p className="text-2xl font-semibold text-gray-900">Ooops!</p>
                <p className="text-zinc-700">
                    You've got nothing in your cart just yet...
                </p>
            </div>
            <button
                onClick={() => {
                    navigate('/')
                    onClose?.()
                }}
                className="mt-12 rounded-[10px] bg-orange-600 px-[68px] py-[10px] text-sm font-medium text-white"
            >
                Start shopping
            </button>
        </div>
    )
}
