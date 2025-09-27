import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Eye } from '@/pages/auth/assets/eye'
import { SlashEye } from '@/assets/slash-eye'
import { LoginFormSchema } from '@/pages/auth/login/components/schema'
import type { LoginFormValues } from '@/pages/auth/login/components/index.types'
import { useLogin } from '@/react-query/mutation'
import type { LoginResponse } from '@/api/auth/index.types'
import { httpClient } from '@/api'
import { userAtom } from '@/store/auth'
import { useAtom } from 'jotai'
import { InputAsterisk } from '@/components/ui/asterisk'

export const Login = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [, setUser] = useAtom(userAtom)

    type LocationState = {
        from?: Location
    }

    const navigate = useNavigate()
    const location = useLocation() as { state: LocationState }
    const from = location.state?.from
        ? location.state?.from?.pathname + location.state?.from?.search
        : '/'

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
            if (data.token) localStorage.setItem('token', data.token)
            if (data.user?.username)
                localStorage.setItem('username', data.user.username)
            if (data.user?.avatar)
                localStorage.setItem('avatar', data.user.avatar)
            if (data.user?.email) localStorage.setItem('email', data.user.email)
            setUser({
                username: data.user?.username,
                avatar: data.user?.avatar || undefined,
                token: data.token,
            })
            httpClient.defaults.headers.common['Authorization'] =
                `Bearer ${data.token}`

            navigate(from, { replace: true })
        },
        onError: () => {
            setError('email', {
                type: 'server',
                message: 'Invalid login credentials',
            })
            setError('password', {
                type: 'server',
                message: 'Invalid login credentials',
            })
        },
    })

    const onSubmit = (formData: LoginFormValues) => {
        // console.log('loggedin from buton')
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
                            const hasError = !!error
                            return (
                                <div className="flex flex-col">
                                    <div className="relative">
                                        <input
                                            onChange={onChange}
                                            value={value}
                                            className={`input-default ${hasError ? 'border-orange-600' : ''}`}
                                            placeholder="E-mail"
                                        />
                                        <InputAsterisk
                                            visible={!value}
                                            className="left-16 top-2"
                                        />
                                    </div>
                                    {error?.type !== 'server' &&
                                        error?.message && (
                                            <span className="mt-3 block text-red-500">
                                                {error.message}
                                            </span>
                                        )}
                                </div>
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
                            const hasServerError = error?.type === 'server'

                            return (
                                <>
                                    <div className="flex flex-col">
                                        <div className="relative">
                                            <input
                                                value={value}
                                                onChange={onChange}
                                                className={`input-default ${hasServerError ? 'border-orange-600' : ''}`}
                                                placeholder="Password"
                                                type={
                                                    showPassword
                                                        ? 'text'
                                                        : 'password'
                                                }
                                            />
                                            <InputAsterisk
                                                visible={!value}
                                                className="left-[85px] top-2"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword,
                                                    )
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
                                        {error?.message && (
                                            <span className="mt-3 block text-red-500">
                                                {error.message}
                                            </span>
                                        )}
                                    </div>
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
                            Log in
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
