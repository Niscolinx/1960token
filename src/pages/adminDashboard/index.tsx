import { GetServerSidePropsContext } from 'next'
import React, { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

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

    const handleRandom = () => {
        setGeneratedCode(randomString())
    }

    return (
        <div className='h-[100vh] py-5 px-8'>
            <h1 className='text-lg font-bold'>Welcome Admin</h1>
            <div className='grid mt-5'>
                <div className='grid gap-2'>
                    {generatedCode.length > 0 ? (
                        <>
                            <div className=' text-white font-bold py-4 px-4 rounded flex justify-between items-center font-semibold border border-gray-300'>
                                <p className='bg-orange-500 hover:bg-orange-700 rounded-lg py-1 px-3'>
                                    {generatedCode}
                                </p>
                                <CopyToClipboard text={generatedCode}>
                                    <button className='bg-green-500 rounded-lg py-1 px-3  justify-self-center place-self-end'>
                                        Copy Code
                                    </button>
                                </CopyToClipboard>{' '}
                            </div>
                        </>
                    ) : null}

                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded justify-self-center'
                        onClick={handleRandom}
                    >
                        Generate
                    </button>
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
