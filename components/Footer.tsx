import Link from 'next/link'
import React from 'react'
import {CgProfile} from 'react-icons/cg'
import {GrHomeRounded} from 'react-icons/gr'

const footer =() => {
  return <div className='bg-[#1a1a2d] text-[#ccccd0]'>
      <Link href='/'>
        <div className='grid'>
            <img src='logo.svg' alt=''/>
        </div>
      </Link>
  </div>
}

export default footer