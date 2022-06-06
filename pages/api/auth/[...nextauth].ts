import { serverUrl } from './../../../config/index'
import axios from 'axios'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import dbConnect from '../../../lib/dbConnect'
import { redirect } from 'next/dist/server/api-utils'

dbConnect()
export default NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                const email = credentials?.email
                const password = credentials?.password

                return axios
                    .post(`${serverUrl}/api/auth/login`, {
                        email,
                        password,
                    })
                    .then(({ data }) => {
                        console.log({ data })
                        return data
                    })
                    .catch((err) => {
                        console.log({ err })
                        return 
                    })
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
    ],
    pages: {
        signIn: '/auth/signin'
    },
    callbacks: {},
    jwt: {},
    secret: process.env.JWT_SECRET,
})
