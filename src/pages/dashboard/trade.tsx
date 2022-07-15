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
import { initVideoEnded } from '../../store/features/video/VideoSlice'
import { getUser, selectUser } from '../../store/features/user/UserSlice'
import { AnimationOnScroll } from 'react-animation-on-scroll'

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
        const persistedStorage = localStorage.getItem('persist:root')

        if (session) {
            const parsedJSON = JSON.parse(persistedStorage!)

            if (persistedStorage) {
                if (JSON.parse(parsedJSON.mine).miningSession === 'stall') {
                    dispatch(initMineAsync(session))
                }
            }

            if (dayjsNowTimeStamp.isAfter(dayjs(mineState.miningStartedAt))) {
                setMiningStart(false)
                dispatch(initStopMineAsync(session))
            }
        }
    }, [session])

    useEffect(() => {
        if (miningStart) {
            setIsDim(false)
        } else {
            setIsDim(true)
        }
    }, [miningStart])

    const handleMineStart = () => {
        if (session) {
            dispatch(initMineAsync(session))
            //dispatch(initStopMineAsync(session))
        }
    }

    const handleVideoEnded = () => {
        console.log('video ended')
        if (session) {
            dispatch(initVideoEnded(session))
        }
    }

    return (
        <>
            <div className='grid grid-rows-[.1fr,.1fr,1fr] overflow-hidden h-[88vh] relative'>
                <div className='flex justify-center items-center bg-purple-500 text-[#1a1a2d]'>
                    
                        <MineTimer start={miningStart} />
                        <p className='font-bold text-2xl'>
                            {fetchedUser.tokensMined}
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
