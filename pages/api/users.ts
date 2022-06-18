import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../models/User';

export default async function users(req:NextApiRequest, res:NextApiResponse) {

    const users = await User.find()
    console.log({users})
    
    console.log(req.body)
}

