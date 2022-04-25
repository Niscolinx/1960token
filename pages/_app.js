import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  console.log('update!!!')
  return <Component {...pageProps} /> 
}

export default MyApp
