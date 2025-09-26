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
