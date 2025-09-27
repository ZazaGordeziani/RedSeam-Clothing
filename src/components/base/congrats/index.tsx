import { useState } from 'react'
import CongratsModal from '@/components/base/congrats/components/assets/congrats-modal'

const Index = () => {
    const [show, setShow] = useState(true)

    return <>{show && <CongratsModal onClose={() => setShow(false)} />}</>
}

export default Index
