import { Header } from '@/components/base/header/header'
import { PageContainer } from '@/components/base/page-container/page-container'
import { Outlet } from 'react-router-dom'

const DefaultLayout = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Outer container centers content and sets max width */}
            <div className="mx-auto w-full max-w-[1920px]">
                <Header />
                <PageContainer>
                    <Outlet />
                </PageContainer>
            </div>
        </div>
    )
}

export default DefaultLayout
