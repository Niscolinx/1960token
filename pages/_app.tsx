import 'windi.css'
import Head from 'next/head'
import Link from 'next/link'
import { AppProps } from 'next/app'
import {SessionProvider} from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    console.log('_app running', session)
    return (
        <>
            <Head>
                <title>1960Token</title>
            </Head>

            <div className='flex w-1/3'>
                <div className='w-full flex justify-between'>
                    <Link href='/'>
                        <a>Home</a>
                    </Link>
                    <Link href='/auth/register'>
                        <a>Register</a>
                    </Link>
                    <Link href='/auth/login'>
                        <a>Login</a>
                    </Link>
                    <Link href='/api/auth/signin'>
                        <a>Nexauth</a>
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
