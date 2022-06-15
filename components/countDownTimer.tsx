import React from 'react'
import Countdown, { zeroPad } from 'react-countdown'

function CountDownTimer() {

    interface IcountDown {
        hours: number,
        minutes: number,
        seconds: number,
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
                <span>
                    {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}{' '}
                </span>
            )
        }
    }
  return (
      <div>
          <Countdown date={Date.now() + 10000} renderer={renderer} />
      </div>
  )
}

export default CountDownTimer