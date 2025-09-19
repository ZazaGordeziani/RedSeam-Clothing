import { Header } from '@/components/base/header/header'
import { PageContainer } from '@/components/base/page-container/page-container'
import { Outlet } from 'react-router-dom'

const DefaultLayout = () => {
    return (
        <div className="flex min-h-screen justify-center">
            <div
                className="h-[1080px] w-[1920px]"
                // style={{ height: '1080px', maxWidth: '1920px' }}
            >
                <Header />
                <PageContainer>
                    <Outlet />
                </PageContainer>
            </div>
        </div>
    )
}

export default DefaultLayout
