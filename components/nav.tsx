import Link from 'next/link'
import React from 'react'

function nav() {
  return (
      <nav>
          <Link href='/api/auth/signin'>
              <button className='bg-orange-300 text-[#1a1a2d] rounded px-2 py-1'>
                  Sign in
              </button>
          </Link>
      </nav>
  )
}

export default nav