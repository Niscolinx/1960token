import bcrypt from 'bcryptjs'
import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import User, { IUser } from '../../../models/User'

export default async function login(req: NextApiRequest, res: NextApiResponse) {
    console.log('login...', req.body)

    const { emailOrUsername, password } = req.body

    try {
        const email: IUser | null = await User.findOne({ email: emailOrUsername })
        const username: IUser | null = await User.findOne({ username: emailOrUsername })

        if (!email || !username) {
            return res.status(400).json('invalid user')
        }else{
            console.log({email})
            console.log({username})
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

        return res.status(200).json({
            user,
            token
        })
    } catch (err) {
        console.log({ err })
        res.status(400).json('error')
    }
}
