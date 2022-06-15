import React from 'react'
import Footer from './Footer'

const Layout:React.FC<{}> = ({children}) => {
  return (
      <div className='py-2 px-4 bg-[#1a1a2d] text-[#ccccd0]'>
          {children}
          <Footer />
      </div>
  )
}

export default Layout