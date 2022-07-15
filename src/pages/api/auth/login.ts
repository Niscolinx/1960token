import bcrypt from 'bcryptjs'
import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import User, { IUser } from '../../../models/User'
import dbConnect from '../../../lib/dbConnect'
import { setCookie } from 'cookies-next'

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    console.log('login...', req.body)

    const { emailOrUsername, password } = req.body

    try {
        await dbConnect()

        const email: IUser | null = await User.findOne({
            email: emailOrUsername,
        })
        const username: IUser | null = await User.findOne({
            username: emailOrUsername,
        })

        const user = email || username

        if (!user) {
            return res.status(401).json('Not found')
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
            process.env.JWT_SECRET!,
            {
                expiresIn: '1hr',
            }
        )
        setCookie('userSession', user)

        return res.status(200).json(
            user
            //token,
        )
    } catch (err) {
        console.log({ err })
        res.status(400).json('error')
    }
}
