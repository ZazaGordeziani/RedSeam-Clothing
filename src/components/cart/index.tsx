// src/components/cart/Cart.tsx
import { createPortal } from 'react-dom'
import { CloseSign } from '@/assets/clolse-sign'

import { EmptyCart } from '@/components/cart/components/empty-cart-newly-added'
import { useCart } from '@/hooks/useCart'
// import type { CartProps } from '@/components/cart/components/cart-types'
import { BounceLoader } from 'react-spinners'
import { CartItemCard } from '@/components/cart/components/cart-item-cart-newly added'
import { CartSummary } from '@/components/cart/components/cart-summary-newly-added'

export const Cart = () => {
    const {
        cartItems,
        loading,
        updateQuantity,
        removeItem,
        subtotal,
        delivery,
        total,
        isCartOpen,
        closeCart,
    } = useCart()
    const totalQuantity = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0,
    )

    if (!isCartOpen) return null

    return createPortal(
        <div className="fixed inset-0 z-50 flex">
            <div className="fixed inset-0 bg-black/40" onClick={closeCart} />

            <div
                className={`fixed inset-y-0 right-0 z-50 flex w-[540px] transform flex-col bg-white shadow-lg transition-transform duration-300 ${
                    isCartOpen
                        ? 'translate-x-0 p-4 pr-6 font-poppins text-gray-900'
                        : 'translate-x-full'
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-8 flex items-center justify-between p-4">
                    <h1 className="text-xl font-medium">
                        Shopping Cart ({totalQuantity})
                    </h1>
                    <button onClick={closeCart}>
                        <CloseSign />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {loading ? (
                        <div className="flex h-full w-full items-center justify-center">
                            <BounceLoader color="#FF7F00" />
                        </div>
                    ) : cartItems.length === 0 ? (
                        <EmptyCart onClose={closeCart} />
                    ) : (
                        <div className="flex flex-col gap-8">
                            {cartItems.map((item) => (
                                <CartItemCard
                                    key={`${item.id}-${item.color}-${item.size}`}
                                    item={item}
                                    updateQuantity={updateQuantity}
                                    removeItem={removeItem}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {cartItems.length > 0 && (
                    <CartSummary
                        className="p-4"
                        subtotal={subtotal}
                        delivery={delivery}
                        total={total}
                        onClose={closeCart}
                    />
                )}
            </div>
        </div>,
        document.body,
    )
}
