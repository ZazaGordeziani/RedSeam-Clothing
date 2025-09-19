import { HeroPhoto } from '@/assets/hero-photo'
import { LogInView } from '@/pages/auth/login/view'
import { RegisterView } from '@/pages/auth/register/view'
import { useLocation } from 'react-router-dom'

export const Auth = () => {
    const location = useLocation()

    const renderForm = () => {
        if (location.pathname === '/auth/register') return <RegisterView />
        if (location.pathname === '/auth/login') return <LogInView />
        return null
    }
    return (
        <div className="flex justify-between gap-[172px]">
            <div className="flex-1">
                <HeroPhoto />
            </div>
            <div className="mt-[160px] flex flex-1">{renderForm()}</div>
        </div>
    )
}
