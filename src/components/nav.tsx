import Link from 'next/link'
import React, { useEffect, useState, useContext} from 'react'
// import { useTheme } from 'next-themes'
// import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'
import { nextAuthSession } from '../lib/types'
import { IUser } from '../models/User'
import { useRouter } from 'next/router'
import { NavContext } from './Context'

function nav({ session }: { session: nextAuthSession | null }) {

    const {isVerified} = useContext(NavContext)
    // const { theme, setTheme, systemTheme } = useTheme()
    // const [mounted, setMounted] = useState(false)
    const [isAuth, setIsAuth] = useState(false)
    const [verified, setVerified] = useState(false)


    const router = useRouter()
    // useEffect(() => {
    //     setMounted(true)
    // }, [])

   

    useEffect(() => {
        if (session) {
            setIsAuth(true)
            const foundUser = session.foundUser as {
                user: IUser
            }


            if (foundUser.user.isVerified) {
                setVerified(true)
            }
            else{
                setVerified(false)
            }
            
        } else {
            setIsAuth(false)
        }
    }, [session])

    // const renderTheme = () => {
    //     if (!mounted) return null

    //     const currentTheme = theme === 'system' ? systemTheme : theme

    //     if (currentTheme === 'dark')
    //         return <BsFillMoonFill onClick={() => setTheme('light')} />
    //     else return <BsFillSunFill onClick={() => setTheme('dark')} />
    // }

    let isSession = null

    if (session) {
        
        const foundUser = session.foundUser as {
            user: IUser
        }
   
        isSession = (
            <div className='block text-sm font-semibold'>
                <p>{foundUser.user.username}</p>
                <p
                    className={`text-xs ${
                        isVerified || verified? 'bg-green-400' : 'bg-red-400'
                    }  text-black px-2 rounded-lg w-max`}
                >
                    {isVerified || verified ? 'Verified' : 'Not Verified'}
                </p>
            </div>
        )
    } else {
        isSession = null
    }

    return (
        <nav className='flex justify-between items-center px-4'>
            { router.asPath !== '/dashboard' ? null : (
                <>
                    {isSession}
                    <div className='flex gap-4 justify-end w-full'>
                        <Link
                            href={`/api/auth/${isAuth ? 'signout' : 'signin'}`}
                        >
                            <button
                                className={`${
                                    isAuth ? 'bg-orange-300' : 'bg-gray-300'
                                } ${
                                    isAuth ? 'text-[#1a1a2d]' : 'text-black'
                                } rounded px-2 text-sm`}
                            >
                                {isAuth ? 'Sign Out' : 'Sign In'}
                            </button>
                        </Link>
                        {/* <button className='px-2 py-2 border rounded-lg self-center flex'>
                            {renderTheme()}
                        </button> */}
                    </div>
                </>
            )}
        </nav>
    )
}

export default nav
