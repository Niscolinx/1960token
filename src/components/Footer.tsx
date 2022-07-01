import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { CgProfile } from 'react-icons/cg'
import { RiHome5Line } from 'react-icons/ri'
import { MdOutlineOndemandVideo } from 'react-icons/md'
import { useRouter } from 'next/router'

const Footer = () => {
    const router = useRouter()
    const { theme } = useTheme()
    const [neuToUse, setNeuToUse] = useState<{}>()
    const [toFixedDisplay, setToFixedDisplay] = useState<string>('fixed')

    useEffect(() => {
        if (theme === 'dark') {

            setNeuToUse({
                background: `linear-gradient(145deg, #1c1c30, #171729)`,
                boxShadow: `5px 5px 16px #0c0c15,
             -5px -5px 16px #282845`,
                borderRadius: '50px',
            })
        } else {
            setNeuToUse({
                background: `linear-gradient(145deg, #dadadf, #b8b8bb)`,
                boxShadow: `7px 7px 14px #a5a5a8,
             -7px -7px 14px #f3f3f8`,
                borderRadius: '50px',
                color: '#1a1a2d',
            })
        }
    }, [theme])

    console.log({router})

    useEffect(() => {
        if(router.pathname.includes("earn")){
            setToFixedDisplay('')
        }
    }, [])
    
    return (
        <div className={`bg-[#1a1a2d] text-[#ccccd0] flex justify-between max-w-3xl mx-auto p-2 bottom-0 left-0 right-0 rounded-lg pb-5 light:(text-[#1a1a2d] bg-[#ccccd0]) ${toFixedDisplay}`}>
            <Link href='/'>
                <div
                    className='grid justify-items-center p-2 rounded-full cursor-pointer'
                    style={neuToUse}
                >
                    <RiHome5Line className='text-orange-300 light:text-[#1a1a2d] text-2xl' />
                </div>
            </Link>
            <Link href='/dashboard/earn'>
                <div
                    className='grid justify-items-center p-2 rounded-full cursor-pointer'
                    style={neuToUse}
                >
                    <MdOutlineOndemandVideo className='text-orange-300 light:text-[#1a1a2d] text-2xl' />
                </div>
            </Link>
           
            <Link href='/dashboard'>
                <div
                    className='grid justify-items-center p-2 rounded-full cursor-pointer'
                    style={neuToUse}
                >
                    <CgProfile className='text-orange-300 light:text-[#1a1a2d] text-2xl' />
                </div>
            </Link>
        </div>
    )
}

export default Footer
