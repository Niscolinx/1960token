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
                <div className='w-full h-full bg-gray-700 opacity-[20]'>hello</div>
            <SessionProvider session={session}>
                <ThemeProvider
                    attribute='class'
                    enableSystem={true}
                    defaultTheme='dark'
                >

                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </ThemeProvider>
            </SessionProvider>{' '}
        </>
    )
}

export default MyApp
