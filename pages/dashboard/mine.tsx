import axios from 'axios'
import dayjs, { Dayjs } from 'dayjs'
import { useSession } from 'next-auth/react'
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import CountDownTimer from '../../components/countDownTimer'

function mine() {
    const { data: session } = useSession()

    const [miningStart, setMiningStart] = useState(false)
    const [prevTimeStore, setPrevTimeStore] = useState<Dayjs>()

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
        <div className='grid justify-center h-[82vh] self-center '>
            <div className='grid self-center'>
                {prevTimeStore && (
                    <CountDownTimer
                        hour={12}
                        start={miningStart}
                        prevTimeStore={prevTimeStore}
                    />
                )}
                <button onClick={handleStart}>Start</button>
            </div>
        </div>
    )
}

export default mine
