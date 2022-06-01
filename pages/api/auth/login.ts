import { IUser } from './../../../models/User';
import  bcrypt  from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next'
import User from '../../../models/User'

export default async function login(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log('login.......', req.body)

    const {email, password} = req.body

    try{
        const user: IUser | null = await User.findOne({email})

        console.log(user)
        if(!user){
            res.status(400).json('invalid user')
        }


        const checkPassword = await bcrypt.compare(password, user!.password)

        console.log({checkPassword})
        res.status(200).json(
           {
               user
           }
        )
    }
    catch(err){
        console.log({err})
        res.status(400).json(
            'error'
        )
    }
}
