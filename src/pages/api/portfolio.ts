import { NextApiRequest, NextApiResponse } from 'next'
import User, { IUser } from '../../models/User'
import Transaction from '../../models/transaction'

interface returnTypeJson {
    updatedPortfolio: number
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
    const { portfolio } = req.body

    const user = await User.findOne({ email })

    user.portfolio += portfolio
    user.tokensMined = 0
    user.videoMined = 0
    user.referralBonus = 0

    await user.save()

    await new Transaction({
        type: 'transfer',
        status: 'Approved',
        amount: portfolio
    }).save()

    return res.json({
        updatedPortfolio: user.portfolio,
    })
}
