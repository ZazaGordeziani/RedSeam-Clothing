import './App.css'
import { Route, Routes } from 'react-router-dom'
import DefaultLayout from '@/layout/default'
import { Auth } from '@/pages/auth'
import { LogInView } from '@/pages/auth/login/view'
import { RegisterView } from '@/pages/auth/register/view'
function App() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route path="auth" element={<Auth />}>
                    <Route path="login" element={<LogInView />} />
                    <Route path="register" element={<RegisterView />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default App
