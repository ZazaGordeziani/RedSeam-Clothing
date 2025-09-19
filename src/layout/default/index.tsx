import { Header } from '@/components/base/header/header'
import { PageContainer } from '@/components/base/page-container/page-container'
import { Outlet } from 'react-router-dom'

const DefaultLayout = () => {
    return (
        <div className="h-[1000px] w-[1920px]">
            <Header />
            <PageContainer>
                <Outlet />
            </PageContainer>
        </div>
    )
}

export default DefaultLayout
