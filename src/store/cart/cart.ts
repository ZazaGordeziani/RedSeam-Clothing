import { atom } from 'jotai'
import type { CartItem } from '@/components/cart/components/cart-types'

export const cartAtom = atom<CartItem[]>([])
export const cartOpenAtom = atom(false)
