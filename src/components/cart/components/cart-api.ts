import { httpClient } from '@/api'
import {
    CartItem,
    CartItemFromBackend,
} from '@/components/cart/components/cart-types'

export const addToCart = async (
    productId: number,
    color: string,
    size: string,
    quantity: number,
    chosenImage: string,
) => {
    const token = localStorage.getItem('token')

    // const cartItemId = `${productId}-${color}-${size}`
    // console.log('Generated cartItemId:', cartItemId)
    const response = await httpClient.post(
        `/cart/products/${productId}`,
        { color, size, quantity, cover_image: chosenImage },
        {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        },
    )

    return response.data
}

export const removeCartItem = async (
    id: number,
    color: string,
    size: string,
) => {
    return httpClient.delete(`/cart/products/${id}`, {
        data: { color, size },
    })
}

export const updateCartItemQuantity = async (
    id: number,
    size: string,
    color: string,
    newQty: number,
) => {
    return httpClient.patch(`/cart/products/${id}`, {
        size,
        color,
        quantity: newQty,
    })
}

export const getCartItems = async (): Promise<CartItem[]> => {
    const token = localStorage.getItem('token')
    if (!token) return []

    const res = await httpClient.get<CartItemFromBackend[]>('/cart', {
        headers: { Authorization: `Bearer ${token}` },
    })

    const cartItemsFromBackend = res.data || []

    const cartItems: CartItem[] = cartItemsFromBackend.map((item) => {
        const colorIndex = item.available_colors.indexOf(item.color)
        const displayImage =
            colorIndex >= 0 ? item.images[colorIndex] : item.cover_image

        return {
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            color: item.color,
            size: item.size,
            cover_image: item.cover_image,
            displayImage,
        }
    })

    return cartItems
}
