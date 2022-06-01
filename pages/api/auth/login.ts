import { NextApiRequest, NextApiResponse } from 'next'
import User from '../../../models/User'

export default async function login(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log('login.......', req.body)

    const users = await User.find()
    console.log({users})
}
