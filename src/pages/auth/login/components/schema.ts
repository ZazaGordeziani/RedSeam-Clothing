import { z } from 'zod'

export const LoginFormSchema = z.object({
    email: z.string().email({ message: 'invalid_email' }),
    password: z.string().min(6, {
        message: 'invalid password',
    }),
    // .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).+$/, {
    //     message: 'invalid_password_type',
    // }),
})
