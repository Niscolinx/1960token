import { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from 'mongodb'
import { hash } from 'bcryptjs'
import dbConnect from '../../../lib/dbConnect';


async function signupHandler(req:NextApiRequest, res:NextApiResponse) {

    const MONGODB_URI: string = process.env.MONGODB_URI || ''

    console.log('=============')
    console.log("req", req.body)

    //Only POST mothod is accepted
    try{
    if (req.method === 'POST') {
        console.log("checking")
        //Getting email and password from body
        const { email, password, username } = req.body
        //Validate
        if (!email || !email.includes('@') || !password) {
            console.log('failed')
            res.status(422).json({ message: 'Invalid Data' })
            return
        }

        await dbConnect()

    } else {
        //Response for other than POST method
        res.status(500).json({ message: 'Route not valid' })
    }}
    catch(err) {
        console.log({err})
    }
}

export default signupHandler
