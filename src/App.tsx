import './App.css'
import { Route, Routes } from 'react-router-dom'
import { useAtom } from 'jotai'
import { lazy, Suspense, useEffect } from 'react'
import { userAtom } from '@/store/auth'

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
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                {/* Main layout */}
                <Route path="/" element={<LazyDefaultLayout />}>
                    {/* Root "/" shows products page */}
                    <Route index element={<LazyProductsPage />} />

                    {/* "/products" also shows products page */}
                    <Route path="products" element={<LazyProductsPage />} />

                    {/* Auth routes */}
                    <Route path="auth" element={<LazyAuthPage />}>
                        <Route path="login" element={<LazyLoginPage />} />
                        <Route path="register" element={<LazyRegisterPage />} />
                    </Route>

                    {/* Optional: redirect unknown routes to "/" */}
                    {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
                </Route>
                <Route path="*" element={<LazyNotFoundPage />} />
            </Routes>
        </Suspense>
    )
}

export default App
