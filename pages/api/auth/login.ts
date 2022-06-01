import { NextApiRequest, NextApiResponse } from 'next'
import User from '../../../models/User'

export default async function login(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log('login.......', req.body)

    try{
        const users = await User.find()
        console.log({users})
    }
    catch(err){
        console.log({err})
    }
}
