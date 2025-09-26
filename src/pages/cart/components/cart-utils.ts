// // src/pages/cart/utils/cart.utils.ts
// import { httpClient } from '@/api'

// export const removeCartItem = async (
//     id: number,
//     color: string,
//     size: string,
// ) => {
//     return httpClient.delete(`/cart/products/${id}`, {
//         data: { color, size },
//     })
// }

// export const updateCartItemQuantity = async (
//     id: number,
//     size: string,
//     color: string,
//     newQty: number,
// ) => {
//     return httpClient.patch(`/cart/products/${id}`, {
//         size,
//         color,
//         quantity: newQty,
//     })
// }
