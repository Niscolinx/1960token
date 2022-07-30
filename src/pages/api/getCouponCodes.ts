import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../lib/dbConnect'
import GeneratedCode from '../../models/generatedCode'

export default async function storeGeneratedCode(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        await dbConnect()

        const generatedCodes = await GeneratedCode.find()

        return res.status(200).json(generatedCodes)
    } catch (err) {
        res.status(400).json('error')
    }
}
