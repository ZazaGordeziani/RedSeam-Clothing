import { Header } from '@/components/base/header/header'
import { PageContainer } from '@/components/base/page-container/page-container'
import { Outlet } from 'react-router-dom'

const DefaultLayout = () => {
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <div className="">
                <Header />
                <PageContainer>
                    <Outlet />
                </PageContainer>
            </div>
        </div>
    )
}

export default DefaultLayout
