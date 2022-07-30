import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import React, { useState, useEffect } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

type Coupon = {
    _id: string
    isUsed: boolean
    createdAt: string
    code: string
}

type Props = {
    couponCodes: Coupon[]
}

function index({couponCodes}: Props) {
    const [generatedCode, setGeneratedCode] = useState('')
    const [loading, setLoading] = useState(false)
    const [coupons, setCoupons] = useState<Coupon[] | null>([])

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
        setLoading(true)
        const random = randomString()

        //send api to the server with the generated code using axios
        axios
            .post('/api/storeGeneratedCode', {
                code: random,
            })
            .then(({ data }) => {
                setGeneratedCode(data.code)
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
            })
    }

    useEffect(() => {
        setCoupons(couponCodes)
    }, [])

    console.log({ coupons })

    return (
        <div className='h-[100vh] py-5 px-2'>
            <h1 className='text-lg font-bold mb-5'>Welcome Admin</h1>
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
                        {loading ? 'Generating...' : 'Generate Code'}
                    </button>
                </div>
            </div>
            <div className='grid overflow-scroll max-h-[70vh] mt-10'>
                <table className='border border-gray-700 transaction-table md:mx-auto'>
                    <caption className='font-bold text-lg py-5 uppercase'>
                        Coupon Codes
                    </caption>
                    <colgroup>
                        <col className='min-w-20' />
                        <col className='min-w-20' />
                        <col className='min-w-40' />
                    </colgroup>
                    <thead>
                        <tr className='mb-10'>
                            <th>No</th>
                            <th>Status</th>
                            <th>Coupon</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {coupons &&
                            coupons.map((value, i) => {
                                return (
                                    <tr key={i} className='mx-4 py-2'>
                                        <td>{i + 1}</td>
                                        <td>{value.isUsed.toString()}</td>
                                        <td>{value.code}</td>
                                        <td>{new Date(value.createdAt).toLocaleString('en-GB', {
                                            dateStyle: 'medium',
                                            timeStyle: 'medium',
                                            //24 hour time
                                            hour12: true
                                           
                                        }).toString()}</td>
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
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

    const { data } = await axios.get('/api/getCouponCodes')
    return {
        props: {
            isAuthenticated: true,
            couponCodes: data,
        },
    }
}
