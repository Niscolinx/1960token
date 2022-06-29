import { initStopMineAsync } from './../src/features/mine/MinerSlice';
import { useAppDispatch } from './../src/app/hooks';
import dayjs, { Dayjs } from 'dayjs'
export const countDown = (prevTimeStore?: Dayjs) => {
    
    const dayjsNowTimeStamp = dayjs()
    const dispatch = useAppDispatch()
    if(dayjsNowTimeStamp.isAfter(prevTimeStore)){
        console.log("Timer finished")
        dispatch(initStopMineAsync)
       return {
           hours: '00',
           minutes: '00',
           seconds: '00',
       }
    }
  

    if (prevTimeStore){
        return {
            hours: hoursRemaining(dayjsNowTimeStamp, prevTimeStore),
            minutes: minutesRemaining(dayjsNowTimeStamp, prevTimeStore),
            seconds: secondsRemaining(dayjsNowTimeStamp, prevTimeStore),
        }
    }
    else {
        return {
            hours: '00',
            minutes: '00',
            seconds: '00',
        }
    }
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
