import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'
import User, { IUser } from '../../models/User'

 interface returnTypeJson {
     miningStart: string
     isMining: boolean
 }

 type JsonType<returnTypeJson> = (body: returnTypeJson) => void

 export interface TypedReqBody<T> extends NextApiResponse {
    json: JsonType<T>
 }

export default async function StartMining(
    req: NextApiRequest,
    res: TypedReqBody<returnTypeJson>
) {
    console.log('req body', req.body)

   

    const startTimeStamp = dayjs().add(12, 'hours')

    const { email }: IUser = req.body.user

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
        user.isMining = true
        await user.save()

        return res.json({
            isMining: user.isMining,
            miningStart: user.miningStart,
        })
    }
}
