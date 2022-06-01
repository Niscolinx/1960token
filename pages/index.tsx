import Link from 'next/link'
import { Key } from 'react'
import dbConnect from '../lib/dbConnect'
import Pet from '../models/Pet'

const Index = ({isConnected}: {isConnected: Boolean}) => {

    return <>
      <p>Welcome, the connection is ${isConnected}</p>
    </>
}

/* Retrieves pet(s) data from mongodb database */
export async function getServerSideProps() {
    try {
        await dbConnect()

        return {
            props: { isConnected: true },
        }
    } catch (e) {
        console.error(e)
        return {
            props: { isConnected: false },
        }
    }
}

export default Index
