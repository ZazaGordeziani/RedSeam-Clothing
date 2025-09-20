import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Eye } from '@/pages/auth/assets/eye'
import { SlashEye } from '@/assets/slash-eye'
import { LoginFormSchema } from '@/pages/auth/login/components/schema'
import type { LoginFormValues } from '@/pages/auth/login/components/index.types'
import type { AxiosError } from 'axios'
import { useLogin } from '@/react-query/mutation'
import type { LoginResponse } from '@/api/auth/index.types'
import { httpClient } from '@/api'
import { userAtom } from '@/store/auth'
import { useAtom } from 'jotai'

export const Login = () => {
    const [showPassword, setShowPassword] = useState<boolean>(true)
    const [, setUser] = useAtom(userAtom)

    // const [, setAvatar] = useState<string | null>(null)
    const navigate = useNavigate()

    const LoginFormDefaultValues = {
        email: '',
        password: '',
    }

    const {
        control,

        handleSubmit,
        setError,
    } = useForm<LoginFormValues>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: LoginFormDefaultValues,
        mode: 'onBlur',
    })

    const { mutate: handleLogin } = useLogin({
        onSuccess: (data: LoginResponse) => {
            console.log(data.user?.avatar)
            if (data.token) localStorage.setItem('token', data.token)
            if (data.user?.username)
                localStorage.setItem('username', data.user.username)
            if (data.user?.avatar)
                localStorage.setItem('avatar', data.user.avatar)
            setUser({
                username: data.user?.username,
                avatar: data.user?.avatar || undefined,
            })
            httpClient.defaults.headers.common['Authorization'] =
                `Bearer ${data.token}`

            navigate('/products')
        },
        onError: (error: AxiosError) => {
            const data = error.response?.data as {
                message?: string
                errors?: Record<string, string[]>
            }
            if (data?.errors) {
                Object.entries(data.errors).forEach(([field, messages]) => {
                    setError(field as keyof LoginFormValues, {
                        type: 'server',
                        message: messages[0],
                    })
                })
            } else if (data?.message) {
                alert(data.message)
            }
        },
    })

    const onSubmit = (formData: LoginFormValues) => {
        console.log('loggedin from buton')
        handleLogin(formData)
    }
    return (
        <div className="flex flex-col gap-[46px]">
            <h1 className="h-[63px] font-poppins text-[42px] font-semibold leading-[100%] text-gray-900">
                Log in
            </h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-h-[518px] max-w-[554px]"
            >
                <div className="flex flex-col gap-6">
                    {/* <label className="lg:text-2xl">"E-mail"</label> */}
                    <Controller
                        name="email"
                        control={control}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => {
                            return (
                                <>
                                    <input
                                        onChange={onChange}
                                        value={value}
                                        className="input-default"
                                        placeholder="E-mail"
                                    />
                                    {error?.message ? (
                                        <span className="text-red-400">
                                            (error.message)
                                        </span>
                                    ) : null}
                                </>
                            )
                        }}
                    />

                    {/* <label className="lg:text-2xl">"auth-password"</label> */}
                    <Controller
                        name="password"
                        control={control}
                        render={({
                            field: { onChange, value },
                            fieldState: { error },
                        }) => {
                            return (
                                <>
                                    <div className="relative">
                                        <input
                                            value={value}
                                            onChange={onChange}
                                            className="input-default"
                                            placeholder="Password"
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                        />{' '}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 transform text-black"
                                        >
                                            {showPassword ? (
                                                <Eye />
                                            ) : (
                                                <SlashEye />
                                            )}
                                        </button>
                                    </div>
                                    {error?.message ? (
                                        <span className="text-red-400">
                                            {error.message}
                                        </span>
                                    ) : null}
                                </>
                            )
                        }}
                    />

                    <div className="mt-5 flex flex-col justify-center gap-6">
                        <button
                            // onClick={handleSubmit(onSubmit)}
                            className="flex h-[41px] items-center justify-center rounded-[10px] bg-orange-600 font-poppins text-[14px] font-normal leading-[100%] text-white"
                            // disabled={isPending}
                        >
                            Register
                            {/* {isPending ? <Spinner /> : t('sign-up-submit')} */}
                        </button>
                        {/* {emailSentMessage && ( */}
                        {/* <p className="">{emailSentMessage}</p> */}
                        {/* )} */}
                        <div className="flex items-center justify-center gap-2">
                            <p className="font-poppins text-sm font-normal leading-[100%] tracking-[0px] text-zinc-700">
                                Not a member?
                            </p>

                            <Link to={`/auth/register`}>
                                <button>
                                    <span className="font-poppins text-sm font-medium leading-[100%] tracking-[0px] text-orange-600">
                                        Register
                                    </span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
