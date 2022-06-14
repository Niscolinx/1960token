import { useSession } from 'next-auth/react'
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
    return <div>{isLoggedInMessage}</div> 
    
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
