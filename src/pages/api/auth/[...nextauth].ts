
import axios from 'axios'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import dbConnect from '../../../lib/dbConnect'

import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '../../../lib/mongodb'
import { serverUrl } from '../../../config'

dbConnect()
export default NextAuth({
    adapter: MongoDBAdapter(clientPromise),

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
                username: {label: 'username', type: 'text'},

            },
            async authorize(credentials, req) {
                const email = credentials?.email
                const password = credentials?.password
                const username = credentials?.username

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
        })
       
    ],

    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        // jwt: async ({ token, user }) => {
        //     user && (token.user = user)
        //     console.log('callback token', {token})
        //     return token
        // },
        // session: async ({ session, token }) => {
        //     session.user = token

        //     console.log('callback session', {session}, {token})
        //  return session
        // },
        // signIn: async ({user}) => {
        //     console.log({user})
        //     if (user) {
        //         return '/dashboard'
        //     } else {
        //         return false

        //     }
        // },
        async redirect({ url, baseUrl }) {
            // Allows relative callback URLs
            return `${baseUrl}/dashboard`
        },
    },
    // events: {
    //     signIn: async ({ account, user, isNewUser, profile }) => {
    //         console.log('events sign in', { account, user, isNewUser, profile })
    //     },
    //     signOut: async ({ session, token }) => {
    //         console.log('events sign out', session, token)
    //     },
    //     createUser: async ({ user }) => {
    //         console.log('events createuser', { user })
    //     },
    //     session: async ({ session, token }) => {
    //         console.log('events session', { session, token })
    //     },
    // },
    //     theme: {
    //         colorScheme: 'dark',
    //     },

    secret: process.env.JWT_SECRET,
})
