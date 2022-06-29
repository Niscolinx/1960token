import dayjs from 'dayjs'
import { NextApiRequest, NextApiResponse } from 'next'
import User, { IUser } from '../../models/User'

 interface returnTypeJson {
     miningStart: string
     isMining: boolean
 }

 interface myReturnType {
     [name: string]: returnTypeJson
 }

 export interface TypedReqBody<returnTypeJson> extends NextApiResponse {
    body: returnTypeJson
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
       return {
            miningStart: user.miningStart,
            isMining: true,
        }
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
