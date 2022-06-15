import { useSession } from 'next-auth/react'
import Link from 'next/link'
import dbConnect from '../lib/dbConnect'

const Index = () => {
   const { data: session } = useSession()

  // console.log({ session })


  let isLoggedInMessage:string = ''
  if(session){
    isLoggedInMessage = `You are logged in as ${session.user?.name}`
  }
  else {
    isLoggedInMessage = `Not logged in`
  }
    return (<div>
      <nav>
        <Link href='/api/auth/signin'>Signin</Link>
        <Link href='/api/auth/signout'>signout</Link>
        <Link href='/dashboard'>dashboard</Link>
      </nav>
      {isLoggedInMessage}</div> )
    
}

export async function getServerSideProps() {


    try {
        await dbConnect()

        return {
            props: { isConnected: 'true' },
        }
    } catch (e) {
        return {
            props: { isConnected: 'false' },
        }
    }
}


export default Index
