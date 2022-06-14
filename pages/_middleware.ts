import type { NextFetchEvent, NextRequest } from 'next/server'

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
 
    const {cookies} = req

    console.log('the cookies', cookies['next-auth.session-token'])

    console.log("req", req)
}
