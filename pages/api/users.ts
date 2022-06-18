import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../models/User';

export default async function users(req:NextApiRequest, res:NextApiResponse) {
    console.log(req.body)

    const {user} = req.body

    const users = await User.find()
    console.log({users})
    
}

