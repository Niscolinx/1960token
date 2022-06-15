import React from 'react'
import Countdown from 'react-countdown'

function CountDownTimer() {
  return (
      <div>
          <Countdown date={Date.now() + 10000} />,
      </div>
  )
}

export default CountDownTimer