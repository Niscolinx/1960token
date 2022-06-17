import React from 'react'
import Footer from './Footer'
import Nav from './nav'

interface ILayout {
  children: React.ReactNode
  session: any
}

const Layout = ({children, session}: ILayout) => {
  console.log({session})
  return (
    <div className='py-2 px-4 bg-[#1a1a2d] text-[#ccccd0]'>
        <Nav/>
          {children}
          <Footer />
      </div>
  )
}

export default Layout