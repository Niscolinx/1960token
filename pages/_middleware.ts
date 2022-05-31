import type { NextFetchEvent, NextRequest } from 'next/server'
import dbConnect from '../lib/dbConnect'

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
    console.log("running")
    //await dbConnect()
}
