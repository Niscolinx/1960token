import type { NextFetchEvent, NextRequest } from 'next/server'

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
 
    const {cookies} = req

     const sessionToken = cookies['next-auth.session-token'

    if()
}
