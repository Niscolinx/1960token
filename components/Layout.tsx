import React from 'react'
import Footer from './Footer'

const Layout:React.FC<{}> = ({children}) => {
  return (
    <>
    <main>{children}</main>
    <Footer/>
    </>
  )
}

export default Layout