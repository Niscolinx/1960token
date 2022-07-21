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

    
    const updatedTransaction = new Transaction({
        type: 'transfer',
        status: 'Approved',
        creator: user,
        amount: portfolio
    })

    await updatedTransaction.save()

    console.log({updatedTransaction})
    
    await user.transactions.push(updatedTransaction)

    await user.save()

    console.log({user})

    return res.json({
        updatedPortfolio: user.portfolio,
    })
}
