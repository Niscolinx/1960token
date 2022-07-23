import React, { useState } from 'react'
import axios from 'axios'
import { CtxOrReq } from 'next-auth/client/_utils'
import { getCsrfToken, getProviders, signIn } from 'next-auth/react'
import Router from 'next/router'
import Link from 'next/link'

interface LoginProps {
    csrfToken: string
    providers: {
        [key: string]: {
            id: string
            name: string
        }
    }
}

const Login = ({ providers }: LoginProps) => {
    type message = { value: string; type?: string; style?: string }

    const [emailOrUsername, setEmailOrUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [errorFields, setErrorFields] = useState<string[]>([])
    const [error, setError] = useState(false)
    const [message, setMessage] = useState<message>({
        value: 'invalid Entries',
        type: 'error',
        style: 'text-red-500',
    })
    const [messageDisplay, setMessageDisplay] = useState('hidden')

    const isValidMail = (e: string): Boolean => {
        const emailRegex = new RegExp(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )

        const isValid = emailRegex.test(e)

        return isValid
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        if (
            emailOrUsername.toLowerCase() === 'admin@1960token.com' ||
            emailOrUsername.toLowerCase() === 'admin'
        ) {
            // admin login
            //send an axios post request to the server
            return axios
                .post('/api/auth/login', {
                    admin: true,
                    emailOrUsername: emailOrUsername.toLowerCase(),
                    password,
                })
                .then((res) => {
                    console.log('res', res.data)
                    setLoading(false)
                    

                        Router.push('/adminDashboard')
                    
                }).catch((err) => {
                    setLoading(false)
                    console.log('err', err)
                    setError(true)
                    setMessage({
                        value: 'Login Failed',
                        type: 'error',
                        style: 'text-red-500',
                    })
                    setMessageDisplay('block')
                })
        }

        const formData = new FormData(e.currentTarget)

        let isError = false
        for (let [key, value] of formData.entries()) {
            if (!value) {
                isError = true
                setMessage({
                    value: "Value can't be empty",
                    type: 'error',
                    style: 'text-red-500',
                })
                setErrorFields((oldArr) => [...oldArr, key])
                setMessageDisplay('block')
                setLoading(false)
            } else if (!isError) {
                console.log('sign in.....', isError)
                signIn('credentials', {
                    redirect: false,
                    emailOrUsername: emailOrUsername.toLowerCase().trim(),
                    password: password,
                }).then((data: any) => {
                    console.log('data returned', data)
                    setLoading(false)

                    if (data.error) {
                        setError(true)
                        setLoading(false)
                        setMessage({
                            value: 'Invalid User',
                            type: 'error',
                            style: 'text-red-500',
                        })
                        setMessageDisplay('block')
                        return
                    }
                    Router.push('/dashboard')
                })
            }
        }
    }

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrorFields([])
        setMessageDisplay('hidden')
        const { name, value } = e.target

        switch (name) {
            case 'emailOrUsername':
                setEmailOrUsername(value)
                break
            case 'password':
                setPassword(value)
                break
            default:
                ''
                break
        }
    }

    return (
        <>
            <div className='w-full md:w-1/3 mx-auto h-[93vh]'>
                <form
                    id='login'
                    className='bg-white rounded px-8 pt-6 pb-8 mb-4 mt-10 m-2'
                    onSubmit={handleSubmit}
                >
                    <p
                        className={`${messageDisplay} ${message?.style} text-sm text-center mb-5`}
                    >
                        {message?.value}
                    </p>

                    <div className='mb-4'>
                        <label
                            className='block text-gray-700 text-sm font-bold mb-2'
                            htmlFor='username'
                        >
                            Email or Username
                        </label>

                        <input
                            className={`shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white ${
                                error && errorFields.includes('email')
                                    ? 'border-red-500'
                                    : ''
                            }`}
                            id='emailOrUsername'
                            type='text'
                            name='emailOrUsername'
                            required
                            value={emailOrUsername}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className='mb-6'>
                        <label
                            className='block text-gray-700 text-sm font-bold mb-2'
                            htmlFor='password'
                        >
                            Password
                        </label>
                        <input
                            className={`shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white ${
                                error && errorFields.includes('password')
                                    ? 'border-red-500'
                                    : ''
                            }`}
                            id='password'
                            name='password'
                            type='password'
                            minLength={6}
                            required
                            value={password}
                            onChange={changeHandler}
                        />
                    </div>

                    <div className='grid justify-center gap-2  md:gap-0 md:flex items-center'>
                        <button
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline'
                            type='submit'
                        >
                            {loading ? 'Loading...' : 'Sign In'}
                        </button>
                    </div>
                </form>

                <div className='grid mt-10 gap-2 px-8 justify-start'>
                    <Link href='/auth/register'>
                        <button className='bg-orange-300 text-[#1a1a2d] rounded px-2 py-1 text-left justify-self-start'>
                            Register
                        </button>
                    </Link>

                    <a
                        className='inline-block align-baseline text-sm text-blue-500 hover:text-blue-800'
                        href='#'
                    >
                        Forgot Password?
                    </a>
                </div>
            </div>
            {/* <p className='text-center text-gray-500 text-xs mt-auto mt-5'>
                &copy;2022 1960token. All rights reserved.
            </p> */}
        </>
    )
}

export default Login

export async function getServerSideProps(context: CtxOrReq | undefined) {
    const csrfToken = await getCsrfToken(context)
    const providers = await getProviders()

    return {
        props: {
            csrfToken,
            providers,
        },
    }
}
