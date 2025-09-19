import { UploadPhotoIcon } from '@/assets/upload-photo-icon'
import { SignUpFormSchema } from '@/pages/auth/register/components/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

export const Register = () => {
    const avatarRef = useRef<HTMLInputElement>(null)

    type SignUpFormValues = {
        avatar?: File | null
        username: string
        email: string
        password: string
        confirm_password: string
    }
    const SignUpFormDefaultValues = {
        avatar: null,
        email: '',
        password: '',
        confirm_password: '',
    }

    const {
        control,
        trigger,
        setError,
        clearErrors,
        // handleSubmit
    } = useForm<SignUpFormValues>({
        resolver: zodResolver(SignUpFormSchema),
        defaultValues: SignUpFormDefaultValues,
        mode: 'onBlur',
    })
    return (
        <form className="flex h-full w-screen flex-col items-center justify-center gap-4 px-4 text-xl lg:w-[800px]">
            <div className="flex flex-col gap-4 rounded-lg border-2 border-solid border-black p-10 dark:border-white">
                <Controller
                    name="avatar"
                    control={control}
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => {
                        const handleClick = () => {
                            avatarRef.current?.click()
                        }

                        const handleRemove = () => {
                            onChange(null)
                            if (avatarRef.current) {
                                avatarRef.current.value = ''
                            }
                        }

                        const handleFileChange = async (
                            e: React.ChangeEvent<HTMLInputElement>,
                        ) => {
                            const file = e.target.files?.[0]

                            if (file) {
                                if (file.size > 1 * 1024 * 1024) {
                                    setError('avatar', {
                                        type: 'manual',
                                        message:
                                            'File size must be less than 1MB',
                                    })
                                    onChange(null)
                                    if (avatarRef.current)
                                        avatarRef.current.value = ''
                                    return
                                }
                                clearErrors('avatar')
                                onChange(file)
                                await trigger('avatar') // optional: trigger validation again
                            }
                        }

                        // const handleFileChange = async (
                        //     e: React.ChangeEvent<HTMLInputElement>,
                        // ) => {
                        //     const file = e.target.files?.[0]
                        //     if (file) {
                        //         onChange(file)
                        //     }
                        // }

                        const previewUrl = value
                            ? URL.createObjectURL(value)
                            : null

                        // const handleKeyDown = (e: React.KeyboardEvent) => {
                        //     if (e.key === 'Enter' || e.key === ' ') {
                        //         e.preventDefault()
                        //         handleClick()
                        //     }
                        // }

                        return (
                            <>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={avatarRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                                <div
                                    className="flex h-[100px] w-[215px] cursor-pointer flex-row items-center gap-4"
                                    onClick={handleClick}
                                    // onKeyDown={handleKeyDown}
                                    role="button"
                                    // tabIndex={0}
                                    // style={{
                                    //     cursor: 'pointer',
                                    // }}
                                    aria-label="Upload avatar"
                                >
                                    {previewUrl ? (
                                        <img
                                            src={previewUrl}
                                            alt="Chosen avatar"
                                            className="h-[100px] w-[100px] rounded-full"
                                        />
                                    ) : (
                                        <UploadPhotoIcon />
                                    )}

                                    <p className="whitespace-nowrap font-poppins text-sm font-normal leading-[100%]">
                                        {previewUrl ? (
                                            <div className="flex gap-3">
                                                <span
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleClick()
                                                    }}
                                                >
                                                    Upload new
                                                </span>
                                                <span
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleRemove()
                                                    }}
                                                >
                                                    Remove
                                                </span>
                                            </div>
                                        ) : (
                                            'Upload image'
                                        )}
                                    </p>
                                </div>
                                {error && (
                                    <span className="text-red-400">
                                        {error.message}
                                    </span>
                                )}
                            </>
                        )
                    }}
                />
                {/* <label className="lg:text-2xl"></label> */}
                <Controller
                    name="username"
                    control={control}
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => {
                        return (
                            <>
                                <input
                                    onBlur={() => {
                                        trigger('username')
                                    }}
                                    onChange={onChange}
                                    value={value}
                                    className="rounded-md border-2 border-solid border-black p-3 text-black"
                                    placeholder="Username"
                                />
                                {error?.message ? (
                                    <span className="text-red-400">
                                        {error.message}
                                    </span>
                                ) : null}
                            </>
                        )
                    }}
                />

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
                                    className="rounded-md border-2 border-solid border-black p-3 text-black"
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
                                        className="w-full rounded-md border-2 border-solid border-black p-3 text-black"
                                        placeholder="Password"
                                        // type={
                                        //     showPassword ? 'text' : 'password'
                                        // }
                                    />{' '}
                                    <button
                                        type="button"
                                        // onClick={() =>
                                        //     setShowPassword(!showPassword)
                                        // }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 transform text-black"
                                    >
                                        {/* {showPassword ? (
                                            <FaEye />
                                        ) : (
                                            <FaEyeSlash />
                                        )} */}
                                    </button>
                                </div>
                                {error?.message ? (
                                    <span className="text-red-400">
                                        (error.message)
                                    </span>
                                ) : null}
                            </>
                        )
                    }}
                />

                <Controller
                    name="confirm_password"
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
                                        className="w-full rounded-md border-2 border-solid border-black p-3 text-black"
                                        placeholder="Confirm password"
                                        // type={
                                        //     showPassword ? 'text' : 'password'
                                        // }
                                    />{' '}
                                    <button
                                        type="button"
                                        // onClick={() =>
                                        //     setShowPassword(!showPassword)
                                        // }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 transform text-black"
                                    >
                                        {/* {showPassword ? (
                                            <FaEye />
                                        ) : (
                                            <FaEyeSlash />
                                        )} */}
                                    </button>
                                </div>
                                {error?.message ? (
                                    <span className="text-red-400">
                                        (error.message)
                                    </span>
                                ) : null}
                            </>
                        )
                    }}
                />

                <button
                    // onClick={handleSubmit(onSubmit)}
                    className="text-xl tracking-wider lg:text-2xl"
                    // disabled={isPending}
                >
                    {/* {isPending ? <Spinner /> : t('sign-up-submit')} */}
                </button>
                {/* {emailSentMessage && ( */}
                <p className="text-main-blue mt-4 w-full text-center text-2xl md:text-2xl">
                    {/* {emailSentMessage} */}
                </p>
                {/* )} */}
                <div className="flex justify-between pt-10 lg:w-[800px]">
                    <p className="my-auto lg:text-2xl">Already member?</p>

                    <Link to={`/login`}>
                        <button>
                            <span>Log In</span>
                        </button>
                    </Link>
                </div>
            </div>
        </form>
    )
}
