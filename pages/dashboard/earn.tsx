import axios from 'axios'
import dayjs, { Dayjs } from 'dayjs'
import { useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import { GiTrade } from 'react-icons/gi'
import CountDownTimer from '../../components/countDownTimer'
import { HiOutlineArrowNarrowUp } from 'react-icons/hi'
import ReactPlayer from 'react-player/youtube'
import { IoIosPeople } from 'react-icons/io'

function earn() {
    const { data: session } = useSession()

    const [miningStart, setMiningStart] = useState(false)
    const [prevTimeStore, setPrevTimeStore] = useState<Dayjs>()
    const [isDim, setIsDim] = useState(true)

    const { theme } = useTheme()
    const [neuToUse, setNeuToUse] = useState<{}>()

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

    // useEffect(() => {

    //     if(!isDim){
    //         setIsDim(true)
    //     }

    // }, [])

    useEffect(() => {
        const getTimeStore = localStorage.getItem('miningTime')
        console.log('initial load')

        if (!getTimeStore) {
            console.log('load the gettime')
            axios
                .post('/api/startMining', { session })
                .then(({ data }) => {
                    console.log({ data })
                    const { miningStart, isMining } = data
                    if (isMining) {
                        localStorage.setItem('miningTime', miningStart)
                        setMiningStart(true)
                        setPrevTimeStore(dayjs(miningStart))
                    }
                })
                .catch((err) => {
                    console.log({ err })
                })
        } else {
            console.log("Didn't load the get time")

            const dayjsNowTimeStamp = dayjs()
            if (dayjsNowTimeStamp.isAfter(dayjs(getTimeStore))) {
                console.log('Timer finished')
                return setMiningStart(false)
            }
            setPrevTimeStore(dayjs(getTimeStore))
            setMiningStart(true)
        }
    }, [])

    const handleStart = () => {
        console.log("clicked on mine")
        setIsDim(false)
        const dayjsRemainingTimeStamp = dayjs().add(12, 'hours')

        const getTimeStore = localStorage.getItem('miningTime')

        if (!getTimeStore) {
            const remainingTime = dayjsRemainingTimeStamp

            axios
                .post('/api/startMining', { session, remainingTime })
                .then(({ data }) => {
                    const { miningStart } = data
                    localStorage.setItem('miningTime', miningStart)
                    setPrevTimeStore(dayjs(miningStart))
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
            <div className='grid h-[82vh]'>
                <div
                    className=' justify-center grid w-max text-center py-2 px-10 rounded-lg place-self-center mb-2'
                    style={neuToUse}
                >
                    <p className='font-bold text-3xl'>0.0001</p>
                </div>

                <div className='relative z-10 hidden'>
                    <ReactPlayer
                        url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
                        width='100%'
                        height='40rem'
                    />
                </div>
                <div className='absolute grid right-0 left-0 mr-4 justify-items-center top-1/5 gap-6 z-90 justify-end cursor-pointer bg-red-300'>
                    <div className=''>
                        <GiTrade
                            onClick={handleStart}
                            className='text-white text-4xl'
                            // className='text-white text-4xl animate-spin animate-duration-[4s]'
                        />
                        <HiOutlineArrowNarrowUp
                            className='text-white text-3xl animate-bounce mt-1'
                            style={{ display: isDim ? 'block' : 'none' }}
                        />
                    </div>
                    <div className='grid text-white justify-center justify-items-center'>
                        <IoIosPeople
                            className='text-white text-4xl'
                            onClick={() => console.log('team clicked')}
                        />
                        <p className='font-bold'>1/1</p>
                    </div>
                </div>

                <div
                    className='w-full h-full bg-black bg-opacity-80 absolute top-0 bottom-0 left-0 right-0 z-20'
                    style={{ display: isDim ? 'block' : 'none' }}
                ></div>
                <div className='grid self-center mt-2'>
                    {/* {prevTimeStore && ( */}
                    <CountDownTimer
                        hour={12}
                        start={miningStart}
                        prevTimeStore={prevTimeStore}
                    />
                    {/* )} */}
                </div>
            </div>
        </>
    )
}

export default earn
