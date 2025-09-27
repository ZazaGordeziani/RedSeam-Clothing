import { httpClient } from '@/api'
import { AUTH_ENDPONTS } from '@/api/auth/index.enum'
import type { LoginPayload } from '@/api/auth/index.types'
import type { RegisterFormValues } from '@/pages/auth/register/components/index.types'

export const login = async ({ payload }: LoginPayload) => {
    const response = await httpClient.post(AUTH_ENDPONTS.LOGIN, payload)
    return response.data
}

// export const register = (payload: RegisterPayload) => {
//     return httpClient
//         .post(AUTH_ENDPONTS.REGISTER, payload)
//         .then((res) => res.data)
// }
export const register = async (form: RegisterFormValues) => {
    const formData = new FormData()
    formData.append('username', form.username)
    formData.append('email', form.email)
    formData.append('password', form.password)
    formData.append('password_confirmation', form.confirmPassword)
    if (form.avatar) formData.append('avatar', form.avatar)

    //just for debugging
    // for (const [key, value] of formData.entries()) {
    //     console.log(key, value)
    // }
    const response = await httpClient.post(AUTH_ENDPONTS.REGISTER, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    })

    return response.data
}
