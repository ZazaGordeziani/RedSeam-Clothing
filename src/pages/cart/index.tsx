import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { httpClient } from '@/api'
import { CloseSign } from '@/assets/clolse-sign'
import { formatProductName } from '@/pages/products/utils/utils'
import EmtpyCartLogo from '@/pages/cart/components/assets/empty-cart-logo'
import { useNavigate } from 'react-router-dom'
import { BounceLoader } from 'react-spinners'

interface CartItem {
    id: number
    name: string
    price: number
    quantity: number
    color: string
    size: string
    cover_image: string
}

interface CartProps {
    isOpen: boolean
    onClose: () => void
}

export const Cart = ({ isOpen, onClose }: CartProps) => {
    const navigate = useNavigate()

    const [items, setItems] = useState<CartItem[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (isOpen) {
            const getCart = async () => {
                try {
                    setLoading(true)
                    const res = await httpClient.get('/cart')
                    setItems(res.data || [])
                    console.log(res.data)
                } catch (err) {
                    console.error('Failed to fetch cart:', err)
                } finally {
                    setLoading(false)
                }
            }
            getCart()
        }
    }, [isOpen])

    const removeItem = async (id: number) => {
        try {
            await httpClient.delete(`/cart/products/${id}`)
            setItems((prev) => prev.filter((item) => item.id !== id))
        } catch (err) {
            console.error('Failed to remove item:', err)
        }
    }

    const updateQuantity = async (id: number, newQty: number) => {
        if (newQty < 1) return
        try {
            await httpClient.patch(`/cart/products/${id}`, { quantity: newQty })
            setItems((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, quantity: newQty } : item,
                ),
            )
        } catch (err) {
            console.error('Failed to update quantity:', err)
        }
    }

    const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    )
    const delivery = items.length > 0 ? 5 : 0
    const total = subtotal + delivery

    const totalQuantity = items.reduce(
        (total, item) => total + item.quantity,
        0,
    )

    if (!isOpen) return null

    return createPortal(
        <div className="fixed inset-0 z-50 flex">
            <div className="fixed inset-0 bg-black/40" onClick={onClose} />

            <div
                className={`fixed inset-y-0 right-0 z-50 flex w-[540px] transform flex-col bg-white shadow-lg transition-transform duration-300 ${
                    isOpen
                        ? 'translate-x-0 bg-white p-4 pr-6 font-poppins text-gray-900'
                        : 'translate-x-full'
                }`}
            >
                <div className="mb-8 flex items-center justify-between p-4">
                    <h1 className="mt-2 text-xl font-medium">
                        Shopping Cart ({totalQuantity})
                    </h1>
                    <button onClick={onClose}>
                        <CloseSign />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {loading ? (
                        <div className="flex h-full w-full items-center justify-center">
                            <BounceLoader color="#FF7F00" />
                        </div>
                    ) : items.length === 0 ? (
                        <div className="mt-14 flex flex-col items-center gap-4 text-center">
                            <EmtpyCartLogo />
                            <div className="mt-4 flex flex-col gap-4">
                                <p className="text-2xl font-semibold text-gray-900">
                                    Oops!
                                </p>
                                <p className="text-zinc-700">
                                    You've got nothing in your cart just yet...
                                </p>
                            </div>
                            <button
                                onClick={() => {
                                    navigate('/')
                                    onClose()
                                }}
                                className="mt-12 rounded-[10px] bg-orange-600 px-[68px] py-[10px] text-sm font-medium text-white"
                            >
                                Start shopping
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-8">
                            {items.map((item) => (
                                <div
                                    key={`${item.id}-${item.color}-${item.size}`}
                                    className="flex items-center justify-between"
                                >
                                    <div className="flex gap-4">
                                        <img
                                            src={item.cover_image}
                                            alt={item.name}
                                            className="h-[134px] w-24 rounded border object-contain shadow"
                                        />
                                        <div className="flex flex-col gap-3 py-2">
                                            <p className="text-sm font-medium">
                                                {formatProductName(item.name)}
                                            </p>
                                            <p className="text-xs text-zinc-700">
                                                {item.color}
                                            </p>
                                            <p className="text-xs text-zinc-700">
                                                {item.size}
                                            </p>
                                            <div
                                                style={{
                                                    border: '1px solid #E1DFE1',
                                                    borderRadius: '24px',
                                                    overflow: 'hidden',
                                                }}
                                                className="mt-1 flex h-[26px] w-[70px] items-center justify-between gap-2 px-2 py-1 text-xs text-zinc-700"
                                            >
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.id,
                                                            item.quantity - 1,
                                                        )
                                                    }
                                                    className="pl-2 disabled:text-gray-200"
                                                    disabled={
                                                        item.quantity === 1
                                                    }
                                                >
                                                    -
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.id,
                                                            item.quantity + 1,
                                                        )
                                                    }
                                                    className="pr-2"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex h-[120px] flex-col items-end justify-between">
                                        <p className="text-lg font-medium text-gray-900">
                                            ${item.price * item.quantity}
                                        </p>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="pb-2 text-xs text-zinc-700"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="flex flex-col gap-4 border-t p-4 font-poppins text-base font-normal">
                        <div className="flex justify-between">
                            <span>Items subtotal</span>
                            <span>${subtotal}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Delivery</span>
                            <span>${delivery}</span>
                        </div>
                        <div className="flex justify-between text-xl font-medium">
                            <span>Total</span>
                            <span>${total}</span>
                        </div>
                        <button className="mb-2 mt-32 w-full rounded-[10px] bg-orange-600 py-4 text-lg font-medium text-white">
                            Go to checkout
                        </button>
                    </div>
                )}
            </div>
        </div>,
        document.body,
    )
}
