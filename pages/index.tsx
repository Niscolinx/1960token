import { useSession } from 'next-auth/react'
import dbConnect from '../lib/dbConnect'

const Index = ({isConnected}: {isConnected: Boolean}) => {
   const { data: session } = useSession()
   console.log({ session })
  console.log(isConnected)
    return <div>Welcome, the database connection is {isConnected}</div> 
    
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
