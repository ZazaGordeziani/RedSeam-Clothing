import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { httpClient } from '@/api'

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
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex items-center justify-between border-b p-4">
                    <h1 className="text-xl font-semibold">
                        Shopping Cart ({totalQuantity})
                    </h1>
                    <button onClick={onClose} className="text-2xl font-bold">
                        ×
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {loading ? (
                        <p>Loading...</p>
                    ) : items.length === 0 ? (
                        <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                            <p className="text-lg font-semibold">Oops</p>
                            <p className="text-gray-600">
                                You&apos;ve got nothing in your cart just yet
                            </p>
                            <button
                                onClick={onClose}
                                className="rounded bg-orange-600 px-6 py-2 font-medium text-white"
                            >
                                Start shopping
                            </button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between border-b py-4"
                            >
                                <div className="flex gap-4">
                                    <img
                                        src={item.cover_image}
                                        alt={item.name}
                                        className="h-20 w-20 rounded border object-contain"
                                    />
                                    <div className="flex flex-col">
                                        <p className="font-medium">
                                            {item.name}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Color: {item.color}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Size: {item.size}
                                        </p>
                                        <div className="mt-2 flex items-center gap-2">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.id,
                                                        item.quantity - 1,
                                                    )
                                                }
                                                className="rounded border px-2 py-1 disabled:bg-gray-200"
                                                disabled={item.quantity === 1}
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
                                                className="rounded border px-2 py-1"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end">
                                    <p className="font-medium">
                                        ${item.price * item.quantity}
                                    </p>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="mt-2 text-sm text-red-500"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="space-y-2 border-t p-4">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${subtotal}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Delivery</span>
                            <span>${delivery}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                            <span>Total</span>
                            <span>${total}</span>
                        </div>
                        <button className="mt-4 w-full rounded bg-orange-600 py-3 font-medium text-white">
                            Go to checkout
                        </button>
                    </div>
                )}
            </div>
        </div>,
        document.body,
    )
}
