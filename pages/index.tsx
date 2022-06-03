import dbConnect from '../lib/dbConnect'

const Index = ({isConnected}: {isConnected: Boolean}) => {
  console.log(isConnected)
    return <div>Welcome, the database connection is {isConnected}</div> 
    
}

export async function getServerSideProps() {
  console.log("started connection.......")

  console.log('**** Environmental Variables', process.env.MONGODB_URI)
  console.log('**** Environmental Variables', process.env.JWT_SECRET)
  console.log('**** Environmental Variables', process.env)

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
