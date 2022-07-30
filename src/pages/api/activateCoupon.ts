import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../lib/dbConnect'
import GeneratedCode from '../../models/generatedCode'
import User from '../../models/User'

export default async function activateCoupon(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { coupon, user, toCheck } = req.body


    try {
        await dbConnect()

        const code = await GeneratedCode.findOne({
            code: coupon,
        })

        if (!code) {
            return res.status(401).json('Code not found')
        }

        if (code.isUsed) {
            return res.status(401).json('Code already used')
        }

        if (!toCheck) {
            code.isUsed = true

            await code.save()

            const getUser = await User.findOne({ email: user.email })

            getUser.isVerified = true

            await getUser.save()

            return res.status(200).json('Successfully activated')
        } else {
            return res.status(200).json('valid coupon')
        }
    } catch (err) {
        console.log({ err })
        res.status(400).json('error')
    }
}
