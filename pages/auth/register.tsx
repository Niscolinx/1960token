import React, { useState, useEffect } from 'react'

const Register = () => {
    type message = { value: string; type: string; style: string }

    const [username, setUsername] = useState('hello')
    const [email, setEmail] = useState('hello@hello.com')
    const [password, setPassword] = useState('testing')
    const [confirmPassword, setConfirmPassword] = useState('testing')
    const [errorFields, setErrorFields] = useState<string[]>([])
    const [error, setError] = useState(false)
    const [message, setMessage] = useState<message>()
    const [messageDisplay, setMessageDisplay] = useState('hidden')

    const messageHandler = () => {
        console.log('effect message handler')
        if (error) {
            return setMessageDisplay('block')
        }
    }

    // useEffect(() => {
    //     console.log('call message handler')
    //     messageHandler()
    // }, [error, errorFields])

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

        let count = 0
        for (let [key, value] of formData.entries()) {
            if (!value) {
                console.log('no value')
                setError(true)
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
                    setError(true)
                    setErrorFields((oldArr) => [...oldArr, key])
                }
            }

            if (key === 'confirmPassword' && password !== confirmPassword) {
                console.log({count})
                setError(true)
                setErrorFields((oldArr) => [...oldArr, key])
            }
        }
    }
   
console.log({errorFields})

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
            case 'password':
                setPassword(value)
                break
            case 'confirmPassword':
                ;(() => {
                    setConfirmPassword(value)
                }).call(this)
                break
            default:
                ''
                break
        }
    }

    return (
        <div className='w-full md:w-2xl'>
            <form
                id='register'
                className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
                onSubmit={handleSubmit}
            >
                <div className='mb-4'>
                    <p
                        className={`${messageDisplay} ${message?.style} text-sm text-center mb-10`}
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
                        className={`shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
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
                <div className='mb-6'>
                    <label
                        className='block text-gray-700 text-sm font-bold mb-2'
                        htmlFor='confirmPassword'
                    >
                        Confirm Password
                    </label>
                    <input
                        className={`shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
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
            <p className='text-center text-gray-500 text-xs'>
                &copy;2022 1960token. All rights reserved.
            </p>
        </div>
    )
}

export default Register
function h(arg0: undefined, h: any) {
    throw new Error('Function not implemented.')
}
