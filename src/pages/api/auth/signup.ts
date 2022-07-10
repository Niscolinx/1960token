import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User'
import UserReferral from '../../../models/userReferral'

async function signupHandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await dbConnect()

        if (req.method === 'POST') {
            console.log('req body', req.body)
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
            if (referral) {
                const checkReferral = await User.findOne({ username: referral })

                if (!checkReferral) {
                    return res.status(401).json({
                        message: 'Referral not found',
                    })
                } else {
                    console.log('referral found')
                    const userReferral = new UserReferral({
                        username,
                        level: 1,
                        referral: checkReferral
                    })

                    const referredUser = await userReferral.save()

                    console.log({referredUser})

                    // checkReferral.referral.push(referredUser)

                    // await checkReferral.save()

                    // console.log({checkReferral})

                    // if(checkReferral.upliner){
                    //     console.log("user upliner", checkReferral.upliner)
                    // }
                    // else{
                    //     console.log('no upliner')
                    // }
                }
            }

            // const storeUser = new User({
            //     email,
            //     password: await bcrypt.hash(password, 12),
            //     username,
            //     phoneNumber,
            //     referral
            // })

            // const verifyStored = await storeUser.save()

            // if (verifyStored) {
            //     res.status(201).json({
            //         message: 'successful',
            //     })
            // }
            // else{
            //     res.status(404).json({
            //         message: 'failed'
            //     })
            // }
        } else {
            //Response for other methods other than POST
            res.status(500).json({ message: 'Route not valid' })
        }
    } catch (err) {
        console.log({ err })
    }
}

export default signupHandler
