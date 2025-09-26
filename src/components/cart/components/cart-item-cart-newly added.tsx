// src/components/cart/CartItemCard.tsx
import type { CartItemProps } from '@/components/cart/components/cart-types'
import { formatProductName } from '@/pages/products/utils/utils'

export const CartItemCard = ({
    item,
    updateQuantity,
    removeItem,
}: CartItemProps) => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex gap-4">
                <img
                    src={item.cover_image}
                    alt={item.name}
                    className="h-[134px] w-24 rounded border object-contain shadow"
                />
                <div className="flex flex-col gap-3 py-2">
                    <p className="text-sm font-medium">
                        {formatProductName(item.name)}
                    </p>
                    <p className="text-xs text-zinc-700">{item.color}</p>
                    <p className="text-xs text-zinc-700">{item.size}</p>
                    <div
                        style={{
                            border: '1px solid #E1DFE1',
                            borderRadius: '24px',
                            overflow: 'hidden',
                        }}
                        className="mt-1 flex h-[26px] w-[70px] items-center justify-between gap-2 px-2 py-1 text-xs text-zinc-700"
                    >
                        <button
                            onClick={() =>
                                updateQuantity(
                                    item.id,
                                    item.size,
                                    item.color,
                                    item.quantity - 1,
                                )
                            }
                            className="pl-2 disabled:text-gray-200"
                            disabled={item.quantity === 1}
                        >
                            -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                            onClick={() =>
                                updateQuantity(
                                    item.id,
                                    item.size,
                                    item.color,
                                    item.quantity + 1,
                                )
                            }
                            className="pr-2"
                        >
                            +
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex h-[120px] flex-col items-end justify-between">
                <p className="text-lg font-medium text-gray-900">
                    ${item.price * item.quantity}
                </p>
                <button
                    onClick={() => removeItem(item.id, item.color, item.size)}
                    className="pb-2 text-xs text-zinc-700"
                >
                    Remove
                </button>
            </div>
        </div>
    )
}
