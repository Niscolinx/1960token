import dayjs, { Dayjs } from "dayjs"
export const countDownTimerInMs = (milliseconds: number) => {

    const dayjsRemainingTimeStamp = dayjs(milliseconds)
    const dayjsNowTimeStamp = dayjs()

    console.log({dayjsRemainingTimeStamp}, {dayjsNowTimeStamp})

    return {
        hours: hoursRemaining(dayjsNowTimeStamp, dayjsRemainingTimeStamp),
        minutes: minutesRemaining(dayjsNowTimeStamp, dayjsRemainingTimeStamp),
        seconds: secondsRemaining(dayjsNowTimeStamp, dayjsRemainingTimeStamp)
        
    }
}


const hoursRemaining = (now:Dayjs, remainingTime:Dayjs) => {
    const hours = remainingTime.diff(now, 'hours') % 24
    return hours
}
const minutesRemaining = (now:Dayjs, remainingTime:Dayjs) => {
    const minutes =  remainingTime.diff(now, 'minutes') % 60
}
const secondsRemaining = (now:Dayjs, remainingTime:Dayjs) => {
   const seconds = remainingTime.diff(now, 'seconds') % 60
   return seconds
}

const padWithZeros = (number:number, minLength:number) => {
const numberString = number.toString()

}
