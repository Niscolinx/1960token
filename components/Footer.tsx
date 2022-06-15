import Link from 'next/link'
import React from 'react'
import {CgProfile} from 'react-icons/cg'
import {GrHomeRounded} from 'react-icons/gr'
import {GiTrade} from 'react-icons/gi'
import {MdOutlineOndemandVideo} from 'react-icons/md'

const footer =() => {
  return <div className='bg-[#1a1a2d] text-[#ccccd0]'>
      <Link href='/'>
        <div className='grid'>
            <GrHomeRounded/>
            <p>Home</p>
        </div>
      </Link>
      <Link href='/'>
        <div className='grid'>
            <MdOutlineOndemandVideo/>
            <p>Video</p>
        </div>
      </Link>
      <Link href='/'>
        <div className='grid'>
            <GiTrade/>
            <p>Home</p>
        </div>
      </Link>
      <Link href='/'>
        <div className='grid'>
            <CgProfile/>
            <p>Home</p>
        </div>
      </Link>
  </div>
}

export default footer