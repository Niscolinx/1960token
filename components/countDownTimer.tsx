import axios from 'axios'
import { useSession } from 'next-auth/react'
import React, { useState, useEffect } from 'react'
import Countdown, { CountdownApi, zeroPad } from 'react-countdown'

function CountDownTimer() {
    const [miningTime, setMiningTime] = useState<number>()
    const [fetchedMining, setFetchedMining] = useState()
    const { data: session } = useSession()

    useEffect(() => {
        axios
            .post('/api/user', session)
            .then(({ data }) => {
                setFetchedMining(data)
            })
            .catch((err) => {
                console.log({ err })
            })
    }, [])

    useEffect(() => {
        if (fetchedMining) {
            console.log("fetched mining")
            const { miningStart } = fetchedMining
            localStorage.setItem('miningStart', miningStart)
        } else {
            const prevDate = localStorage.getItem('miningStarts')
            console.log(prevDate)

            const presentdate = new Date()
            console.log({ presentdate })

            if (prevDate) {
                const transFormPrevDate = new Date(prevDate)
                const diff =
                    (presentdate.getTime() - transFormPrevDate.getTime()) / 1000
                setMiningTime(diff)
            }
        }
        const presentdate = new Date()

        if (fetchedMining) {
            const { miningStart } = fetchedMining
            const transFormPrevDate = new Date(miningStart)
            const diff =
                (presentdate.getTime() - transFormPrevDate.getTime()) / 1000
            setMiningTime(diff)
        }
    }, [miningTime, fetchedMining])
    interface IcountDown {
        hours: number
        days: number
        minutes: number
        seconds: number
        completed: Boolean
        api: CountdownApi
    }

    const handleStart = (api: CountdownApi) => {
        if (!localStorage.getItem('miningStart')) {
            console.log("handle start init")
            const date = new Date()

            axios
                .post('/api/startMining', { session, date })
                .then(({ data }) => {
                    const {miningStart} = data
                    setFetchedMining(data)
                    localStorage.setItem('miningStart', miningStart)
                })
                .catch((err) => {
                    console.log({ err })
                })
        }
       
        else{
            console.log("handle start already")
        }
        return api.start()
    }

    const Completionist = () => <span>Mining Session has ended</span>

    // Renderer callback with condition
    const renderer = ({
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
    console.log({ fetchedMining })
    let count = undefined
    return (
        <div className='grid'>
            {miningTime ? (
                <Countdown
                    date={Date.now() + 1000 * (21600 - miningTime)}
                    renderer={renderer}
                    autoStart={true}
                />
            ) : (
                <Countdown
                    date={Date.now() + 1000 * 21600}
                    renderer={renderer}
                    autoStart={false}
                />
            )}
        </div>
    )
}

export default CountDownTimer
