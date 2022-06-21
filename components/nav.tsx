import { Session } from 'next-auth'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import {BsFillMoonFill} from 'react-icons/bs'

function nav({ session }: { session: Session | null }) {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        if (window.matchMedia('(prefers-color-scheme: dark)').matches)
            document.documentElement.classList.add('dark')
        else document.documentElement.classList.add('light')
    }, [])

    console.log({theme}, {mounted})
    let isSession = null
    if (!mounted) return null
    if (session) {
        isSession = (
            <div className='flex justify-between'>
                <div className='flex items-center gap-2'>
                    <img
                        src={`${session?.user?.image}`}
                        alt=''
                        className='rounded-full w-10'
                    />
                    <div className='block text-sm font-semibold'>
                        <p>{session?.user?.name}</p>
                        <p className='text-xs bg-red-400 text-black px-2 rounded-lg w-max'>
                            Not verified
                        </p>
                    </div>
                </div>
                <Link href='/api/auth/signout'>
                    <button className='bg-gray-300 text-black rounded px-2'>
                        Sign Out
                    </button>
                </Link>
            </div>
        )
    } else {
        isSession = (
            <Link href='/api/auth/signin'>
                <button className='bg-orange-300 text-[#1a1a2d] rounded px-2 py-1'>
                    Sign in
                </button>
            </Link>
        )
    }
    return (
        <nav>
            {isSession}
            <button
               
            >
                <BsFillMoonFill />
            </button>
        </nav>
    )
}

export default nav
