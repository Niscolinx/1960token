import React from 'react'
import Countdown, { CountdownApi, zeroPad } from 'react-countdown'

function CountDownTimer() {
    interface IcountDown {
        hours: number
        minutes: number
        seconds: number
        completed: Boolean
        api: CountdownApi
    }

    const handleStart = (api: CountdownApi) => {
        return api.start()
    }

    const handleMount = (e:any) => {
        if(!localStorage.getItem('miningTime')){

            localStorage.setItem('miningTime', JSON.stringify(e))
        }
    }

    const Completionist = () => <span>Mining Session has ended</span>



    // Renderer callback with condition
    const renderer = ({ hours, minutes, seconds, completed, api }: IcountDown) => {
        
       
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
                date={Date.now() + 3600 * 1000 * 6}
                renderer={renderer}
                autoStart={false}
                onMount={handleMount}
            />
        </div>
    )
}

export default CountDownTimer
