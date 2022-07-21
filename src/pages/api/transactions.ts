import { IUser } from '../../models/User'
import { NextApiRequest, NextApiResponse } from 'next'
import User from '../../models/User'
import transaction from '../../models/transaction'

export default async function transactions(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { email }: IUser = req.body.user

    const user = await User.findOne({ email })

    if (!user) {
        return res.status(404).json('User not found')
    }
    const transactions = await transaction.find({ creator: user._id })

    return res.json(transactions)
}
