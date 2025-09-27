// src/pages/checkout/components/schema.ts
import { z } from 'zod'

export const CheckoutFormSchema = z.object({
    name: z
        .string()
        .min(3, { message: 'Name must be at least 3 characters' })
        .max(50, { message: 'Name should not be more then 50 characters' })
        .regex(/^[A-Za-z]+$/, { message: 'Name must contain only letters' }),
    surname: z
        .string()
        .min(3, { message: 'Surname must be at least 3 characters' })
        .max(50, { message: 'Surname should not be more then 50 characters' })
        .regex(/^[A-Za-z]+$/, { message: 'Surname must contain only letters' }),
    email: z
        .string()
        .min(3, { message: 'E-mail must be at least 3 characters' })
        .email({ message: 'Invalid email' }),
    address: z
        .string()
        .min(5, { message: 'Address must be at least 5 characters' })
        .max(30, { message: 'Address should not be more then 30 characters' }),
    zip: z
        .string()
        .min(4, { message: 'Zip code must be at least 4 characters' })
        .max(10, { message: 'Zip code should not be more then 10 characters' }),
})
