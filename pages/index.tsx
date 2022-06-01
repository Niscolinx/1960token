import Link from 'next/link'
import { Key } from 'react'
import dbConnect from '../lib/dbConnect'
import Pet from '../models/Pet'

const Index = ({ pets }: any) => (
    <>
      
    </>
)

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
