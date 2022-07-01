import React, {useEffect} from 'react'
import Footer from './Footer'
import Nav from './nav'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const Layout: React.FC<{}> = ({ children }) => {
    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        if(router.asPath.includes("earn")){

        }
    }, [router])
    return (
        <div className='py-2 bg-[#1a1a2d] text-[#ccccd0] mx-auto relative light:(bg-[#ccccd0] text-[#1a1a2d])'>
            <Nav session={session} />
            <main className='mb-25'>{children}</main>
            <Footer />
        </div>
    )
}

export default Layout
