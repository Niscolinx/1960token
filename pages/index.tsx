import dbConnect from '../lib/dbConnect'

const Index = ({isConnected}: {isConnected: Boolean}) => {
  console.log(isConnected)
    return <div>{isConnected}</div> 
    
}

/* Retrieves pet(s) data from mongodb database */
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
