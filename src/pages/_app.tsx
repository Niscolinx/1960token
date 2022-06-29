import 'windi.css'
import '../styles/globals.scss'
import Head from 'next/head'
import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Layout from '../components/Layout'
import { ThemeProvider } from 'next-themes'
import { Provider } from 'react-redux'
import {store} from '../app/store'
import { PersistGate } from 'redux-persist/integration/react'


function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <>
            <SessionProvider session={session}>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>

                    <ThemeProvider
                        attribute='class'
                        enableSystem={true}
                        defaultTheme='dark'
                        >
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </ThemeProvider>
                        </PersistGate>
                </Provider>
            </SessionProvider>{' '}
        </>
    )
}

export default MyApp
