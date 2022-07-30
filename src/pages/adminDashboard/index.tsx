import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import React, { useState, useEffect } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

const VENDORS = [
    { name: 'vendor1', contact: '+234234234231' },
    { name: 'vendor2', contact: '+234234234232' },
    { name: 'vendor3', contact: '+234234234233' },
    { name: 'vendor4', contact: '+234234234234' },
    { name: 'vendor5', contact: '+234234234235' },
    { name: 'vendor6', contact: '+234234234236' },
    { name: 'vendor7', contact: '+234234234237' },
    { name: 'vendor8', contact: '+234234234238' },
    { name: 'vendor9', contact: '+234234234239' },
    { name: 'vendor10', contact: '+234234234230' },
    { name: 'vendor11', contact: '+234234234211' },
    { name: 'vendor12', contact: '+234234234212' },
    { name: 'vendor13', contact: '+234234234213' },
    { name: 'vendor14', contact: '+234234234214' },
    { name: 'vendor15', contact: '+234234234215' },
]

function index() {
    const [generatedCode, setGeneratedCode] = useState('')
    const [loading, setLoading] = useState(false)
    const [coupons, setCoupons] = useState([])

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
        const fetchData = async () => {
            const { data } = await axios.get('/api/getCouponCodes')
            setCoupons(data.code)
        }
        fetchData()
    }, [])

    console.log({coupons})

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
                        {loading ? 'Generating...' : 'Generate Code'}
                    </button>
                </div>
            </div>
            <div className='grid overflow-scroll max-h-[70vh]'>
                <table className='border border-gray-700 transaction-table mx-5 md:mx-auto'>
                    <caption className='font-bold text-lg py-5 uppercase'>
                        Vendors
                    </caption>
                    <colgroup>
                        <col className='min-w-20' />
                        <col className='min-w-40' />
                        <col className='min-w-20' />
                    </colgroup>
                    <thead>
                        <tr className='mb-10'>
                            <th>No</th>
                            <th>Coupon</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {VENDORS.map((value, i) => {
                            return (
                                <tr key={i} className='mx-4 py-2'>
                                    <td>{i + 1}</td>
                                    <td>
                                        <div className='div flex items-center text-xl place-content-center'>
                                            <p className='capitalize'>
                                                {value.name}
                                            </p>
                                        </div>
                                    </td>
                                    <td>hello</td>
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
    return {
        props: {
            isAuthenticated: true,
        },
    }
}
