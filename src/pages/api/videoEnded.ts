import { NextApiRequest, NextApiResponse } from 'next'
import User, { IUser } from '../../models/User'

interface returnTypeJson {
    videoMined: number
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

    user.videoMined = user.videoMined + 0.5
    await user.save()

    return res.json({
        videoMined: user.videoMined
    })
}
