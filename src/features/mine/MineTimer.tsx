import React, { useState, useEffect } from 'react'
import { CountDown } from '../../../utils/countDown'
import { Dayjs } from 'dayjs'
import { useTheme } from 'next-themes'
import { increment } from '../../features/mine/MinerSlice'
import { useAppDispatch } from '../../app/hooks'

const defaultTimer = {
    hours: '00',
    minutes: '00',
    seconds: '00',
}

interface ICountDown {
    start: boolean
    prevTimeStore?: Dayjs
}

const CountDownTimer = ({ start, prevTimeStore }: ICountDown) => {
    const dispatch = useAppDispatch()

    const [remainingTime, setRemainingTime] = useState(defaultTimer)

 

    const updateRemainingTimer = (prev?: Dayjs) => {
        console.log('mining update')
        //setRemainingTime(countDown(prev))
    }
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

    useEffect(() => {
        if (start) {
            const intervalId = setInterval(() => {
                dispatch(increment())

                return updateRemainingTimer(prevTimeStore)
            }, 1000)

            return () => clearInterval(intervalId)
        }
    }, [start])

    const { hours, minutes, seconds } = remainingTime

    // return <div className='grid'>{isLoaded ? displayMine : 'Loading...'}</div>
    return (
        <div className='grid'>
            <div
                className=' justify-center grid w-max text-center py-2 px-10 rounded-lg place-self-center'
                style={neuToUse}
            >
                <p>
                    {hours}:{minutes}:{seconds}
                </p>
                <CountDown/>
            </div>
        </div>
    )
}

export default CountDownTimer
