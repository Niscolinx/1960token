import { getSession, GetSessionParams, useSession } from 'next-auth/react'
import Link from 'next/link'
import { IoIosPeople } from 'react-icons/io'
import { ImProfile } from 'react-icons/im'
import { BsFillGearFill } from 'react-icons/bs'
import { FaScroll } from 'react-icons/fa'
import { useTheme } from 'next-themes'
import React, { useState, useEffect, useContext } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/app/hooks'
import {
    getUser,
    selectUser,
    updatePortolio,
} from '../../store/features/user/UserSlice'
import { TbArrowsSort } from 'react-icons/tb'
import { clearMineTokens } from '../../store/features/mine/MinerSlice'
import { clearVideoTokens } from '../../store/features/video/VideoSlice'
import axios from 'axios'
import { NavContext } from '../../components/Context'

const Home = () => {
    const { data: session } = useSession()
    const dispatch = useAppDispatch()
    const {setIsVerified} = useContext(NavContext)
    type TOption = 'Mine/Video Income' | 'Referral Income'

    const fetchedUser = useAppSelector(selectUser)
    const [displayButton, setDisplayButton] = useState('Transfer')
    const [display, toggleDisplay] = useState(false)
    const [coupon, setCoupon] = useState('')
    const [selectedOption, setSelectedOption] =
        useState<TOption>('Referral Income')
    const [loading, setLoading] = useState(false)
    const [activateLoading, setActivateLoading] = useState(false)
    const [totalMined, setTotalMined] = useState(
        fetchedUser.tokensMined + fetchedUser.videoMined
    )

    const { theme } = useTheme()
    const [neuToUse, setNeuToUse] = useState<{}>()

 useEffect(() => {
        if (session) {
            dispatch(getUser(session)).then((data) => {
                localStorage.setItem(
                    'userSession',
                    JSON.stringify(data.payload)
                )
            })
        }
    }, [session])


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

    const dropDown = () => {
        toggleDisplay(display ? false : true)
        setDisplayButton(display ? 'Transfer' : 'Close')
    }

    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        
        let toPortolio = 0
        if (selectedOption === 'Mine/Video Income') {
            toPortolio = totalMined
        } else {
            toPortolio = fetchedUser.referralBonus
        }
        
        dispatch(clearMineTokens)
        dispatch(clearVideoTokens)
        dispatch(updatePortolio({ userSession: session!, data: toPortolio }))
        .then((data) => {
            console.log({ data })
            
            setLoading(false)
            if (selectedOption === 'Mine/Video Income') {
                setTotalMined(0)
            }
        })
        .catch(() => setLoading(false))
    }
    
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value as TOption
        setSelectedOption(value)
    }
    
    useEffect(() => {
        setTotalMined(fetchedUser.tokensMined + fetchedUser.videoMined)
    }, [fetchedUser])
    
    const handleActivate = (e: React.FormEvent) => {
        e.preventDefault()
        setActivateLoading(true)
        
        const getUser = localStorage.getItem('userSession')
        
        if(!getUser) {
            return
        }
        const user = JSON.parse(getUser)
        
        return axios
        .post('/api/activateCoupon', {coupon, user})
        .then(({ data }) => {
            setActivateLoading(false)
            setIsVerified(true)
            
            console.log({ data })            
            })
            .catch((err) => {
                console.log({ err })
                setActivateLoading(false)
            })
    }

    return (
        <div className='h-[93vh] px-4'>
            <div className='grid mt-10 gap-5'>
                <div
                    className=' justify-center grid w-max text-center py-2 px-10 rounded-lg place-self-center'
                    style={neuToUse}
                >
                    <p className='text-sm'>Portfolio</p>
                    <p className='font-bold text-3xl'>
                        ${fetchedUser.portfolio}
                    </p>
                </div>

                <form
                    className='flex justify-center align-middle gap-2'
                    onSubmit={handleActivate}
                >
                    <input
                        type='text'
                        placeholder='Coupon code'
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        className='rounded-lg shadow appearance-none border rounded py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#d1d1db]'
                    />
                    <button
                        className='bg-orange-300 text-[#1a1a2d] rounded px-2 py-1'
                        type='submit'
                    >
                        {activateLoading ? 'Loading...' : 'Activate'}
                    </button>
                </form>

                <div className='grid mt-10 text-[#ccccd0] border-b border-gray-700 pb-3 md:mx-20 '>
                    <h3 className='border-b border-gray-700 pb-2 text-xl font-semibold light:text-[#1a1a2d]'>
                        Account
                    </h3>
                    <div className='grid mt-4 grid-cols-tc gap-3'>
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
                        <Link href='/dashboard/profile'>
                            <div className='grid justify-center place-items-center'>
                                <BsFillGearFill className='text-blue-400 text-3xl light:text-[#1a1a2d]' />
                                <button
                                    className='text-sm p-1'
                                    style={neuToUse}
                                >
                                    Settings
                                </button>
                            </div>
                        </Link>
                        <Link href='/dashboard/transactionHistory'>
                            <div className='grid justify-center place-items-center'>
                                <FaScroll className='text-blue-400 text-3xl light:text-[#1a1a2d]' />
                                <button
                                    className='text-sm p-1'
                                    style={neuToUse}
                                >
                                    Transaction History
                                </button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='py-5 px-2 grid md:mx-20'>
                <div className='flex justify-around bg-orange-300 rounded-t-lg py-5 px-4 dark:text-[#1a1a2d]'>
                    <div className='grid justify-items-center'>
                        <p className='font-semibold'>Referral Income</p>
                        <p className='font-bold'>
                            ${fetchedUser.referralBonus}
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
                    <form
                        className='px-8 py-12 grid md:mx-20'
                        onSubmit={handleSubmit}
                    >
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
                            className='bg-green-600 font-semibold py-1 px-4 justify-self-center rounded-lg mt-8 text-white'
                            type='submit'
                        >
                            {loading ? 'Loading...' : 'Transfer'}
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
