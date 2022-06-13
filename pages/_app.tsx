import 'windi.css'
import Head from 'next/head'
import Link from 'next/link'
import { AppProps } from 'next/app'
import {getSession, SessionProvider} from 'next-auth/react'

async function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
       const isSession = await getSession()

       if(isSession){
           console.log(isSession)
       }
       else {
           console.log('not session')
           console.log(isSession)
       }

       console.log({isSession})
    return (
        <>
            <Head>
                <title>1960Token</title>
            </Head>

            <div className='flex w-full md:w-1/3'>
                <div className='w-full flex justify-between px-10 py-2'>
                    <Link href='/'>
                        <a>Home</a>
                    </Link>
                    {/* <Link href='/auth/register'>
                        <a>Register</a>
                    </Link>
                    <Link href='/auth/login'>
                        <a>Login</a>
                    </Link> */}
                    <Link href='/api/auth/signin'>
                        <a>Next auth</a>
                    </Link>
                    <Link href='/api/auth/signout'>
                        <a>signout</a>
                    </Link>
                </div>
            </div>
            <div className='grid wrapper'>
                <SessionProvider session={session}>
                    <Component {...pageProps} />
                </SessionProvider>{' '}
            </div>
        </>
    )
}

export default MyApp
