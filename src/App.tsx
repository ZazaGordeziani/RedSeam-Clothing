import './App.css'
import { Route, Routes } from 'react-router-dom'
import DefaultLayout from '@/layout/default'
import { Auth } from '@/pages/auth'
function App() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route path="/auth" element={<Auth />}></Route>
            </Route>
        </Routes>
    )
}

export default App
