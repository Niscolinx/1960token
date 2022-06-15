import Link from 'next/link'
import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { RiHome5Line } from 'react-icons/ri'
import { GiTrade } from 'react-icons/gi'
import { MdOutlineOndemandVideo } from 'react-icons/md'

const Footer = () => {
    return (
        <div className='bg-[#1a1a2d] text-[#ccccd0] flex justify-between'>
            <Link href='/'>
                <div className='grid justify-items-center'>
                    <RiHome5Line className='text-white' />
                    <p>Home</p>
                </div>
            </Link>
            <Link href='/'>
                <div className='grid justify-items-center'>
                    <MdOutlineOndemandVideo className='text-blue-400' />
                    <p>Ad</p>
                </div>
            </Link>
            <Link href='/'>
                <div className='grid justify-items-center'>
                    <GiTrade />
                    <p>Mine</p>
                </div>
            </Link>
            <Link href='/'>
                <div className='grid justify-items-center'>
                    <CgProfile />
                    <p>profile</p>
                </div>
            </Link>
        </div>
    )
}

export default Footer
