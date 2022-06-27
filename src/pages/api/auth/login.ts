import bcrypt from 'bcryptjs'
import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import User, { IUser } from '../../../models/User'
import dbConnect from '../../../lib/dbConnect'

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

       // console.log({email, username})

       const user = email || username

        if (!user) {
           console.log("not found")
           return res.status(401).json('Not found')
        } else {
            console.log('====================', user)
           return res.status(200).json(user)
        }

        // const checkPassword = await bcrypt.compare(password, user!.password)
        // if (!checkPassword) {
        //     return res.status(401).json('Incorrect password')
        // }

        // const token = jwt.sign(
        //     {
        //         email,
        //         userId: user!._id.toString(),
        //     },
        //     process.env.JWT_SECRET!,
        //     {
        //         expiresIn: '1hr',
        //     }
        // )

        // return res.status(200).json({
        //     user,
        //     token,
        // })
    } catch (err) {
        console.log({ err })
        res.status(400).json('error')
    }
}