import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import dbConnect from '../../../lib/dbConnect'

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
                username: {
                    label: 'Email',
                    type: 'email',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                console.log({req, credentials})
                
                const res = await fetch('/your/endpoint', {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { 'Content-Type': 'application/json' },
                })
                const user = await res.json()

                console.log({user})

                // If no error and we have user data, return it
                if (res.ok && user) {
                    console.log("success")
                    return user
                }
                // Return null if user data could not be retrieved
                console.log('failed')
                return null
            },
            
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
        }),
    ],
    // pages: {
    //     signIn: '/auth/signin'
    // },
    secret: process.env.JWT_SECRET
})
