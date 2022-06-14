import { useState } from 'react'
import 'windi.css'
import Head from 'next/head'
import Link from 'next/link'
import { AppProps } from 'next/app'
import {getSession, SessionProvider} from 'next-auth/react'

 function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
     const [isSession, setIsSession] = useState(false)
       getSession().then(data => data ? setIsSession(true): setIsSession(false))

     
    return (
        <>
            <Head>
                <title>1960Token</title>
            </Head>

            {/* <div className='flex w-full md:w-1/3'>
                <div className='w-full flex justify-between px-10 py-2'>
                    <Link href='/'>
                        <a>Home</a>
                    </Link>
                 
                    <Link
                        href={
                            isSession ? '/api/auth/signout' : '/api/auth/signin'
                        }
                    >
                        <a>{isSession ? 'sign Out' : 'sign in'}</a>
                    </Link>
                   
                </div>
            </div> */}
            <div className='grid wrapper'>
                <SessionProvider session={session}>
                    <Component {...pageProps} />
                </SessionProvider>{' '}
            </div>
        </>
    )
}

export default MyApp
