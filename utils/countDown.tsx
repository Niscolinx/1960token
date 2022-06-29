import { initStopMineAsync } from '../src/features/mine/MinerSlice';
import { useAppDispatch } from '../src/app/hooks';
import dayjs, { Dayjs } from 'dayjs'
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';


export const countDown = (prevTimeStore?: Dayjs) => {
   // const { data: session } = useSession()

   const [count, setcount] = useState(0)
    
    const dayjsNowTimeStamp = dayjs()
   // const dispatch = useAppDispatch()
    return (
        <div>Hello world, {count}</div>
    )
}

const hoursRemaining = (now: Dayjs, remainingTime: Dayjs) => {
    const hours = remainingTime.diff(now, 'hours') % 24
    return padWithZeros(hours, 2)
}
const minutesRemaining = (now: Dayjs, remainingTime: Dayjs) => {
    const minutes = remainingTime.diff(now, 'minutes') % 60
    return padWithZeros(minutes, 2)
}
const secondsRemaining = (now: Dayjs, remainingTime: Dayjs) => {
    const seconds = remainingTime.diff(now, 'seconds') % 60
    return padWithZeros(seconds, 2)
}

const padWithZeros = (number: number, minLength: number) => {
    const numberString = number.toString()
    if (numberString.length >= minLength) return numberString

    return '0'.repeat(minLength - numberString.length) + numberString
}
