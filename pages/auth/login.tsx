import React, { useState } from 'react'
import axios from 'axios'
import { CtxOrReq } from 'next-auth/client/_utils'
import { getCsrfToken, getProviders, signIn } from 'next-auth/react'
import Router from 'next/router'

interface LoginProps {
    csrfToken: string;
    providers: {
        [key:string]: {
            id: string;
            name: string;
        }
    }
}

const Login = ({ csrfToken, providers }: LoginProps) => {
    console.log({providers})
    type message = { value: string; type?: string; style?: string }

    const [email, setEmail] = useState('hello@hello.com')
    const [password, setPassword] = useState('testing')
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
            }

            if (key === 'email') {
                const checkemail = isValidMail(value.toString())

                if (!checkemail) {
                    isError = true
                    setErrorFields((oldArr) => [...oldArr, key])
                }

            }

            else if(!isError){
                
                console.log('sign in.....', isError)
                signIn('credentials', { redirect:false, email, password }).then((success) => {
                    console.log({success})
                    Router.push('/dashboard')
                }).catch((err) => {
                    console.log({err})
                })
            }
        }

        setError(isError)
        if (!isError) {
            console.log('sending protocol')
            try {
                axios
                    .post('/api/auth/login', {
                        email,
                        password,
                    })
                    .then(({ data }) => {
                        console.log({ data })
                    })
            } catch (err) {
                console.log({ err })
            }
        }
    }

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrorFields([])
        setMessageDisplay('hidden')
        const { name, value } = e.target

        switch (name) {
            case 'email':
                setEmail(value)
                break
            case 'password':
                setPassword(value)
                break
            default:
                ''
                break
        }
    }

    return (<>
        <div className='w-full md:w-1/3 mx-auto'>
            <form
                id='login'
                className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-10'
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
                        Email
                    </label>
                 
                    <input
                        className={`shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                            error && errorFields.includes('email')
                                ? 'border-red-500'
                                : ''
                        }`}
                        id='email'
                        type='email'
                        name='email'
                        required
                        value={email}
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
                        className={`shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
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

                <div className='grid justify-center gap-2  md:gap-0 md:flex items-center md:justify-between'>
                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline'
                        type='submit'
                    >
                        Sign In
                    </button>

                    <a
                        className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
                        href='#'
                    >
                        Forgot Password?
                    </a>
                </div>
            </form>

            {Object.values(providers).map((provider) => {
                if(provider.name === 'Credentials') {
                    return
                }
                
                return <div key={provider.id} className='grid justify-center'>
                    <button onClick={() => signIn(provider.id)}>Sign in with {provider.name}</button>
                </div>
            })}
        </div>
            <p className='text-center text-gray-500 text-xs mt-auto'>
                &copy;2022 1960token. All rights reserved.
            </p>
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
