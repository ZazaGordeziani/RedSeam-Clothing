// src/pages/checkout/components/Checkout.tsx
import { useCart } from '@/hooks/useCart'
import { CartItemCard } from '@/components/cart/components/cart-item-cart-newly added'
import { CartSummary } from '@/components/cart/components/cart-summary-newly-added'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import type { z } from 'zod'
import { CheckoutFormSchema } from '@/pages/checkout/components/checkout-form-schema'
import { useState } from 'react'
import { EmailLogo } from '@/pages/checkout/components/assets/email-logo'
import EmtpyCartLogo from '@/components/cart/components/assets/empty-cart-logo'
import CongratsModal from '@/components/base/congrats/components/assets/congrats-modal'

type CheckoutFormValues = z.infer<typeof CheckoutFormSchema>

export const CheckOut = () => {
    const [isFocused, setIsFocused] = useState<string | null>(null)
    const [showCongrats, setShowCongrats] = useState(false)

    const { cartItems, updateQuantity, removeItem, subtotal, delivery, total } =
        useCart()

    const checkoutInputStyles =
        'checkout-input w-full rounded-lg border px-3 py-2 transition-colors focus:outline-none focus:ring-0'

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<CheckoutFormValues>({
        resolver: zodResolver(CheckoutFormSchema),
        defaultValues: {
            name: '',
            surname: '',
            email: localStorage.getItem('email') || '',
            address: '',
            zip: '',
        },
        mode: 'onBlur',
    })

    const onSubmit = (data: CheckoutFormValues) => {
        console.log('Payment details:', data, cartItems)
        setShowCongrats(true)
    }

    return (
        <div className="flex w-full flex-col p-[100px] pt-11 font-poppins">
            <h2 className="text-[42px] font-semibold text-gray-900">
                Checkout
            </h2>
            <div className="flex gap-32 pt-10">
                <div className="flex h-[635px] w-[1130px] flex-col gap-10 rounded-2xl bg-neutral-100 px-8 pt-16">
                    <h2 className="font-poppins text-[22px] font-medium text-zinc-700">
                        Order Details
                    </h2>
                    <div className="flex max-w-[578px] flex-col gap-8">
                        <div className="flex flex-row gap-4">
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <div className="flex flex-1 flex-col gap-2">
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            {...field}
                                            onFocus={() => setIsFocused('name')}
                                            onBlur={() => {
                                                setIsFocused(null)
                                                field.onBlur()
                                            }}
                                            className={`${checkoutInputStyles} ${
                                                errors.name
                                                    ? 'border-red-500'
                                                    : isFocused === 'name'
                                                      ? 'border-orange-500'
                                                      : 'border-neutral-200'
                                            }`}
                                        />
                                        {errors.name && (
                                            <span className="text-sm text-red-500">
                                                {errors.name.message}
                                            </span>
                                        )}
                                    </div>
                                )}
                            />
                            <Controller
                                name="surname"
                                control={control}
                                render={({ field }) => (
                                    <div className="flex flex-1 flex-col gap-2">
                                        <input
                                            type="text"
                                            placeholder="Surname"
                                            {...field}
                                            onFocus={() =>
                                                setIsFocused('surname')
                                            }
                                            onBlur={() => {
                                                setIsFocused(null)
                                                field.onBlur()
                                            }}
                                            className={`${checkoutInputStyles} ${
                                                errors.surname
                                                    ? 'border-red-500'
                                                    : isFocused === 'surname'
                                                      ? 'border-orange-500'
                                                      : 'border-neutral-200'
                                            }`}
                                        />
                                        {errors.surname && (
                                            <span className="text-sm text-red-500">
                                                {errors.surname.message}
                                            </span>
                                        )}
                                    </div>
                                )}
                            />
                        </div>

                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <div className="relative flex flex-col gap-2">
                                    <input
                                        type="email"
                                        placeholder="       E-mail"
                                        {...field}
                                        onFocus={() => setIsFocused('email')}
                                        onBlur={() => {
                                            setIsFocused(null)
                                            field.onBlur()
                                        }}
                                        className={`${checkoutInputStyles} ${
                                            errors.email
                                                ? 'border-red-500'
                                                : isFocused === 'email'
                                                  ? 'border-orange-500'
                                                  : 'border-neutral-200'
                                        }`}
                                    />
                                    {!field.value && (
                                        <span className="pointer-events-none absolute left-3 top-3 text-gray-400">
                                            <EmailLogo />
                                        </span>
                                    )}
                                    {errors.email && (
                                        <span className="text-sm text-red-500">
                                            {errors.email.message}
                                        </span>
                                    )}
                                </div>
                            )}
                        />

                        <div className="flex flex-row gap-4">
                            <Controller
                                name="address"
                                control={control}
                                render={({ field }) => (
                                    <div className="flex flex-1 flex-col gap-2">
                                        <input
                                            type="text"
                                            placeholder="Address"
                                            {...field}
                                            onFocus={() =>
                                                setIsFocused('address')
                                            }
                                            onBlur={() => {
                                                setIsFocused(null)
                                                field.onBlur()
                                            }}
                                            className={`${checkoutInputStyles} ${
                                                errors.address
                                                    ? 'border-red-500'
                                                    : isFocused === 'address'
                                                      ? 'border-orange-500'
                                                      : 'border-neutral-200'
                                            }`}
                                        />
                                        {errors.address && (
                                            <span className="text-sm text-red-500">
                                                {errors.address.message}
                                            </span>
                                        )}
                                    </div>
                                )}
                            />

                            <Controller
                                name="zip"
                                control={control}
                                render={({ field }) => (
                                    <div className="flex flex-1 flex-col gap-2">
                                        <input
                                            type="text"
                                            placeholder="Zip code"
                                            {...field}
                                            onFocus={() => setIsFocused('zip')}
                                            onBlur={() => {
                                                setIsFocused(null)
                                                field.onBlur()
                                            }}
                                            className={`${checkoutInputStyles} ${
                                                errors.zip
                                                    ? 'border-red-500'
                                                    : isFocused === 'zip'
                                                      ? 'border-orange-500'
                                                      : 'border-neutral-200'
                                            }`}
                                        />
                                        {errors.zip && (
                                            <span className="text-sm text-red-500">
                                                {errors.zip.message}
                                            </span>
                                        )}
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex w-full max-w-[460px] flex-col justify-between">
                    <div className="flex flex-col gap-4">
                        {cartItems.length > 0 ? (
                            <div className="flex max-h-[300px] flex-col gap-6 overflow-y-auto">
                                {cartItems.map((item) => (
                                    <CartItemCard
                                        className="max-h-[134px]"
                                        key={`${item.id}-${item.color}-${item.size}`}
                                        item={item}
                                        updateQuantity={updateQuantity}
                                        removeItem={removeItem}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center gap-2 p-4 text-center text-gray-500">
                                <EmtpyCartLogo />
                                <p className="py-6 text-xl font-medium">Oops</p>
                                <p className="pb-5 text-base">
                                    You have not added item(s) in the cart
                                    yet...
                                </p>
                            </div>
                        )}
                    </div>
                    <div>
                        {cartItems.length > 0 && (
                            <>
                                <CartSummary
                                    className=""
                                    subtotal={subtotal}
                                    delivery={delivery}
                                    total={total}
                                    showCheckoutButton={false}
                                />

                                <button
                                    onClick={handleSubmit(onSubmit)}
                                    className="mt-24 w-full rounded-[10px] bg-orange-600 py-4 text-lg font-medium text-white"
                                >
                                    Pay
                                </button>
                                {showCongrats && (
                                    <CongratsModal
                                        onClose={() => setShowCongrats(false)}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
