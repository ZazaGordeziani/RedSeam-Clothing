import { httpClient } from '@/api'

export const addToCart = async (
    productId: number,
    color: string,
    size: string,
    quantity: number,
) => {
    const token = localStorage.getItem('token')

    // const cartItemId = `${productId}-${color}-${size}`
    // console.log('Generated cartItemId:', cartItemId)
    const response = await httpClient.post(
        `/cart/products/${productId}`,
        { color, size, quantity },
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

export const getCartItems = async () => {
    const token = localStorage.getItem('token')
    if (!token) return []
    const res = await httpClient.get('/cart', {
        headers: { Authorization: `Bearer ${token}` },
    })
    return res.data || []
}
