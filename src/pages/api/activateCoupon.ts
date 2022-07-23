import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../lib/dbConnect'
import GeneratedCode from '../../models/generatedCode'

export default async function activateCoupon(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { coupon } = req.body

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

        code.isUsed = true
        await code.save()

        return res.status(200).json('Successfully activated')

    } catch (err) {
        console.log({ err })
        res.status(400).json('error')
    }
}
