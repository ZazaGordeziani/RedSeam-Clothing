// src/pages/checkout/components/Checkout.tsx
import { useState } from 'react'

import { useCart } from '@/hooks/useCart'
import { CartItemCard } from '@/components/cart/components/cart-item-cart-newly added'
import { CartSummary } from '@/components/cart/components/cart-summary-newly-added'

export const CheckOut = () => {
    const { cartItems, updateQuantity, removeItem, subtotal, delivery, total } =
        useCart()

    const [form, setForm] = useState({
        name: '',
        surname: '',
        email: localStorage.getItem('email') || '',
        address: '',
        zip: '',
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    const handlePay = () => {
        console.log('Payment details:', form, cartItems)
        alert('Payment processing...')
    }

    return (
        <div className="flex flex-col gap-8 p-8 md:flex-row">
            <div className="flex w-full flex-col gap-6 md:w-2/3">
                <h2 className="text-2xl font-semibold text-gray-900">
                    Checkout
                </h2>
                <div className="flex flex-row gap-4">
                    <div className="flex flex-1 flex-col gap-2">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={form.name}
                            onChange={handleInputChange}
                            className="w-full rounded border p-2"
                        />
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                        <input
                            type="text"
                            name="surname"
                            placeholder="Surname"
                            value={form.surname}
                            onChange={handleInputChange}
                            className="w-full rounded border p-2"
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        readOnly
                        className="w-full rounded border bg-gray-100 p-2"
                    />
                </div>
                ={' '}
                <div className="flex flex-row gap-4">
                    <div className="flex flex-1 flex-col gap-2">
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={form.address}
                            onChange={handleInputChange}
                            className="w-full rounded border p-2"
                        />
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                        <label className="text-sm font-medium">Zip Code</label>
                        <input
                            type="text"
                            name="zip"
                            placeholder="Zip Code"
                            value={form.zip}
                            onChange={handleInputChange}
                            className="w-full rounded border p-2"
                        />
                    </div>
                </div>
            </div>

            <div className="flex w-full flex-col gap-4 md:w-1/3">
                <h2 className="text-2xl font-semibold text-gray-900">
                    Order Summary
                </h2>
                <div className="flex flex-col gap-4">
                    {cartItems.map((item) => (
                        <CartItemCard
                            key={`${item.id}-${item.color}-${item.size}`}
                            item={item}
                            updateQuantity={updateQuantity}
                            removeItem={removeItem}
                        />
                    ))}
                </div>

                <CartSummary
                    subtotal={subtotal}
                    delivery={delivery}
                    total={total}
                    showCheckoutButton={false}
                />

                <button
                    onClick={handlePay}
                    className="mt-4 w-full rounded-[10px] bg-orange-600 py-4 text-lg font-medium text-white"
                >
                    Pay
                </button>
            </div>
        </div>
    )
}
