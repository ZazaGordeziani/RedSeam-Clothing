import { z } from 'zod'

export const SignUpFormSchema = z
    .object({
        avatar: z
            .instanceof(File)
            .refine((file) => file.size <= 1 * 1024 * 1024, {
                message: 'File size must be less than 1MB',
            })
            .nullable()
            .optional(),
        username: z.string().min(3, {
            message: 'username should consist at least 3 characters',
        }),
        email: z.string().email({ message: 'invalid_email' }),
        password: z
            .string()
            .min(6, {
                message: 'invalid_password',
            })
            .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).+$/, {
                message: 'invalid_password_type',
            }),
        confirm_password: z.string(),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: 'Passwords do not match',
        path: ['confirm_password'],
    })
