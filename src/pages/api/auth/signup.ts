import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User'

async function signupHandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await dbConnect()

        if (req.method === 'POST') {
            console.log('checking')
            //Getting email and password from body
            const { email, password, username, phoneNumber, referral } = req.body
            //Validate
            if (!email || !email.includes('@') || !password || !phoneNumber) {
                console.log('failed')
                res.status(422).json({ message: 'Invalid Data' })
                return
            }

            const existingUserEmail = await User.findOne({ email })
            const existingUsername = await User.findOne({
                username,
            })
            const existingPhoneNumber = await User.findOne({ phoneNumber })
            
            if(referral){
                console.log("referral added")
                const checkReferral = await User.findOne({referral})

                if(!checkReferral){
                    console.log("referral not found")
                }else{
                    console.log('referral exists')
                }
            }
            else{
                console.log('referral not added')
            }

            return res.json({
                message: 'working on referral'
            })


            if (existingUserEmail) {
                 return res.status(401).json({
                    message: 'Email already exists'
                 })
            }

            if (existingUsername) {
                 return res.status(401).json({
                     message: 'Username already taken',
                 })
            }

            if (existingPhoneNumber) {
                return res.status(401).json({
                    message: 'Number already in use',
                })
            }

            const storeUser = new User({
                email,
                password: await bcrypt.hash(password, 12),
                username,
                phoneNumber,
                referral
            })

            const verifyStored = await storeUser.save()
            console.log({ verifyStored })

            if (verifyStored) {
                res.status(201).json({
                    message: 'successful',
                })
            }
            else{
                res.status(404).json({
                    message: 'failed'
                })
            }
        } else {
            //Response for other methods other than POST
            res.status(500).json({ message: 'Route not valid' })
        }
    } catch (err) {
        console.log({ err })
    }
}

export default signupHandler
