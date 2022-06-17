import Link from 'next/link'
import React from 'react'

function nav() {
  return (
   <nav>
    <Link href='/api/auth/signin'>
        Sign in
    </Link>
   </nav>
  )
}

export default nav