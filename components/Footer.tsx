import Link from 'next/link'
import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { RiHome5Line } from 'react-icons/ri'
import { GiTrade } from 'react-icons/gi'
import { MdOutlineOndemandVideo } from 'react-icons/md'

const Footer = () => {
    return (
        <div className='bg-[#1a1a2d] text-[#ccccd0] flex justify-between mt-12 max-w-3xl mx-auto pb-2 fixed bottom-0 left-0 right-0'>
            <Link href='/'>
                <div className='grid justify-items-center p-2 rounded-full cursor-pointer' style={{
                        background: `linear-gradient(145deg, #1c1c30, #171729)`,
                        boxShadow: ` 5px 5px 16px #0c0c15,
             -5px -5px 16px #282845`,
                    }}>
                    <RiHome5Line className='text-orange-300 text-2xl'   />
                </div>
            </Link>
            <Link href='/'>
                <div className='grid justify-items-center p-2 rounded-full cursor-pointer' style={{
                        background: `linear-gradient(145deg, #1c1c30, #171729)`,
                        boxShadow: ` 5px 5px 16px #0c0c15,
             -5px -5px 16px #282845`,
                    }}>
                    <MdOutlineOndemandVideo className='text-orange-300 text-2xl'   />
                </div>
            </Link>
            <Link href='/'>
                <div className='grid justify-items-center p-2 rounded-full cursor-pointer' style={{
                        background: `linear-gradient(145deg, #1c1c30, #171729)`,
                        boxShadow: ` 5px 5px 16px #0c0c15,
             -5px -5px 16px #282845`,
                    }}>
                    <GiTrade className='text-orange-300 text-2xl'  />
                </div>
            </Link>
            <Link href='/dashboard'>
                <div className='grid justify-items-center p-2 rounded-full cursor-pointer' style={{
                        background: `linear-gradient(145deg, #1c1c30, #171729)`,
                        boxShadow: ` 5px 5px 16px #0c0c15,
             -5px -5px 16px #282845`,
                    }}>
                    <CgProfile className='text-orange-300 text-2xl'  />
                </div>
            </Link>
        </div>
    )
}

export default Footer
