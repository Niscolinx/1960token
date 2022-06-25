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
        <div className='grid h-[82vh]'>
            <div className='grid  bg-red-500 w-full fixed'>
                <ReactPlayer
                    url='https://www.youtube.com/watch?v=ysz5S6PUM-U'
                    width='100%'
                    height='40rem'
                />
            </div>

            <div
                className='w-full h-full bg-black opacity-[20] bg-opacity-80 absolute top-0 bottom-0 left-0 right-0'
                style={{ display: isDim ? 'block' : 'none' }}
            ></div>
            <div className='grid self-center'>
                {prevTimeStore && (
                    <CountDownTimer
                        hour={12}
                        start={miningStart}
                        prevTimeStore={prevTimeStore}
                    />
                )}

                <div className='absolute grid right-0 mr-4 justify-center justify-items-center top-1/3'>
                    <IoIosPeople className='text-blue-400 text-3xl light:text-[#1a1a2d]' />

                    <div className='bg-white grid p-3 rounded-full mb-2 cursor-pointer'>
                        <GiTrade
                            onClick={handleStart}
                            className='text-orange-300 light:text-[#1a1a2d] text-4xl'
                        />
                    </div>
                    <HiOutlineArrowNarrowUp
                        className='text-white text-3xl animate-bounce'
                        style={{ display: isDim ? 'block' : 'none' }}
                    />
                </div>
            </div>
        </div>
    )
}

export default earn
