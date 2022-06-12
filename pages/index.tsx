import { useSession } from 'next-auth/react'
import dbConnect from '../lib/dbConnect'

const Index = () => {
   const { data: session } = useSession()
   console.log({ session })

  let isLoggedInMessage:string = ''
  if(session){
    isLoggedInMessage = `You are logged in as ${session.user?.name}`
  }
  else {
    isLoggedInMessage = `Not logged in`
  }
    return <div>{isLoggedInMessage}</div> 
    
}

export async function getServerSideProps() {
  console.log("started connection.......")

    try {
        await dbConnect()
      console.log('connected!!')
        return {
            props: { isConnected: 'true' },
        }
    } catch (e) {
        console.error(e)
        return {
            props: { isConnected: 'false' },
        }
    }
}

export default Index
