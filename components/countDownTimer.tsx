import React from 'react'
import Countdown, { zeroPad } from 'react-countdown'

function CountDownTimer() {
    interface IcountDown {
        hours: number
        minutes: number
        seconds: number
        completed: Boolean
    }

    const Completionist = () => <span>You are good to go!</span>

    // Renderer callback with condition
    const renderer = ({ hours, minutes, seconds, completed }: IcountDown) => {
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
                        Remaining mining time -{' '}
                        <span>
                            {zeroPad(hours)}:{zeroPad(minutes)}:
                            {zeroPad(seconds)}
                        </span>
                    </p>
                </div>
            )
        }
    }
    return (
        <div>
            <Countdown
                date={Date.now() + 3600 * 1000 * 6}
                renderer={renderer}
            />
        </div>
    )
}

export default CountDownTimer
