import { IUser } from './../../../models/User'
import bcrypt from 'bcryptjs'
import { NextApiRequest, NextApiResponse } from 'next'
import User from '../../../models/User'
import jwt from 'jsonwebtoken'

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    console.log('login...', req.body)

    const { email, password } = req.body

    try {
        const user: IUser | null = await User.findOne({ email })

        if (!user) {
            throw new Error('Invalid User')
        }

        const checkPassword = await bcrypt.compare(password, user!.password)
        if (!checkPassword) {
            throw new Error('Incorrect Password')
        }

        const token = jwt.sign(
            {
                email,
                userId: user!._id.toString(),
            },
            process.env.JWT_SECRET!, {
                expiresIn: '1hr'
            }
        )

        return res.status(200).json({
            user,
            token
        })
    } catch (err) {
        console.log({ err })
        res.status(400).json('error')
    }
}
