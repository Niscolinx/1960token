import React, { useState, useLayoutEffect, useEffect } from 'react'
import { countDown } from '../utils/countDown'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { Dayjs } from 'dayjs'

const defaultTimer = {
    hours: '00',
    minutes: '00',
    seconds: '00',
}

interface ICountDown {
    hour: number
    start: boolean,
    prevTimeStore: Dayjs
}

const CountDownTimer = ({ hour, start, prevTimeStore }: ICountDown) => {

    const { data: session } = useSession()
    const [remainingTime, setRemainingTime] = useState(defaultTimer)

    if (start) {
        const updateRemainingTimer = (timerInMs: number, prev:Dayjs) => {
            setRemainingTime(countDown(timerInMs, prev))
        }

        useEffect(() => {
            const intervalId = setInterval(() => {
                return updateRemainingTimer(hour, prevTimeStore)
            }, 1000)

            return () => clearInterval(intervalId)
        }, [])
    }
    const { hours, minutes, seconds } = remainingTime

    // return <div className='grid'>{isLoaded ? displayMine : 'Loading...'}</div>
    return (
        <div className='grid'>
            <div
                className=' justify-center grid w-max text-center py-2 px-10 rounded-lg place-self-center mt-10'
                style={{
                    background: `linear-gradient(145deg, #1c1c30, #171729)`,
                    boxShadow: `7px 7px 14px #161625,
             -7px -7px 14px #1e1e35`,
                    borderRadius: '50px',
                }}
            >
                <p>
                    {hours}:{minutes}:{seconds}
                </p>
            </div>
        </div>
    )
}

export default CountDownTimer

