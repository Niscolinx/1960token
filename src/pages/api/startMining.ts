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

    const { email }: IUser = req.body.user

    const user = await User.findOne({ email })

    console.log({ user })

    if (user.isMining) {
        console.log('mining started already')
       return res.json({
           miningStartedAt: user.miningStartedAt,
           isMining: true,
       })
    } else {
        console.log('start user mining', {startTimeStamp})
        user.miningStartedAt = startTimeStamp
        const updatedUser = await user.save()

        console.log({updatedUser})

        return res.json({
            isMining: user.isMining,
            miningStartedAt: user.miningStartedAt,
        })
    }
}
