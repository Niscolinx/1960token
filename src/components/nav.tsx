import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'
import { nextAuthSession } from '../lib/types'
import { IUser } from '../models/User'
import { useRouter } from 'next/router'

function nav({ session }: { session: nextAuthSession | null }) {
    const { theme, setTheme, systemTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [isAuth, setIsAuth] = useState(false)

    const router = useRouter()
    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (session) {
            setIsAuth(true)
        } else {
            setIsAuth(false)
        }
    }, [session])

    const renderTheme = () => {
        if (!mounted) return null

        const currentTheme = theme === 'system' ? systemTheme : theme

        if (currentTheme === 'dark')
            return <BsFillMoonFill onClick={() => setTheme('light')} />
        else return <BsFillSunFill onClick={() => setTheme('dark')} />
    }

    let isSession = null

    if (session) {
        const foundUser = session.foundUser as {
            user: IUser
        }
        isSession = (
            <div className='block text-sm font-semibold'>
                <p>{foundUser.user.username}</p>
                <p className='text-xs bg-red-400 text-black px-2 rounded-lg w-max'>
                    Not verified
                </p>
            </div>
        )
    } else {
        isSession = null
    }

    return (
        <nav className='grid items-center px-4 bg-blue-400'>
            {router.asPath.includes('earn') ? null : (
                <>
                    {isSession}
                    <div className='flex gap-4 bg-red-400 justify-self-end'>
                        <Link
                            href={`/api/auth/${isAuth ? 'signout' : 'signin'}`}
                        >
                            <button
                                className={`bg-${
                                    isAuth ? 'orange-300' : 'gray-300'
                                } text-${
                                    isAuth ? '[#1a1a2d]' : 'black'
                                } rounded px-2 text-sm`}
                            >
                                {isAuth ? 'Sign Out' : 'Sign In'}
                            </button>
                        </Link>
                        <button className='px-2 py-2 border rounded-lg self-center flex'>
                            {renderTheme()}
                        </button>
                    </div>
                </>
            )}
        </nav>
    )
}

export default nav
