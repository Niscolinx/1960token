import bcrypt from 'bcryptjs'
import { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../lib/dbConnect'
import User from '../../models/User'

export default async function storeGeneratedCode(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { code } = req.body

    try {
        await dbConnect()
        

        return res.status(200).json('')
    } catch (err) {
        console.log({ err })
        res.status(400).json('error')
    }
}
