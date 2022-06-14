import { redirect } from 'next/dist/server/api-utils'
import type { NextFetchEvent, NextRequest } from 'next/server'

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
 
    const {cookies} = req

     const sessionToken = cookies['next-auth.session-token']

     let auth:Boolean = false

     sessionToken ? auth = true : auth = false

     console.log('the auth', {auth})

    if(!auth && req.url.includes('dashboard')){
        
    }
   
}
