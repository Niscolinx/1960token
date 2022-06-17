import React from 'react'
import Countdown, { CountdownApi, zeroPad } from 'react-countdown'

function CountDownTimer() {
    interface IcountDown {
        hours: number
        days: number
        minutes: number
        seconds: number
        completed: Boolean
        api: CountdownApi
    }

   

    const handleStart = (api: CountdownApi) => {
        return api.start()
    }

    const handleMount = (e: any) => {
        if (!localStorage.getItem('miningTime')) {
            console.log('not mounted')
            localStorage.setItem('miningTime', JSON.stringify(e))
            const date = new Date().getTime()

            localStorage.setItem('miningEnds', JSON.stringify({ date }))
        } else {
            const date1 = new Date('7/13/2010')
            const date2 = new Date('7/14/2010')
            // console.log(getDifferenceInDays(date1, date2))

            // const getDifferenceInDays(date1, date2) {
            //   const diffInMs = Math.abs(date2 - date1);
            //   return diffInMs / (1000 * 60 * 60 * 24);
            // }

            const getDifferenceInHours = (date1: any, date2: any) => {
                const diffInMs = Math.abs(date2 - date1)
                return diffInMs / (1000 * 60 * 60)
            }

            const getDifferenceInMinutes = (date1: any, date2: any) => {
                const diffInMs = Math.abs(date2 - date1)
                return diffInMs / (1000 * 60)
            }

            const getDifferenceInSeconds = (date1: any, date2: any) => {
                const diffInMs = Math.abs(date2 - date1)
                return diffInMs / 1000
            }
            console.log('already mounted')
            const dateNow = Date.now() + 1000 * 3600 * 6
            console.log({ dateNow })

            console.log(getDifferenceInHours(date1, date2))
            console.log(getDifferenceInMinutes(date1, date2))
            console.log(getDifferenceInSeconds(date1, date2))
        }
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
            <Countdown
                date={Date.now() * (3600 * 1000) * 6}
                renderer={renderer}
                //autoStart={false}
                //onMount={handleMount}
            />
        </div>
    )
}

export default CountDownTimer
