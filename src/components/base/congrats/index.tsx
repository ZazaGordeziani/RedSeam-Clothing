import { useState } from 'react'
import CongratsModal from '@/components/base/congrats/components/congrats-modal'
import { useCart } from '@/hooks/useCart'
// import { useNavigate } from 'react-router-dom'

const Index = () => {
    const [show, setShow] = useState(true)
    const { clearCart } = useCart()
    return (
        <>
            {show && (
                <CongratsModal
                    onClose={async () => {
                        await clearCart()
                        setShow(false)
                    }}
                />
            )}
        </>
    )
}

export default Index
