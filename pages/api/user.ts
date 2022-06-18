import { IUser } from '../../models/User';
import { NextApiRequest, NextApiResponse } from 'next';
import User from '../../models/User';

export default async function user(req:NextApiRequest, res:NextApiResponse) {
    console.log('req body', req.body)

    const {email}:IUser = req.body.session.user
    const {date} = req.body

    const user = await User.findOne({email})

    if(user.miningStart){
        console.log("mining started already")
    }
    else{
        console.log("start user mining")
        user.miningStart = date
    }

    await user.save()
    console.log({user})
    
}

