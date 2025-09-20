import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useAtom } from 'jotai'
import { lazy, Suspense, useEffect } from 'react'
import { userAtom } from '@/store/auth'
import { BounceLoader } from 'react-spinners'

function App() {
    const [, setUser] = useAtom(userAtom)

    useEffect(() => {
        const username = localStorage.getItem('username')
        const avatar = localStorage.getItem('avatar')
        if (username) {
            setUser({ username, avatar: avatar || undefined })
        }
    }, [setUser])

    const LazyDefaultLayout = lazy(() => import('@/layout/default'))
    const LazyLoginPage = lazy(() => import('@/pages/auth/login/view/'))
    const LazyRegisterPage = lazy(() => import('@/pages/auth/register/view'))
    const LazyAuthPage = lazy(() => import('@/pages/auth/index'))
    const LazyProductsPage = lazy(() => import('@/pages/products/index'))
    const LazyNotFoundPage = lazy(() => import('@/pages/404'))

    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen w-full items-center justify-center">
                    <BounceLoader color="#FF7F00" />
                </div>
            }
        >
            <Routes>
                <Route path="/" element={<LazyDefaultLayout />}>
                    <Route index element={<LazyProductsPage />} />

                    <Route path="products" element={<LazyProductsPage />} />

                    <Route path="auth" element={<LazyAuthPage />}>
                        <Route path="login" element={<LazyLoginPage />} />
                        <Route path="register" element={<LazyRegisterPage />} />
                    </Route>
                </Route>
                <Route path="*" element={<LazyNotFoundPage />} />
            </Routes>
        </Suspense>
    )
}

export default App
