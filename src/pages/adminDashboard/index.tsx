import { GetServerSidePropsContext } from 'next'
import React from 'react'

function index() {
    //generate random numbers mixed with letters of length 6
    const randomString = () => {
        const possible =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        let randomString = ''
        for (let i = 0; i < 6; i++) {
            randomString += possible.charAt(
                Math.floor(Math.random() * possible.length)
            )
        }
        return randomString
    }

    console.log(randomString())

    return (
        <div className='h-[100vh]'>
            <h1>Welcome Admin</h1>
            <div className='grid'>
                <div className='grid'>
                    <p>{generatedCode}</p>
                </div>
            </div>
        </div>
    )
}

export default index

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const token = context.req.cookies.adminToken
    if (!token) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            },
        }
    }
    return {
        props: {
            isAuthenticated: true,
        },
    }
}
