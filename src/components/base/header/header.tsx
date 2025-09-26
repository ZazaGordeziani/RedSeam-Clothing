import { httpClient } from '@/api'
import { CartLogo } from '@/assets/cart-logo'
import { HeaderLogo } from '@/assets/header-logo-icon'
import { LogInLogo } from '@/assets/log-in-logo'
import { Cart } from '@/components/cart'
import { userAtom } from '@/store/auth'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export const Header = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const [user, setUser] = useAtom(userAtom)
    const [cartOpen, setCartOpen] = useState(false)

    const isLoginPage = location.pathname === '/auth/login'
    const actionText = isLoginPage ? 'Register' : 'Log in'
    const actionPath = isLoginPage ? '/auth/register' : '/auth/login'

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('avatar')
        localStorage.removeItem('email')
        delete httpClient?.defaults?.headers?.common['Authorization']
        setUser(null)
        navigate('/')
    }

    return (
        <>
            <div className="flex items-center justify-between px-[100px] py-[25px]">
                <div className="flex h-6 w-[180px] items-center justify-center gap-1">
                    <Link
                        to="/"
                        className="flex items-center font-poppins text-[16px] font-semibold leading-[100%] text-gray-900"
                    >
                        <HeaderLogo />
                        <p>RedSeam Clothing</p>
                    </Link>
                </div>
                {user ? (
                    <div className="flex items-center gap-5">
                        <div
                            onClick={() => setCartOpen(true)}
                            className="cursor-pointer"
                        >
                            <CartLogo />
                        </div>
                        {user.avatar ? (
                            <img
                                src={user.avatar}
                                alt={user.username}
                                className="h-10 w-10 rounded-full object-cover"
                            />
                        ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 font-semibold text-gray-700">
                                {user.username?.charAt(0).toUpperCase()}
                            </div>
                        )}

                        <button
                            onClick={handleLogout}
                            className="mr-1 font-poppins text-xs font-medium text-orange-600"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div
                        className="flex h-5 cursor-pointer items-center gap-2"
                        onClick={() => navigate(actionPath)}
                    >
                        <LogInLogo />
                        <span className="font-poppins text-xs font-medium text-gray-900">
                            {actionText}
                        </span>
                    </div>
                )}
            </div>
            <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        </>
    )
}
