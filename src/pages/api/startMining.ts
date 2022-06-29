import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'
import User, { IUser } from '../../models/User'

interface returnTypeJson {
    miningStartedAt: string
    isMining: boolean
}

type JsonType<returnTypeJson> = (body: returnTypeJson) => object

export interface TypedReqBody<T> extends NextApiResponse {
    json: JsonType<T>
}

export default async function StartMining(
    req: NextApiRequest,
    res: TypedReqBody<returnTypeJson>
) {
    const startTimeStamp = dayjs().add(12, 'hours')

    const { email }: IUser = req.body.session

    const user = await User.findOne({ email })

    console.log({user})

    if (user.isMining) {
        return res.json({
            miningStartedAt: user.miningStartedAt,
            isMining: user.isMining,
        })
    } else {
        user.miningStartedAt = startTimeStamp
        user.isMining = true
        await user.save()

        return res.json({
            isMining: user.isMining,
            miningStartedAt: user.miningStartedAt,
        })
    }
}
