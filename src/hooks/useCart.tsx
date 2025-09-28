// src/hooks/useCart.ts
import { useAtom } from 'jotai'
import { useState, useEffect, useCallback } from 'react'
import {
    getCartItems,
    removeCartItem,
    updateCartItemQuantity,
} from '@/components/cart/components/cart-api'
import { cartAtom, cartOpenAtom } from '@/store/cart/cart'

export const useCart = () => {
    const [cartItems, setCartItems] = useAtom(cartAtom)
    const [loading, setLoading] = useState(false)
    const [isCartOpen, setIsCartOpen] = useAtom(cartOpenAtom)
    const getCart = useCallback(async () => {
        setLoading(true)
        try {
            const data = await getCartItems()
            setCartItems(data)
        } catch (err) {
            console.error('Failed to fetch cart:', err)
        } finally {
            setLoading(false)
        }
    }, [setCartItems])

    const updateQuantity = async (
        id: number,
        size: string,
        color: string,
        newQty: number,
    ) => {
        if (newQty < 1) return
        try {
            await updateCartItemQuantity(id, size, color, newQty)
            setCartItems((prev) =>
                prev.map((item) =>
                    item.id === id && item.size === size && item.color === color
                        ? { ...item, quantity: newQty }
                        : item,
                ),
            )
        } catch (err) {
            console.error('Failed to update quantity:', err)
        }
    }

    const removeItem = async (id: number, color: string, size: string) => {
        try {
            await removeCartItem(id, color, size)
            setCartItems((prev) =>
                prev.filter(
                    (item) =>
                        !(
                            item.id === id &&
                            item.color === color &&
                            item.size === size
                        ),
                ),
            )
        } catch (err) {
            console.error('Failed to remove item:', err)
        }
    }

    const clearCart = async () => {
        await Promise.all(
            cartItems.map((item) =>
                removeCartItem(item.id, item.color, item.size),
            ),
        )
        setCartItems([])
    }
    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
    )
    const delivery = cartItems.length > 0 ? 5 : 0
    const total = subtotal + delivery

    const refreshCart = () => {
        return getCart()
    }
    const openCart = () => setIsCartOpen(true)
    const closeCart = () => setIsCartOpen(false)

    useEffect(() => {
        getCart()
    }, [getCart])

    return {
        cartItems,
        setCartItems,
        loading,
        updateQuantity,
        removeItem,
        subtotal,
        delivery,
        total,
        refreshCart,
        isCartOpen,
        openCart,
        closeCart,
        clearCart,
    }
}
