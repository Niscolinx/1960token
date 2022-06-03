import { NextApiResponse } from 'next'
import type { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export default async function Home(req: NextRequest, res: NextApiResponse) {
    console.log('running from index')
    res.json('hello')
    //await dbConnect()
}
