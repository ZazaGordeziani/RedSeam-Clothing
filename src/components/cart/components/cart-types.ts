export interface CartItem {
    id: number
    name: string
    price: number
    quantity: number
    color: string
    size: string
    cover_image: string
}

export interface CartProps {
    isOpen: boolean
    onClose: () => void
}

export interface CartItemProps {
    item: CartItem
    updateQuantity: (
        id: number,
        size: string,
        color: string,
        newQty: number,
    ) => void
    removeItem: (id: number, color: string, size: string) => void
}
