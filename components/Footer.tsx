import Link from 'next/link'
import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { RiHome5Line } from 'react-icons/ri'
import { GiTrade } from 'react-icons/gi'
import { MdOutlineOndemandVideo } from 'react-icons/md'

const Footer = () => {
    return (
        <div className='bg-[#1a1a2d] text-[#ccccd0] flex justify-between mt-8'>
            <Link href='/'>
                <div className='grid justify-items-center'>
                    <RiHome5Line className='text-orange-300 text-lg' />
                </div>
            </Link>
            <Link href='/'>
                <div className='grid justify-items-center'>
                    <MdOutlineOndemandVideo className='text-orange-300 text-lg' />
                </div>
            </Link>
            <Link href='/'>
                <div className='grid justify-items-center'>
                    <GiTrade className='text-orange-300 text-lg'/>
                </div>
            </Link>
            <Link href='/'>
                <div className='grid justify-items-center'>
                    <CgProfile className='text-orange-300 text-lg'/>
                </div>
            </Link>
        </div>
    )
}

export default Footer
