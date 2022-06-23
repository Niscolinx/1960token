import React, { useState, useLayoutEffect, useEffect } from 'react'
import { countDownTimerInMs } from '../utils/countDownTimer'
import { useSession } from 'next-auth/react'
import axios from 'axios'

const defaultTimer = {
    hours: '00',
    minutes: '00',
    seconds: '00'
}

const CountDownTimer = ({milliseconds}: {milliseconds: number}) => {
    const [miningTime, setMiningTime] = useState<number>()

    const { data: session } = useSession()

    const [remainingTime, setRemainingTime] = useState(defaultTimer)

    const updateRemainingTimer = (TimerInMs:number) => {
        console.log(TimerInMs)
    }
   
    useEffect(() => {
        const intervalId = setInterval(() => {
            return updateRemainingTimer(countDownTimerInMs(milliseconds))
        }, 1000)

        return () => clearInterval(intervalId)
    }, [])
       
    const {hours, minutes, seconds} = remainingTime

    // return <div className='grid'>{isLoaded ? displayMine : 'Loading...'}</div>
    return <div className='grid'><div
                    className=' justify-center grid w-max text-center py-2 px-10 rounded-lg place-self-center mt-10'
                    style={{
                        background: `linear-gradient(145deg, #1c1c30, #171729)`,
                        boxShadow: `7px 7px 14px #161625,
             -7px -7px 14px #1e1e35`,
                        borderRadius: '50px',
                    }}
                >
                    <p>
                        {miningTime ? 'Remaining time - ' : ''}
                        <span className='font-semibold'>
                            {/* {zeroPad(hours)}:{zeroPad(minutes)}:
                            {zeroPad(seconds)} */}
                        </span>
                    </p>
                    {/* <button onClick={() => handleStart(api)}>Mine</button> */}
                    <p>{hours}:{minutes}:{seconds}</p>
                </div></div>
}

export default CountDownTimer

// import axios from 'axios'
// import { useSession } from 'next-auth/react'
// import React, { useState, useEffect, useLayoutEffect } from 'react'
// import Countdown, { CountdownApi, zeroPad } from 'react-countdown'

// function CountDownTimer() {
//     interface IFetchedMining {
//         isMining: boolean
//         miningStart: string
//     }
//     const [miningTime, setMiningTime] = useState<number>()
//     const [fetchedMining, setFetchedMining] = useState<IFetchedMining>()
//     const [toDisplayMine, setTodisplayMine] = useState(false)
//     const { data: session } = useSession()

//     useLayoutEffect(() => {
//         if (!localStorage.getItem('miningStart')) {
//             setTodisplayMine(false)
//         } else {
//             const get = localStorage.getItem('miningStart')
//             const presentdate = new Date()

//             const transFormPrevDate = new Date(get!)
//             const diff =
//                 (presentdate.getTime() - transFormPrevDate.getTime()) / 1000
//             setMiningTime(diff)
//             setTodisplayMine(true)
//         }
//     })

//     useEffect(() => {
//         axios
//             .post('/api/user', session)
//             .then(({ data }) => {
//                 console.log({ data })
//                 data.isMining !== true
//                     ? localStorage.removeItem('miningStart')
//                     : ''
//                 setFetchedMining(data)
//             })
//             .catch((err) => {
//                 console.log({ err })
//             })
//     }, [])

//     useEffect(() => {
//         if (
//             fetchedMining &&
//             fetchedMining.isMining &&
//             !localStorage.getItem('miningStart')
//         ) {
//             console.log('fetched mining', fetchedMining)
//             const { miningStart } = fetchedMining
//             localStorage.setItem('miningStart', miningStart)
//             const presentdate = new Date()

//             const transFormPrevDate = new Date(miningStart)
//             const diff =
//                 (presentdate.getTime() - transFormPrevDate.getTime()) / 1000
//             setMiningTime(diff)
//         }
//     }, [miningTime, fetchedMining])
//     interface IcountDown {
//         hours: number
//         days: number
//         minutes: number
//         seconds: number
//         completed: Boolean
//         api: CountdownApi
//     }

//     const handleStart = (api: CountdownApi) => {
//         if (!localStorage.getItem('miningStart')) {
//             console.log('handle start init')
//             const date = new Date()

//             axios
//                 .post('/api/startMining', { session, date })
//                 .then(({ data }) => {
//                     const { miningStart } = data
//                     setFetchedMining(data)
//                     localStorage.setItem('miningStart', miningStart)
//                 })
//                 .catch((err) => {
//                     console.log({ err })
//                 })
//         } else {
//             console.log('handle start already')
//         }
//         return api.start()
//     }

//     const Completionist = () => <span>Mining Session has ended</span>

//     // Renderer callback with condition
//     const renderer = ({
//         hours,
//         minutes,
//         seconds,
//         completed,
//         api,
//     }: IcountDown) => {
//         if (completed) {
//             // Render a completed state
//             console.log('mining ended')
//             localStorage.removeItem('miningStarts')

//             return <Completionist />
//         } else {
//             // Render a countdown
//             return (
//                 <div
//                     className=' justify-center grid w-max text-center py-2 px-10 rounded-lg place-self-center mt-10'
//                     style={{
//                         background: `linear-gradient(145deg, #1c1c30, #171729)`,
//                         boxShadow: `7px 7px 14px #161625,
//              -7px -7px 14px #1e1e35`,
//                         borderRadius: '50px',
//                     }}
//                 >
//                     <p>
//                         Remaining time -{' '}
//                         <span className='font-semibold'>
//                             {zeroPad(hours)}:{zeroPad(minutes)}:
//                             {zeroPad(seconds)}
//                         </span>
//                     </p>
//                     <button onClick={() => handleStart(api)}>Mine</button>
//                 </div>
//             )
//         }
//     }

//     let displayMine = toDisplayMine ? (
//         <Countdown
//             date={Date.now() + 1000 * (21600 - miningTime)}
//             renderer={renderer}
//             autoStart={true}
//         />
//     ) : (
//         <Countdown
//             date={Date.now() + 1000 * 21600}
//             renderer={renderer}
//             autoStart={false}
//         />
//     )

//     return <div className='grid'>{displayMine}</div>
// }

// export default CountDownTimer
