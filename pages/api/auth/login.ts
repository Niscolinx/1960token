import { NextApiRequest, NextApiResponse } from 'next'
import User from '../../../models/User'

export default async function login(
    req: NextApiRequest,
    res: NextApiResponse
) {
    console.log('login.......', req.body)

    const {email, password} = req.body

    try{
        const user = await User.findOne({email})

        console.log(user)

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
