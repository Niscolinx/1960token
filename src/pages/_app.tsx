import 'windi.css'
import '../styles/globals.scss'
import 'animate.css/animate.min.css'
import { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Layout from '../components/Layout'
import { ThemeProvider } from 'next-themes'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import LogRocket from 'logrocket';
import { store, persistedStore } from '../store/app/store'
LogRocket.init('u0nffn/1960token');

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
   
    return (
        <>
            <SessionProvider session={session}>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistedStore}>
                        <ThemeProvider
                            attribute='class'
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
