import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/User'

async function signupHandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await dbConnect()

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
                message: 'Email already exists',
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
                const userReferral = {
                    username,
                    level: 1,
                }

                checkReferral.referrals.push(userReferral)

                await checkReferral.save()

                if (checkReferral.upliner) {
                    console.log('user upliner', checkReferral.upliner)
                } else {
                    console.log('no upliner')
                }
            }
        }

        const storeUser = new User({
            email,
            password: await bcrypt.hash(password, 12),
            username,
            phoneNumber,
            upliner: referral,
        })

        const verifyStored = await storeUser.save()

        if (verifyStored) {
            res.status(201).json({
                message: 'successful',
            })
        } else {
            res.status(404).json({
                message: 'failed',
            })
        }
    } catch (err) {
        console.log({ err })
    }
}

export default signupHandler
