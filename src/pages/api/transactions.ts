import { IUser } from '../../models/User'
import { NextApiRequest, NextApiResponse } from 'next'
import User from '../../models/User'
import transaction from '../../models/transaction'

export default async function transactions(req: NextApiRequest, res: NextApiResponse) {
    const { email }: IUser = req.body.user

    const user = await User.findOne({ email })

    const transactions = await transaction.find({ user: user._id })

    console.log({transactions})


    return res.json(user)
}
