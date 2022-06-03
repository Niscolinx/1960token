import { IUser } from './../../../models/User'
import bcrypt from 'bcryptjs'
import { NextApiRequest, NextApiResponse } from 'next'
import User from '../../../models/User'
import jwt from 'jsonwebtoken'

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    console.log('login.......', req.body)

    const { email, password } = req.body

    try {
        const user: IUser | null = await User.findOne({ email })

        if (!user) {
            return res.status(400).json('invalid user')
        }

        const checkPassword = await bcrypt.compare(password, user!.password)
        if (!checkPassword) {
            return res.status(401).json('Incorrect password')
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

        console.log('***************cleared')

        return res.status(200).json({
            user,
            token
        })
    } catch (err) {
        console.log({ err })
        res.status(400).json('error')
    }
}
