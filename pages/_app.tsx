import '../css/style.css'
import '../css/form.css'
import 'windi.css'
import Head from 'next/head'
import Link from 'next/link'
import { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
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
        </div>

        <img
          id="title"
          src="https://upload.wikimedia.org/wikipedia/commons/1/1f/Pet_logo_with_flowers.png"
          alt="pet care logo"
        ></img>
      </div>
      <div className="grid wrapper">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
