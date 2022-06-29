import { useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import React, { useEffect, useState, useRef } from 'react'
import { GiTrade } from 'react-icons/gi'
import { HiOutlineArrowNarrowUp } from 'react-icons/hi'
import ReactPlayer from 'react-player/youtube'
import { IoIosPeople } from 'react-icons/io'
import MineTimer from '../../features/mine/MineTimer'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { initMineAsync, selectMining } from '../../features/mine/MinerSlice'

function earn() {
    const { data: session } = useSession()
    const mountedRef = useRef()
    const miningState = useAppSelector(selectMining)
    

    const [miningStart, setMiningStart] = useState(false)
    const [isDim, setIsDim] = useState(false)

    const { theme } = useTheme()
    const [neuToUse, setNeuToUse] = useState<{}>()

    const dispatch = useAppDispatch()

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

        if(miningState.status === 'success'){
            console.log("success")
        }

    }, [miningState])

    useEffect(() => {
        const getTimeStore = localStorage.getItem('miningStartedAt')
        console.log('initial load')


        //  if (!getTimeStore) {
        if (session && !getTimeStore) {
            console.log('about to dispatch')
            dispatch(initMineAsync(session))
        }
        //}
        // else {
        //     console.log("Didn't load the get time")

        //     const dayjsNowTimeStamp = dayjs()
        //     if (dayjsNowTimeStamp.isAfter(dayjs(getTimeStore))) {
        //         console.log('Timer finished')
        //         return setMiningStart(false)
        //     }
        //     setPrevTimeStore(dayjs(getTimeStore))
        //     setMiningStart(true)
        // }
    }, [session])

    const handleStart = () => {
        console.log('clicked on mine')

        const getTimeStore = localStorage.getItem('miningTime')

        if (session && !getTimeStore) {
            console.log('about to dispatch')
            dispatch(initMineAsync(session))
        }
        setIsDim(false)
    }

    return (
        <>
            <div className='grid h-[100vh]'>
                <div
                    className=' justify-center grid w-max text-center py-2 px-10 rounded-lg place-self-center mb-2'
                    style={neuToUse}
                >
                    <p className='font-bold text-3xl'>0.0001</p>
                </div>

                <div className='relative z-10'>
                    <ReactPlayer
                        url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
                        width='100%'
                        height='40rem'
                    />
                </div>
                <div className='absolute grid right-0 left-0 mr-4 justify-items-center top-1/5 gap-6 z-90 justify-end cursor-pointer '>
                    <div className='grid text-white justify-center justify-items-center'>
                        <IoIosPeople
                            className='text-white text-4xl'
                            onClick={() => console.log('team clicked')}
                        />
                        <p className='font-bold'>1/1</p>
                    </div>
                    <div className='grid text-white justify-center justify-items-center'>
                        <GiTrade
                            onClick={handleStart}
                            // className='text-white text-4xl'
                            className={`text-white text-4xl ${
                                !isDim
                                    ? 'animate-spin animate-duration-[4s]'
                                    : ''
                            }`}
                        />
                        <HiOutlineArrowNarrowUp
                            className='text-white text-3xl animate-bounce mt-1'
                            style={{ display: isDim ? 'block' : 'none' }}
                        />
                    </div>
                </div>

                <div
                    className='w-full h-full bg-black bg-opacity-80 absolute top-0 bottom-0 left-0 right-0 z-20'
                    style={{ display: isDim ? 'block' : 'none' }}
                ></div>
                <div className='grid self-center mt-2'>
                    <MineTimer hour={12} start={false} />
                </div>
            </div>
        </>
    )
}

export default earn
