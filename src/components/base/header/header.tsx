import { httpClient } from '@/api'
import { CartLogo } from '@/assets/cart-logo'
import { HeaderLogo } from '@/assets/header-logo-icon'
import { LogInLogo } from '@/assets/log-in-logo'
import { userAtom } from '@/store/auth'
import { useAtom } from 'jotai'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export const Header = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const isLoginPage = location.pathname === '/auth/login'
    const actionText = isLoginPage ? 'Register' : 'Log in'
    const actionPath = isLoginPage ? '/auth/register' : '/auth/login'

    const [user, setUser] = useAtom(userAtom)

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('avatar')
        delete httpClient?.defaults?.headers?.common['Authorization']
        setUser(null)
        navigate('/auth/login')
    }

    return (
        <div className="flex w-screen items-center justify-between px-24 py-7">
            <div className="flex h-6 w-[180px] items-center justify-center gap-1">
                <HeaderLogo />
                <span className="w-[152px] font-poppins text-[16px] font-semibold leading-[100%] text-gray-900">
                    RedSeam Clothing
                </span>
            </div>
            {user ? (
                <div className="flex items-center gap-5">
                    <Link to="/cart" className="cursor-pointer">
                        <CartLogo />
                    </Link>
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
                        className="tfont-poppins text-xs font-medium text-orange-600"
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
    )
}
