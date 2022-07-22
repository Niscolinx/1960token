import { GetSessionParams, useSession, getSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { GiTrade } from 'react-icons/gi'
import { HiOutlineArrowNarrowUp } from 'react-icons/hi'

import dayjs from 'dayjs'
import { useAppSelector, useAppDispatch } from '../../store/app/hooks'
import {
    selectMining,
    initMineAsync,
    initStopMineAsync,
} from '../../store/features/mine/MinerSlice'
import MineTimer from '../../store/features/mine/MineTimer'
import { getUser, selectUser } from '../../store/features/user/UserSlice'
import { AnimationOnScroll } from 'react-animation-on-scroll'
import axios from 'axios'

function earn() {
    const { data: session } = useSession()
    const mineState = useAppSelector(selectMining)
    const fetchedUser = useAppSelector(selectUser)

    const [miningStart, setMiningStart] = useState(false)

    const [isDim, setIsDim] = useState(false)

    const { theme } = useTheme()
    const [neuToUse, setNeuToUse] = useState<{}>()

    const dispatch = useAppDispatch()

    // useEffect(() => {
    //setTokenCount(mineState.countDownToken)
    //setTokenCount(mineState.tokensCount)
    //}, [mineState])

    const memoizedCallback = useCallback(() => {
       // console.log('useCallback...........')
        if (session) {
            return dispatch(getUser(session))
        }
    }, [session])

    useMemo(() => {
        //console.log('useMemo.............')
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

    useEffect(() => {
        if (mineState) {
            if (mineState.isMining && mineState.miningSession === 'active') {
                setMiningStart(true)
                setIsDim(false)
            } else {
                setMiningStart(false)
            }
        }
    }, [mineState])

    useEffect(() => {
        const dayjsNowTimeStamp = dayjs()
        //const persistedStorage = localStorage.getItem('persist:root')

        if (session) {
            // const parsedJSON = JSON.parse(persistedStorage!)
            // dispatch(initMineAsync(session))

            // console.log('the mining state', mineState)
            // if (persistedStorage) {
            //     if (JSON.parse(parsedJSON.mine).miningSession === 'stall') {
            //         console.log('initMineAsync is called')
            //         //dispatch(initMineAsync(session))
            //     }
            // }

            if (dayjsNowTimeStamp.isAfter(dayjs(mineState.miningStartedAt))) {
                setMiningStart(false)
                dispatch(initStopMineAsync(session))
            }
        }
    }, [session])

    useEffect(() => {
        //console.log('useEffect dispatch getUser')
        if (session) {
            dispatch(getUser(session))
        }
    }, [session])

    useEffect(() => {
        const fetchUser = async () => {
            const userSession = localStorage.getItem('userSession')

            if (userSession) {
                const destructedUserSession = JSON.parse(userSession)

                const email = destructedUserSession.email

                const theSession = {
                    user: {
                        email,
                    },
                }
                const response = await axios.post('/api/user', theSession)

                const { isMining } = response.data
              //  console.log('the response', isMining)

                if (isMining) {
                    dispatch(initMineAsync(theSession))
                }
            }
        }

        fetchUser()
    }, [])

    useEffect(() => {
        if (miningStart) {
            setIsDim(false)
        } else {
            setIsDim(true)
        }
    }, [miningStart])

    const handleMineStart = () => {
        if (session) {
            dispatch(initMineAsync(session)).then((data) => {
                console.log('started mining', data.type)
                if (data.type === 'mining/fulfilled') {
                    localStorage.setItem('isMining', data.type)
                }
            })
            //dispatch(initStopMineAsync(session))
        }
    }


    
    //regex to check if a string starts with a number and ends with underscore
    const isNumberUnderscore = (str: string) => {
        return str.match(/^\d+(_)$/)
    }

    //regex to check if a string does not start with a number and does not end with an underscore
    const isNotNumberUnderscore = (str: string) => {
       //const result = str.match(/^[^\d]+$/)
        const testing = '(?![0-9.])[a-zA-Z0-9]*'

        //const result3 = /(?![0-9.])[a-zA-Z0-9]*/.test(str)
        //console.log(result3)
        

        const regex = new RegExp('(?![0-9.])[a-zA-Z0-9]*')
        const result = regex.test(str)
        console.log({result})
    }

    isNotNumberUnderscore('9kdjsnfdsfcdshe')

    // console.log({ mineState })
    // console.log({ fetchedUser })

    return (
        <>
            <div className='grid grid-rows-[.1fr,.1fr,1fr] overflow-hidden h-[88vh] relative'>
                <div className='flex justify-between items-center bg-purple-500 text-[#1a1a2d] py-2 px-10'>
                    <MineTimer start={miningStart} />
                    <p className='font-bold text-2xl'>
                        {mineState.tokensMined}
                    </p>
                </div>
                <div className='relative'>
                    <div className='absolute grid right-0 justify-items-center  gap-6 z-90 justify-end cursor-pointer animateRight'>
                        <AnimationOnScroll
                            initiallyVisible={true}
                            animateIn='animate__slideInLeft'
                        >
                            <div className='grid bg-[#1a1a2d] dark:bg-gray-300 rounded p-2 '>
                                <div className='grid text-white justify-center justify-items-center'>
                                    <GiTrade
                                        onClick={handleMineStart}
                                        // className='text-white text-4xl'
                                        className={` cursor-pointer text-white dark:text-[#1a1a2d] text-4xl ${
                                            !isDim && miningStart
                                                ? 'animate-spin animate-duration-[4s]'
                                                : ''
                                        }`}
                                    />
                                    <div className='grid justify-center justify-items-center'>
                                        <HiOutlineArrowNarrowUp
                                            className='text-white dark:text-[#1a1a2d] text-3xl animate-bounce mt-7 animate-duration-[4s]'
                                            style={{
                                                display: isDim
                                                    ? 'block'
                                                    : 'none',
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </AnimationOnScroll>
                        <span
                            className='text-white'
                            style={{
                                display: isDim ? 'block' : 'none',
                            }}
                        >
                            Tap to mine!
                        </span>
                    </div>
                    <div className='absolute right-0 left-0 bottom-0 top-0'>
                        <div className='grid mt-4'>
                            <iframe
                                src={`/tradingView.html`}
                                width='100%'
                                style={{ height: '70vh' }}
                            />
                        </div>
                    </div>
                </div>
                <div className='grid mt-10 justify-center bg-purple-500 py-4 px-6 text-[#1a1a2d] absolute bottom-0 right-0 left-0 gap-3'>
                    <h3 className='text-lg font-bold text-center'>
                        TAP TO MINE Tk.!!
                    </h3>
                    <p className='bg-white text-center p-4 text-sm rounded font-semibold'>
                        The mining engine have been setup, Tap on the Mine
                        Button and it starts Mining. In return, you're rewarded
                        with a higher earning rate. Thank you for being a
                        contributor.
                    </p>
                </div>
                <div
                    className='w-full h-full bg-black bg-opacity-80 absolute top-0 bottom-0 left-0 right-0 z-20'
                    style={{ display: isDim ? 'block' : 'none' }}
                ></div>
            </div>
        </>
    )
}

export default earn

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
