import { IUser } from '../../models/User'
import { NextApiRequest, NextApiResponse } from 'next'
import User from '../../models/User'
import transaction from '../../models/transaction'

export default async function transactions(req: NextApiRequest, res: NextApiResponse) {
    const { email }: IUser = req.body.user

    const user = await User.findOne({ email })


   console.log(user.transactions)


    return res.json(user)
}
