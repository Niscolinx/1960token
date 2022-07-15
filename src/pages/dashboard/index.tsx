import { getSession, GetSessionParams, useSession } from 'next-auth/react'
import Link from 'next/link'
import { IoIosPeople } from 'react-icons/io'
import { ImProfile } from 'react-icons/im'
import { useTheme } from 'next-themes'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/app/hooks'
import { getUser, selectUser } from '../../store/features/user/UserSlice'

const Home = () => {
    const { data: session } = useSession()
    const dispatch = useAppDispatch()
    const fetchedUser = useAppSelector(selectUser)
        const [displayButton, setDisplayButton] = useState('Transfer')

    const { theme } = useTheme()
    const [neuToUse, setNeuToUse] = useState<{}>()

    const memoizedCallback = useCallback(() => {
        console.log('useCallback...........')
        if (session) {
            return dispatch(getUser(session))
        }
    }, [session])

    useMemo(() => {
        console.log('useMemo.............')
        return memoizedCallback()
    }, [])

    useEffect(() => {
        if (theme === 'dark') {
            setNeuToUse({
                background: `linear-gradient(145deg, #1c1c30, #171729)`,
                boxShadow: `7px 7px 14px #161625,
                 -7px -7px 14px #1e1e35`,
                borderRadius: '50px',
            })
        } else {
            setNeuToUse({
                background: `linear-gradient(145deg, #dadadf, #b8b8bb)`,
                boxShadow: `7px 7px 14px #a5a5a8,
             -7px -7px 14px #f3f3f8`,
                borderRadius: '50px',
                color: '#1a1a2d',
            })
        }
    }, [theme])

        const totalMined = fetchedUser.tokensMined + fetchedUser.videoMined

        
    const dropDown = () => {
        toggleDisplay(display ? false : true)
        setDisplayButton(display ? 'Transfer' : 'Close')
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        let toPortolio = 0
        if (selectedOption === 'Mine/Video Income') {
            toPortolio = totalMined
        } else {
            toPortolio = referralTotalNumberAndIncome.teamIncome
        }

        //Store the referral Income in Database first

        dispatch(clearMineTokens)
        dispatch(clearVideoTokens)
        dispatch(updatePortolio({ userSession: session!, data: toPortolio }))
    }

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as TOption
        setSelectedOption(value)
        console.log({ value })
    }

    return (
        <div className='h-[93vh] px-4'>
            <div className='grid mt-10 gap-5'>
                <div
                    className=' justify-center grid w-max text-center py-2 px-10 rounded-lg place-self-center'
                    style={neuToUse}
                >
                    <p className='text-sm'>Total Asset</p>
                    <p className='font-bold text-3xl'>
                        ${fetchedUser.portfolio}
                    </p>
                    {/* <button className='bg-green-500 text-[#1a1a2d] rounded px-1 text-sm mt-5'>
                        Withdraw
                    </button> */}
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
                    <h3 className='border-b border-gray-700 pb-2 text-xl font-semibold light:text-[#1a1a2d]'>
                        Account
                    </h3>
                    <div className='grid mt-4 grid-cols-tc gap-3'>
                        {/* <Link href='/'>
                            <div className='grid justify-center place-items-center'>
                                <GiWallet className='text-blue-400 text-3xl light:text-[#1a1a2d]' />
                                <button
                                    className='text-sm p-1'
                                    style={neuToUse}
                                >
                                    Deposits
                                </button>
                            </div>
                        </Link>
                        <Link href='/'>
                            <div className='grid justify-center place-items-center'>
                                <AiFillCarryOut className='text-blue-400 text-3xl light:text-[#1a1a2d]' />
                                <button
                                    className='text-sm p-1'
                                    style={neuToUse}
                                >
                                    Withdrawals
                                </button>
                            </div>
                        </Link> */}
                        <Link href='/'>
                            <div className='grid justify-center place-items-center'>
                                <ImProfile className='text-blue-400 text-3xl light:text-[#1a1a2d]' />
                                <button
                                    className='text-sm p-1'
                                    style={neuToUse}
                                >
                                    Vendors
                                </button>
                            </div>
                        </Link>
                        <Link href='/dashboard/team'>
                            <div className='grid justify-center place-items-center'>
                                <IoIosPeople className='text-blue-400 text-3xl light:text-[#1a1a2d]' />
                                <button
                                    className='text-sm p-1'
                                    style={neuToUse}
                                >
                                    My team
                                </button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='py-5 px-2 grid'>
                <div className='flex justify-around bg-orange-300 rounded-t-lg py-5 px-4 dark:text-[#1a1a2d]'>
                    <div className='grid justify-items-center'>
                        <p className='font-semibold'>Referral Income</p>
                        <p className='font-bold'>
                            ${referralTotalNumberAndIncome.teamIncome}
                        </p>
                    </div>
                    <div className='grid justify-items-center'>
                        <p className='font-semibold'>Mine/Video Income</p>
                        <p className='font-bold'>${totalMined}</p>
                    </div>
                </div>
                <div
                    className='grid animate-rotate-out transition-all delay-100'
                    style={
                        !display
                            ? {
                                  opacity: '0',
                                  height: '0',
                                  visibility: 'hidden',
                              }
                            : {
                                  opacity: '1',
                                  height: '100%',
                                  visibility: 'visible',
                              }
                    }
                >
                    <form className='px-8 py-12 grid' onSubmit={handleSubmit}>
                        <div className=' grid justify-items-center gap-4 dark:text-[#1a1a2d]'>
                            <select
                                className={`shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white `}
                                onChange={handleChange}
                            >
                                <option value='Referral Income'>
                                    Referral Income
                                </option>
                                <option value='Mine/Video Income'>
                                    Mine/Video Income
                                </option>
                            </select>
                            <TbArrowsSort className='text-2xl' />
                            <p
                                className='text-2xl py-4 px-6 border border-[#1a1a2d] font-bold rounded-lg text-gray-300'
                                style={neuToUse}
                            >
                                Portfolio
                            </p>
                        </div>
                        <button
                            className='bg-green-600 font-semibold py-1 px-4 justify-self-center rounded-lg mt-8'
                            type='submit'
                        >
                            Transfer
                        </button>
                    </form>
                </div>
                <button
                    className='text-center bg-blue-400 py-2 px-5 rounded-b-lg dark:text-[#1a1a2d]'
                    onClick={dropDown}
                >
                    {displayButton}
                </button>
            </div>
        </div>
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
                destination: '/auth/login',
                permanent: false,
            },
        }
    }

    return {
        props: { session },
    }
}
