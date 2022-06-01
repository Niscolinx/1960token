import 'windi.css'
import Head from 'next/head'
import Link from 'next/link'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  console.log('_app running')
  return (
    <>
      <Head>
        <title>1960Token</title>
      </Head>

      <div className="top-bar">
        <div className="nav">
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/auth/register">
            <a>Register</a>
          </Link>
          <Link href="/auth/login">
            <a>Login</a>
          </Link>
        </div>

     
      </div>
      <div className="grid wrapper">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
