import React from 'react'
import Footer from './Footer'
import Nav from './nav'
import { useSession } from 'next-auth/react'


const Layout:React.FC<{}> = ({children}) => {
      const { data: session } = useSession()

  return (
    <div className='py-2 px-4 bg-[#1a1a2d] text-[#ccccd0] max-w-4xl mx-auto'>
        <Nav session={session}/>
          {children}
          <Footer />
      </div>
  )
}

export default Layout