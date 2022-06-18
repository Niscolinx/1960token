import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useState, useEffect } from 'react'
import Countdown, { CountdownApi, zeroPad } from 'react-countdown'

function CountDownTimer() {
    const [miningTime, setMiningTime] = useState<number>()
    const [fetchedMine, setFetchedMining] = useState()
    const { data: session } = useSession()

    useEffect(() => {
        axios
            .post('/api/user', session)
            .then(({data}) => {
                console.log({ data })
                setFetchedMining(data)
            })
            .catch((err) => {
                console.log({ err })
            })
    }, [])

    useEffect(() => {
        if (!localStorage.getItem('miningStarts')) {
            const date = new Date()
            localStorage.setItem('miningStarts', date.toString())
        } else {
            const prevDate = localStorage.getItem('miningStarts')

            const presentdate = new Date()

            if (prevDate) {
                const transFormPrevDate = new Date(prevDate)
                const diff =
                    (presentdate.getTime() - transFormPrevDate.getTime()) / 1000
                setMiningTime(diff)
            }
        }
    }, [miningTime])
    interface IcountDown {
        hours: number
        days: number
        minutes: number
        seconds: number
        completed: Boolean
        api: CountdownApi
    }

    const handleStart = (api: CountdownApi) => {
        const date = new Date()

        axios
            .post('/api/startMining', { session, date })
            .then(({data}) => {
                console.log({ data })
            })
            .catch((err) => {
                console.log({ err })
            })

        return api.start()
    }

    const Completionist = () => <span>Mining Session has ended</span>

    // Renderer callback with condition
    const renderer = ({
        days,
        hours,
        minutes,
        seconds,
        completed,
        api,
    }: IcountDown) => {
        if (completed) {
            // Render a completed state
            console.log('mining ended')
            localStorage.removeItem('miningStarts')

            return <Completionist />
        } else {
            // Render a countdown
            return (
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
                        Remaining time -{' '}
                        <span className='font-semibold'>
                            {zeroPad(hours)}:{zeroPad(minutes)}:
                            {zeroPad(seconds)}
                        </span>
                    </p>
                    <button onClick={() => handleStart(api)}>Mine</button>
                </div>
            )
        }
    }
    return (
        <div className='grid'>
            {miningTime && (
                <Countdown
                    date={Date.now() + 1000 * (21600 - miningTime)}
                    renderer={renderer}
                    autoStart={false}
                />
            )}
        </div>
    )
}

export default CountDownTimer
