import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import Nav from './nav'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import LiveTicker from '../widgets/LiveTicker'

const Layout: React.FC<{}> = ({ children }) => {
    const { data: session } = useSession()
    const router = useRouter()
    const [addMargin, setAddMargin] = useState('')
    const [addPadding, setAddPadding] = useState('')
    const [visibility, setVisibility] = useState('flex')

    useEffect(() => {
        if (router.asPath.includes('dashboard')) {
            setVisibility('hidden')
        }
        if (router.asPath.includes('earn')) {
            setAddMargin('mb-0')
            setAddPadding('')
        } else {
            setAddMargin('mb-25')
            setAddPadding('py-2')
            setVisibility('flex')
        }
    }, [router])
    return (
        <>
            <div className={visibility}>
                <LiveTicker />
            </div>
            <div
                className={`${addPadding} bg-[#1a1a2d] text-[#ccccd0] mx-auto relative light:(bg-[#ccccd0] text-[#1a1a2d])`}
            >
                <Nav session={session} />
                <main className={`${addMargin} overflow-x-hidden`}>
                    {children}
                </main>
                <Footer />
            </div>
        </>
    )
}

export default Layout
