import { NextApiRequest, NextApiResponse } from 'next'
import User, { IUser } from '../../models/User'

interface returnTypeJson {
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
    console.log(req.body)
    const { email }: IUser = req.body.session.user


    const user = await User.findOne({ email })

    user.portfolio = portfolio
    await user.save()

    return res.json({
        totalMined: user.totalMined,
    })
}
