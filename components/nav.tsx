import { Session } from 'next-auth'
import Link from 'next/link'
import React from 'react'

function nav({ session }: { session: Session | null}) {
    let isSession = null
    if (session) {
        isSession = (
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
    return <nav>{isSession}</nav>
}

export default nav
