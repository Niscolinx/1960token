import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    const { cookies } = req
    const sessionToken = cookies['next-auth.session-token']

    let auth: Boolean = false

    sessionToken ? (auth = true) : (auth = false)

    console.log('the auth', { auth })

    // if (!auth && req.url.includes('dashboard')) {
    //     const url = req.nextUrl.clone()
    //     url.pathname = '/api/auth/signin'
    //     return NextResponse.rewrite(url)
    // }
}
