import { useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import { GiTrade } from 'react-icons/gi'
import { HiOutlineArrowNarrowUp } from 'react-icons/hi'
import ReactPlayer from 'react-player/youtube'
import { IoIosPeople } from 'react-icons/io'

import dayjs from 'dayjs'
import { useAppSelector, useAppDispatch } from '../../store/app/hooks'
import {
    selectMining,
    initMineAsync,
    initStopMineAsync,
} from '../../store/features/mine/MinerSlice'
import MineTimer from '../../store/features/mine/MineTimer'
import {
    initVideoEnded,
} from '../../store/features/video/VideoSlice'
import { getUser, selectUser } from '../../store/features/user/UserSlice'
import { AnimationOnScroll } from 'react-animation-on-scroll'

function earn() {
    const { data: session } = useSession()
    const mineState = useAppSelector(selectMining)
    const fetchedUser = useAppSelector(selectUser)

    const [miningStart, setMiningStart] = useState(false)

    const [isDim, setIsDim] = useState(true)

    const { theme } = useTheme()
    const [neuToUse, setNeuToUse] = useState<{}>()

    const dispatch = useAppDispatch()

    // useEffect(() => {
    //setTokenCount(mineState.countDownToken)
    //setTokenCount(mineState.tokensCount)
    //}, [mineState])

    useEffect(() => {
        if (session) {
            dispatch(getUser(session))

            console.log('the user', fetchedUser)
        }
    }, [session])

    console.log({fetchedUser})

    useEffect(() => {
        if (theme === 'dark') {
            console.log('dark theme', { theme })

            setNeuToUse({
                background: `linear-gradient(145deg, #1c1c30, #171729)`,
                boxShadow: `7px 7px 14px #161625,
                 -7px -7px 14px #1e1e35`,
                borderRadius: '50px',
            })
        } else {
            console.log('light theme', { theme })
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
        console.log({ mineState })
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

            if(persistedStorage){

                if (JSON.parse(parsedJSON.mine).miningSession === 'stall') {
                    dispatch(initMineAsync(session))
                    setIsDim(false)
                }
            }

            if (dayjsNowTimeStamp.isAfter(dayjs(mineState.miningStartedAt))) {
                console.log('stop mining')
                setMiningStart(false)
                dispatch(initStopMineAsync(session))
            }
        }
    }, [session])

    const handleMineStart = () => {
        console.log('clicked on mine')

        if (session) {
            console.log('about to dispatch')
            dispatch(initMineAsync(session))
            //dispatch(initStopMineAsync(session))
        }
        setIsDim(false)
    }

    const handleVideoEnded = () => {
        console.log('video ended')
        if (session) {
            dispatch(initVideoEnded(session))
        }
    }

    return (
        <>
            <div className='grid h-screen grid-rows-[.1fr,.2fr,1fr] overflow-hidden'>
                <div
                    className=' justify-center grid w-max text-center py-2 px-10 rounded-lg place-self-center mb-2'
                    style={neuToUse}
                >
                    <p className='font-bold text-2xl'>
                        {fetchedUser.user.totalMined}
                    </p>
                </div>
                <div className='grid self-center'>
                    <MineTimer start={miningStart} />
                </div>

                <div className='relative z-10'>
                    <ReactPlayer
                        url='https://youtu.be/HoPNOczYU4Y'
                        width='100%'
                        height='100%'
                        //onEnded={handleVideoEnded}
                        onStart={handleVideoEnded}
                    />
                </div>
                <AnimationOnScroll
                    initiallyVisible={true}
                    animateIn='animate__zoomInUp'
                >
                    <div className='absolute grid right-0 mr-4 justify-items-center top-1/5 gap-6 z-90 justify-end cursor-pointer bg-[#1a1a2d] dark:bg-gray-300 rounded animateLeft'>
                        <div className='grid text-white justify-center justify-items-center'>
                            <IoIosPeople
                                className='text-white text-4xl dark:text-[#1a1a2d]'
                                onClick={() => console.log('team clicked')}
                            />
                            <p className='font-bold dark:text-[#1a1a2d]'>1/1</p>
                        </div>
                        <div className='grid text-white justify-center justify-items-center'>
                            <GiTrade
                                onClick={handleMineStart}
                                // className='text-white text-4xl'
                                className={`text-white dark:text-[#1a1a2d] text-4xl ${
                                    !isDim && miningStart
                                        ? 'animate-spin animate-duration-[4s]'
                                        : ''
                                }`}
                            />
                            <div className="grid">

                            <HiOutlineArrowNarrowUp
                                className='text-white dark:text-[#1a1a2d] text-3xl animate-bounce mt-7 animate-duration-[4s]'
                                style={{ display: isDim ? 'block' : 'none' }}
                                />
                                </div>
                        </div>
                    </div>
                </AnimationOnScroll>

                <div
                    className='w-full h-full bg-black bg-opacity-80 absolute top-0 bottom-0 left-0 right-0 z-20'
                    style={{ display: isDim ? 'block' : 'none' }}
                ></div>
            </div>
        </>
    )
}

export default earn
