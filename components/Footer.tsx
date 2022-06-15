import Link from 'next/link'
import React from 'react'
import {CgProfile} from 'react-icons/cg'
import {RiHome5Line} from 'react-icons/ri'
import {GiTrade} from 'react-icons/gi'
import {MdOutlineOndemandVideo} from 'react-icons/md'

const Footer =() => {
  return <div className='bg-[#1a1a2d] text-[#ccccd0]'>
      <Link href='/'>
        <div className='grid'>
            <RiHome5Line className='text-white'/>
            <p>Home</p>
        </div>
      </Link>
      <Link href='/'>
        <div className='grid'>
            <MdOutlineOndemandVideo className='text-blue-400'/>
            <p>Ad</p>
        </div>
      </Link>
      <Link href='/'>
        <div className='grid'>
            <GiTrade/>
            <p>Mine</p>
        </div>
      </Link>
      <Link href='/'>
        <div className='grid'>
            <CgProfile/>
            <p>profile</p>
        </div>
      </Link>
  </div>
}

export default Footer