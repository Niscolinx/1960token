import 'windi.css'
import '../styles/globals.scss'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Layout from '../components/Layout'
import {ThemeProvider} from 'next-themes'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
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
                <SessionProvider session={session}>
                    <ThemeProvider attribute='class'>

                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                    </ThemeProvider>
                </SessionProvider>{' '}
        </>
    )
}

export default MyApp
