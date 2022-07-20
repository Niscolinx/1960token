import axios from 'axios'
import { GetSessionParams, getSession } from 'next-auth/react'
import router from 'next/router'
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../store/app/hooks'
import { selectUser } from '../../store/features/user/UserSlice'

function profile() {
    type message = { value: string; type?: string; style?: string }

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState<number>()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<message>({
        value: 'invalid Entries',
        type: 'error',
        style: 'text-red-500',
    })
    const [messageDisplay, setMessageDisplay] = useState('hidden')

    useEffect(() => {
        const userJSON = localStorage.getItem('userSession')

        if (userJSON) {
            const userData = JSON.parse(userJSON)

            const { email, username, phoneNumber } = userData
            setEmail(email)
            setUsername(username)
            setPhoneNumber(Number(phoneNumber))
        }
    }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData(e.currentTarget)

        let isError = false
        for (let [key, value] of formData.entries()) {
            if (!value && key !== 'referral') {
                isError = true
                setMessage({
                    value: "Value can't be empty",
                    type: 'error',
                    style: 'text-red-500',
                })
                setMessageDisplay('block')
                setLoading(false)
            }

            if (key === 'confirmPassword' && password !== confirmPassword) {
                isError = true
                setMessageDisplay('block')
                setMessage({ ...message, value: 'Passwords do not match' })
                setLoading(false)
            }
        }

        setError(isError)
        if (!isError) {
            axios
                .post('/api/profile', {
                    username: username.toLowerCase().trim(),
                    email: email.toLowerCase().trim(),
                    phoneNumber,
                    password,
                })
                .then(({ data }) => {
                    console.log({ data })
                    setMessage({
                        value: data.message,
                        type: 'success',
                        style: 'text-green-500 font-semibold uppercase',
                    })
                    setMessageDisplay('block')
                    setLoading(false)

                    setTimeout(() => {
                        router.push('/auth/login')
                    }, 500)
                })
                .catch(({ response: { data } }) => {
                    setMessageDisplay('block')
                    setLoading(false)
                    setMessage({ ...message, value: data.message })
                })
        }
    }

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessageDisplay('hidden')
        const { name, value } = e.target

        switch (name) {
            case 'password':
                setPassword(value)
                break
            case 'confirmPassword':
                setConfirmPassword(value)

            default:
                ''
                break
        }
    }
    return (
        <div className='px-4'>
            <form
                id='register'
                className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 grid m-2 gap-6'
                onSubmit={handleSubmit}
            >
                <div className='mb-2'>
                    <p
                        className={`${messageDisplay} ${message?.style} text-sm text-center mb-5`}
                    >
                        {message?.value}
                    </p>
                    <div className='grid'>
                        <h3 className='font-bold text-lg text-black border-b border-b-gray-400 mb-4'>
                            Personal
                        </h3>

                        <div>
                            <label
                                className='block text-gray-700 text-sm mb-1'
                                htmlFor='username'
                            >
                                Username
                            </label>
                            <input
                                className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 bg-gray-400 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white`}
                                id='username'
                                name='username'
                                disabled
                                type='text'
                                minLength={4}
                                value={username}
                                onChange={changeHandler}
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            className='block text-gray-700 text-sm mb-1'
                            htmlFor='phoneNumber'
                        >
                            Phone No
                        </label>
                        <input
                            className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 bg-gray-400 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white `}
                            id='phoneNumber'
                            type='number'
                            name='phoneNumber'
                            disabled
                            value={phoneNumber}
                            onChange={changeHandler}
                        />
                    </div>
                    <div>
                        <label
                            className='block text-gray-700 text-sm mb-1'
                            htmlFor='username'
                        >
                            Email
                        </label>
                        <input
                            className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 bg-gray-400 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white `}
                            id='email'
                            type='email'
                            name='email'
                            disabled
                            value={email}
                            onChange={changeHandler}
                        />
                    </div>
                </div>

                <div className='grid'>
                    <h3 className='font-bold text-lg text-black border-b border-b-gray-400 mb-4'>
                        Change Password
                    </h3>
                    <div>
                        <label
                            className='block text-gray-700 text-sm mb-1'
                            htmlFor='password'
                        >
                            Password
                        </label>
                        <input
                            className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white `}
                            id='password'
                            name='password'
                            type='password'
                            minLength={6}
                            required
                            value={password}
                            onChange={changeHandler}
                        />
                    </div>
                    <div>
                        <label
                            className='block text-gray-700 text-sm mb-1'
                            htmlFor='confirmPassword'
                        >
                            Confirm Password
                        </label>
                        <input
                            className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white `}
                            id='confirmPassword'
                            name='confirmPassword'
                            type='password'
                            minLength={6}
                            required
                            value={confirmPassword}
                            onChange={changeHandler}
                        />
                    </div>
                </div>
                <div className='grid'>
                    <h3 className='font-bold text-lg text-black border-b border-b-gray-400 mb-4'>
                        Wallet Address
                    </h3>

                    <div>
                        <label
                            className='block text-gray-700 text-sm mb-1'
                            htmlFor='confirmPassword'
                        >
                            USDT TRC20
                        </label>
                        <input
                            className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white`}
                            id='confirmPassword'
                            name='confirmPassword'
                            type='text'
                            minLength={6}
                            required
                            value={confirmPassword}
                            onChange={changeHandler}
                        />
                    </div>
                </div>

                <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline  justify-self-center'
                    type='submit'
                >
                    {loading ? 'Loading...' : 'Submit'}
                </button>
            </form>
        </div>
    )
}

export default profile

export async function getServerSideProps(
    context: GetSessionParams | undefined
) {
    const session = await getSession(context)

    if (!session) {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false,
            },
        }
    }

    return {
        props: { session },
    }
}
