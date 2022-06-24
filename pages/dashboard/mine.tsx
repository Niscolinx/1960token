import axios from 'axios'
import dayjs, { Dayjs } from 'dayjs'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import CountDownTimer from '../../components/countDownTimer'

function mine() {
        const { data: session } = useSession()

     const [miningStart, setMiningStart] = useState(false)
     const [prevTimeStore, setPrevTimeStore] = useState<Dayjs>()

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
      <div className='grid justify-center items-center'>
          {prevTimeStore && (
              <CountDownTimer
                  hour={12}
                  start={miningStart}
                  prevTimeStore={prevTimeStore}
              />
          )}
          <button onClick={handleStart}>Start</button>
      </div>
  )
}

export default mine