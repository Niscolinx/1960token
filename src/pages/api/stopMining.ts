import { NextApiRequest, NextApiResponse } from 'next'
import User, { IUser } from '../../models/User'

interface returnTypeJson {
    miningStartedAt: string
    isMining: boolean
    totalMined: number
}

type JsonType<returnTypeJson> = (body: returnTypeJson) => object

export interface TypedReqBody<T> extends NextApiResponse {
    json: JsonType<T>
}

export default async function StartMining(
    req: NextApiRequest,
    res: TypedReqBody<returnTypeJson>
) {
    const { email }: IUser = req.body.user

    const user = await User.findOne({ email })

    console.log("the user", user)

    user.miningStartedAt = ''
    user.isMining = false
    user.totalMined = user.totalMined + 0.5
    await user.save() 

    return res.json({
        isMining: user.isMining,
        miningStartedAt: user.miningStartedAt,
        totalMined: user.totalMined
    })
}
