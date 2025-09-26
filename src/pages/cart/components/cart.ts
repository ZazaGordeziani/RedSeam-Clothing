// import { httpClient } from '@/api'

// export const addToCart = async (
//     productId: number,
//     color: string,
//     size: string,
//     quantity: number,
// ) => {
//     const token = localStorage.getItem('token')

//     // const cartItemId = `${productId}-${color}-${size}`
//     // console.log('Generated cartItemId:', cartItemId)
//     const response = await httpClient.post(
//         `/cart/products/${productId}`,
//         { color, size, quantity },
//         {
//             headers: token ? { Authorization: `Bearer ${token}` } : {},
//         },
//     )

//     return response.data
// }
