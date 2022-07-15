import { IUser } from '../../models/User'
import { NextApiRequest, NextApiResponse } from 'next'
import User from '../../models/User'

export default async function user(req: NextApiRequest, res: NextApiResponse) {
    console.log('req body', req.body)
    const { email }: IUser = req.body.user

    const user = await User.findOne({ email })

    return res.json(user)
}
