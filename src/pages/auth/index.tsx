import { HeroPhoto } from '@/assets/hero-photo'
import LogInView from '@/pages/auth/login/view'
import RegisterView from '@/pages/auth/register/view'
import { useLocation } from 'react-router-dom'

const Auth = () => {
    const location = useLocation()

    const renderForm = () => {
        if (location.pathname === '/auth/register') return <RegisterView />
        if (location.pathname === '/auth/login') return <LogInView />
        return null
    }

    const marginTopClassForForm =
        location.pathname === '/auth/login' ? 'mt-[260px]' : 'mt-[145px]'

    return (
        <div className="flex w-screen">
            <div className="w-1/2 max-w-[954px]">
                <HeroPhoto />
            </div>
            <div
                className={`flex w-1/2 justify-center ${marginTopClassForForm}`}
            >
                {renderForm()}
            </div>
        </div>
    )
}
export default Auth
