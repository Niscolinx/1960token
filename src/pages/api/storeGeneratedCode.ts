import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../lib/dbConnect'
import GeneratedCode from '../../models/generatedCode'

export default async function storeGeneratedCode(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { code } = req.body

    try {
        await dbConnect()

        const generatedCode = await new GeneratedCode({
            code
        }).save()

        return res.status(200).json(generatedCode)
    } catch (err) {
        console.log({ err })
        res.status(400).json('error')
    }
}
