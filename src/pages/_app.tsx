import 'windi.css'
import '../styles/globals.scss'
import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Layout from '../components/Layout'
import { ThemeProvider } from 'next-themes'
import { Provider } from 'react-redux'
import { store, persistedStore } from '../app/store'
import { PersistGate } from 'redux-persist/integration/react'
import LogRocket from 'logrocket';
LogRocket.init('u0nffn/1960token');

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <>
            <SessionProvider session={session}>
                <Provider store={store}>
                        <ThemeProvider
                            attribute='class'
                            enableSystem={true}
                            defaultTheme='dark'
                        >
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        </ThemeProvider>
                </Provider>
            </SessionProvider>{' '}
        </>
    )
}

export default MyApp
