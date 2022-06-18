
import { IUser } from '../../models/User'
import { NextApiRequest, NextApiResponse } from 'next'
import User from '../../models/User'

export default async function StartMining(req: NextApiRequest, res: NextApiResponse) {
    console.log('req body', req.body)

    const { email }: IUser = req.body.session.user
    const { date } = req.body

    const user = await User.findOne({ email })

    if (user.isMining) {
        console.log('mining started already')
        return res.json({
            miningSession: user.miningStart,
            isMining: true,
        })
    } else {
        console.log('start user mining')
        user.miningStart = date
        user.isMining = true
        await user.save()

        return res.json({
            isMining: user.isMining,
        })
    }
}

