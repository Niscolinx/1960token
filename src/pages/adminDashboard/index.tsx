import { GetServerSidePropsContext } from 'next'
import React, { useState } from 'react'

function index() {
  const [generatedCode, setGeneratedCode] = useState('')


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
        <div className='h-[100vh] py-5 px-8'>
            <h1 className='text-lg font-bold'>Welcome Admin</h1>
            <div className='grid'>
                <div className='grid'>
                    <p>{generatedCode}</p>
                    style a button using tailwindcss
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Generate</button>
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
