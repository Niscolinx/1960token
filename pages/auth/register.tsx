import React, { ChangeEventHandler, useState } from 'react'

const Register = () => {
    const [username, setUsername] = useState('hello')
    const [email, setEmail] = useState('hello@hello.com')
    const [password, setPassword] = useState('testing')
    const [confirmPassword, setConfirmPassword] = useState('testing')
    const [errorFields, setErrorFields] = useState<string[]>([])
    const [error, setError] = useState(false)
    const [message, setMessage] = useState(null)

    const isValidMail = (e: string): Boolean => {
        console.log({ e })
        const emailRegex = RegExp(
            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        )

        console.log({emailRegex})
        return emailRegex.test(e)
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        console.log(e)

        for (let [key, value] of formData.entries()) {
            if (!value) {
                setError(true)
                setErrorFields((oldArr) => [...oldArr, key])
            }

            if (key === 'email') {
                return isValidMail(value.toString())
            }
        }
    }
    console.log(' errorField', errorFields)

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrorFields([])
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
                    {/* <p className='text-red-500 text-xs italic'>
                        Please choose a password.
                    </p> */}
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
                    <p className='text-red-500 text-xs italic'>
                        Please choose a password.
                    </p>
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
