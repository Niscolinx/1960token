import { NextApiRequest, NextApiResponse } from 'next'
import User, { IUser } from '../../models/User'


export default async function StartMining(
    req: NextApiRequest,
    res: NextApiResponse
){
    console.log('req body', req.body)

    const { email }: IUser = req.body.session.user

    console.log('email found', { email }, { remainingTime })

    const user = await User.findOne({ email })

    console.log({ user })


    if (user.isMining) {
        console.log('mining started already')
        return res.json({
            miningStart: user.miningStart,
            isMining: true,
        })
    } else {
        console.log('start user mining')
        user.miningStart = remainingTime
        user.isMining = true
        await user.save()

        return res.json({
            isMining: user.isMining,
            miningStart: user.miningStart,
        })
    }
}

