import { getSession, GetSessionParams, useSession } from 'next-auth/react'
import Link from 'next/link'
import { GiWallet } from 'react-icons/gi'
import { IoIosPeople } from 'react-icons/io'
import { AiFillCarryOut } from 'react-icons/ai'
import { ImProfile } from 'react-icons/im'
import CountDownTimer from '../../components/countDownTimer'
import { useEffect, useState } from 'react'
import axios from 'axios'
import dayjs, { Dayjs } from 'dayjs'

const Home = () => {
    const { data: session } = useSession()
    const [miningStart, setMiningStart] = useState(false)
    const [prevTimeStore, setPrevTimeStore] = useState<Dayjs>(
        dayjs().add(12, 'hours')
    )

    useEffect(() => {
        const getTimeStore = localStorage.getItem('miningTime')
        if (!getTimeStore) {
            console.log('local not found')
            axios
                .post('/api/miningStart', { session })
                .then(({ data }) => {
                    console.log({ data })
                })
                .catch((err) => {
                    console.log({ err })
                })
        } else {
            console.log("local found", typeof getTimeStore)
            setPrevTimeStore(dayjs(getTimeStore))
            setMiningStart(true)
        }
    }, [])

    const handleStart = () => {
        const dayjsRemainingTimeStamp = dayjs().add(12, 'hours')

        const getTimeStore = localStorage.getItem('miningTime')

        if (!getTimeStore) {
            console.log('handle start init')
            const remainingTime = dayjsRemainingTimeStamp

            axios
                .post('/api/startMining', { session, remainingTime })
                .then(({ data }) => {
                    const { miningStart } = data
                    //const prevTimeStore = dayjs(JSON.parse(miningStart))
                    console.log({ miningStart })
                    localStorage.setItem('miningTime', miningStart)
                })
                .catch((err) => {
                    console.log({ err })
                })
        } else {
            console.log('handle start already')
        }
    }

    return (
        <>
            <div className='grid mt-10 gap-5'>
                <div
                    className=' justify-center grid w-max text-center py-2 px-10 rounded-lg place-self-center'
                    style={{
                        background: `linear-gradient(145deg, #1c1c30, #171729)`,
                        boxShadow: `7px 7px 14px #161625,
             -7px -7px 14px #1e1e35`,
                        borderRadius: '50px',
                    }}
                >
                    <p className='text-sm'>Total Asset</p>
                    <p className='font-bold text-3xl'>$2312.08</p>
                    <button className='bg-green-500 text-[#1a1a2d] rounded px-1 text-sm mt-5'>
                        Withdraw
                    </button>
                </div>

                <form className='flex justify-center align-middle gap-2'>
                    <input
                        type='text'
                        placeholder='Coupon code'
                        className='  rounded-lg shadow appearance-none border rounded py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#d1d1db]'
                    />
                    <button className='bg-orange-300 text-[#1a1a2d] rounded px-2 py-1'>
                        Activate
                    </button>
                </form>

                <div className='grid mt-10 text-[#ccccd0] border-b border-gray-700 pb-3'>
                    <h3 className='border-b border-gray-700 pb-2 text-xl font-semibold'>
                        Account
                    </h3>
                    <div className='grid mt-4 grid-cols-tc gap-3'>
                        <Link href='/'>
                            <div className='grid justify-center place-items-center'>
                                <GiWallet className='text-blue-400 text-3xl' />
                                <button
                                    className='text-sm p-1'
                                    style={{
                                        background: `linear-gradient(145deg, #1c1c30, #171729)`,
                                        boxShadow: `7px 7px 14px #161625,
             -7px -7px 14px #1e1e35`,
                                        borderRadius: '50px',
                                    }}
                                >
                                    Deposits
                                </button>
                            </div>
                        </Link>
                        <Link href='/'>
                            <div className='grid justify-center place-items-center'>
                                <AiFillCarryOut className='text-blue-400 text-3xl' />
                                <button
                                    className='text-sm p-1'
                                    style={{
                                        background: `linear-gradient(145deg, #1c1c30, #171729)`,
                                        boxShadow: `7px 7px 14px #161625,
             -7px -7px 14px #1e1e35`,
                                        borderRadius: '50px',
                                    }}
                                >
                                    Withdrawals
                                </button>
                            </div>
                        </Link>
                        <Link href='/'>
                            <div className='grid justify-center place-items-center'>
                                <ImProfile className='text-blue-400 text-3xl' />
                                <button
                                    className='text-sm p-1'
                                    style={{
                                        background: `linear-gradient(145deg, #1c1c30, #171729)`,
                                        boxShadow: `7px 7px 14px #161625,
             -7px -7px 14px #1e1e35`,
                                        borderRadius: '50px',
                                    }}
                                >
                                    Vendors
                                </button>
                            </div>
                        </Link>
                        <Link href='/'>
                            <div className='grid justify-center place-items-center'>
                                <IoIosPeople className='text-blue-400 text-3xl' />
                                <button
                                    className='text-sm p-1'
                                    style={{
                                        background: `linear-gradient(145deg, #1c1c30, #171729)`,
                                        boxShadow: `7px 7px 14px #161625,
             -7px -7px 14px #1e1e35`,
                                        borderRadius: '50px',
                                    }}
                                >
                                    My team
                                </button>
                            </div>
                        </Link>
                    </div>

                    <CountDownTimer hour={12} start={miningStart} prevTimeStore={prevTimeStore}/>
                    <button onClick={handleStart}>Start</button>
                </div>
            </div>
        </>
    )
}

export default Home

export async function getServerSideProps(
    context: GetSessionParams | undefined
) {
    const session = await getSession(context)

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: { session },
    }
}
