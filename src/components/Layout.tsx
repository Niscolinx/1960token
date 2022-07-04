import React, {useEffect, useState} from 'react'
import Footer from './Footer'
import Nav from './nav'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const Layout: React.FC<{}> = ({ children }) => {
    const { data: session } = useSession()
    const router = useRouter()
    const [addMargin, setAddMargin] = useState("")
    const [addPadding, setAddPadding] = useState("")

    useEffect(() => {
        if(router.asPath.includes("earn")){
            setAddMargin('mb-0')
            setAddPadding('pt-2')
        }
        else{
            setAddMargin('mb-25')
            setAddPadding('py-2')
        }
    }, [router])
    return (
        <div className={` bg-[#1a1a2d] text-[#ccccd0] mx-auto relative light:(bg-[#ccccd0] text-[#1a1a2d])'}>
            <Nav session={session} />
            <main className={`${addMargin} overflow-x-hidden`}>{children}</main>
            <Footer />
        </div>
    )
}

export default Layout
