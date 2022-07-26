import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'

const Register = () => {
    const router = useRouter()
    type message = { value: string; type?: string; style?: string }

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState<number>()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [referral, setReferral] = useState<string | undefined>('')
    const [errorFields, setErrorFields] = useState<string[]>([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<message>({
        value: 'invalid Entries',
        type: 'error',
        style: 'text-red-500',
    })
    const [messageDisplay, setMessageDisplay] = useState('hidden')

    useEffect(() => {
        const {reg} = router.query        
        setReferral(reg?.toString())
    }, [router])

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
                setErrorFields((oldArr) => [...oldArr, key])
                setMessageDisplay('block')
                setLoading(false)
            }

            if (key === 'email') {
                const checkEmail = isValidMail(value.toString())

                if (!checkEmail) {
                    isError = true
                    setErrorFields((oldArr) => [...oldArr, key])
                    setLoading(false)
                }
            }

            if (key === 'confirmPassword' && password !== confirmPassword) {
                isError = true
                setErrorFields((oldArr) => [...oldArr, key])
                setMessageDisplay('block')
                setMessage({ ...message, value: 'Passwords do not match' })
                setLoading(false)
            }
        }

        setError(isError)
        if (!isError) {
            axios
                .post('/api/auth/signup', {
                    username: username.toLowerCase().trim(),
                    email: email.toLowerCase().trim(),
                    phoneNumber,
                    referral: referral?.toLowerCase().trim(),
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
        setErrorFields([])
        setMessageDisplay('hidden')
        const { name, value } = e.target

        switch (name) {
            case 'username':
                setUsername(value)
                break
            case 'email':
                setEmail(value)
                break
            case 'phoneNumber':
                setPhoneNumber(Number(value))
                break
            case 'password':
                setPassword(value)
                break
            case 'confirmPassword':
                ;(() => {
                    setConfirmPassword(value)
                }).call(this)
                break
            case 'referral':
                setReferral(value)
                break
            default:
                ''
                break
        }
    }

    return (
        <div className='w-full md:w-1/3 mx-auto'>
            
            <form
                id='register'
                className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 grid m-2'
                onSubmit={handleSubmit}
            >
                <div className="grid">
                    <h3>
                        Welcome to 1960Token!
                    </h3>
                    <p>
                        Make sure you use a strong password and keep it away from others
                    </p>
                </div>
                <div className='mb-4'>
                    <p
                        className={`${messageDisplay} ${message?.style} text-sm text-center mb-5`}
                    >
                        {message?.value}
                    </p>
                    <label
                        className='block text-gray-700 text-sm font-bold mb-2'
                        htmlFor='username'
                    >
                        Username
                    </label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white ${
                            error && errorFields.includes('username')
                                ? 'border-red-500'
                                : ''
                        }`}
                        id='username'
                        name='username'
                        required
                        type='text'
                        minLength={4}
                        value={username}
                        onChange={changeHandler}
                    />
                </div>

                <div className='mb-4'>
                    <label
                        className='block text-gray-700 text-sm font-bold mb-2'
                        htmlFor='phoneNumber'
                    >
                        Phone No
                    </label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white ${
                            error && errorFields.includes('phoneNumber')
                                ? 'border-red-500'
                                : ''
                        }`}
                        id='phoneNumber'
                        type='number'
                        name='phoneNumber'
                        required
                        value={phoneNumber}
                        onChange={changeHandler}
                    />
                </div>
                <div className='mb-4'>
                    <label
                        className='block text-gray-700 text-sm font-bold mb-2'
                        htmlFor='username'
                    >
                        Email
                    </label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white ${
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
                <div className='mb-6'>
                    <label
                        className='block text-gray-700 text-sm font-bold mb-2'
                        htmlFor='confirmPassword'
                    >
                        Confirm Password
                    </label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white ${
                            error && errorFields.includes('confirmPassword')
                                ? 'border-red-500'
                                : ''
                        }`}
                        id='confirmPassword'
                        name='confirmPassword'
                        type='password'
                        minLength={6}
                        required
                        value={confirmPassword}
                        onChange={changeHandler}
                    />
                </div>
                <div className='mb-6'>
                    <label
                        className='block text-gray-700 text-sm font-bold mb-2'
                        htmlFor='referral'
                    >
                        Referral
                    </label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white`}
                        id='referral'
                        name='referral'
                        type='text'
                        placeholder='optional'
                        minLength={3}
                        value={referral}
                        onChange={changeHandler}
                    />
                </div>

                <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline  justify-self-center'
                    type='submit'
                >
                    {loading ? 'Loading...' : 'Register'}
                </button>
            </form>
            <p className='text-center text-gray-500 text-xs'>
                &copy;2022 1960token. All rights reserved.
            </p>
        </div>
    )
}

export default Register
