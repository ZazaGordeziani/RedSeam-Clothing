import { HeaderLogo } from '@/assets/header-logo-icon'
import { LogInLogo } from '@/assets/log-in-logo'

export const Header = () => {
    return (
        <div className="flex h-20 w-[1920px] items-center justify-between px-[102px]">
            <div className="flex h-6 w-[180px] items-center justify-center gap-1">
                <HeaderLogo />
                <span className="w-[152px] font-poppins text-[16px] font-[600] leading-[100%] text-black">
                    RedSeam Clothing
                </span>
            </div>
            <div className="flex h-5 w-16 items-center gap-2">
                <LogInLogo />
                <span className="font-poppins text-xs font-medium text-gray-900">
                    Log in
                </span>
            </div>
        </div>
    )
}
