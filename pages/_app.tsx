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
