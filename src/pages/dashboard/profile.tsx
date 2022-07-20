import axios from 'axios';
import { GetSessionParams, getSession } from 'next-auth/react'
import router from 'next/router';
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../store/app/hooks';
import { selectUser } from '../../store/features/user/UserSlice';

function profile() {
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

        const fetchedUser = useAppSelector(selectUser)


    useEffect(() => {
        console.log('From profile', {fetchedUser})
        if(fetchedUser){
            console.log("fetch profile loaded")
        }
    })

   

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
                .post('/api/profile', {
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
           
            case 'phoneNumber':
                setPhoneNumber(Number(value))
                break
            case 'password':
                setPassword(value)
                break
            case 'confirmPassword':
                    setConfirmPassword(value)
              
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
        <div className='px-4'>
            <form
                id='register'
                className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 grid m-2'
                onSubmit={handleSubmit}
            >
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
