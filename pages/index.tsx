import { getSession, useSession } from 'next-auth/react'
import dbConnect from '../lib/dbConnect'
import User from '../models/User'

const Index = () => {
   const { data: session } = useSession()
   const getUser = getSession().then((data) => {
     console.log('get session', {data})
   })
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

    try {
        await dbConnect()
        const users = await User.find()

        console.log({users})
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
