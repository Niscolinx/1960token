import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import Nav from './nav'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import LiveTicker from '../widgets/LiveTicker'


type Props = {
    children: React.ReactNode
    hello: string
}

const Layout: React.FC<Props> = ({ children, hello }) => {
    console.log({hello})
    const { data: session } = useSession()
    const router = useRouter()
    const [addMargin, setAddMargin] = useState('')
    const [addPadding, setAddPadding] = useState('')
    const [visibility, setVisibility] = useState('hidden')
    const [hideFooter, setHideFooter] = useState(false)

    useEffect(() => {
        router.asPath === '/' ? setVisibility('flex') : setVisibility('hidden')

        if (router.asPath.includes('earn')) {
            setAddMargin('mb-0')
            setAddPadding('')
        } else {
            setAddMargin('mb-25')
            setAddPadding('py-2')
        }

        if(router.asPath.includes('adminDashboard')) {
            setHideFooter(true)
        }else{
            setHideFooter(false)
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
                <Footer hideFooter={hideFooter}/>
            </div>
        </>
    )
}

export default Layout
