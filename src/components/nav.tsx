import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'
import { useRouter } from 'next/router'
import { nextAuthSession } from '../lib/types'

function nav({ session }: { session: nextAuthSession | null }) {
    const { theme, setTheme, systemTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setMounted(true)
    }, [])

    const renderTheme = () => {
        if (!mounted) return null

        const currentTheme = theme === 'system' ? systemTheme : theme

        if (currentTheme === 'dark')
            return <BsFillMoonFill onClick={() => setTheme('light')} />
        else return <BsFillSunFill onClick={() => setTheme('dark')} />
    }

    let isSession = null
    if (session) {
        console.log({ session })
        isSession = (
            <div className='flex justify-between'>
                <div className='block text-sm font-semibold'>
                    <p>{session.user?.email}</p>
                    <p className='text-xs bg-red-400 text-black px-2 rounded-lg w-max'>
                        Not verified
                    </p>
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
        <nav className='flex justify-between items-center px-4'>
            {router.asPath.includes('earn') ? null : (
                <>
                    {isSession}
                    <button className='px-2 py-2 border rounded-lg self-center flex'>
                        {renderTheme()}
                    </button>
                </>
            )}
        </nav>
    )
}

export default nav
