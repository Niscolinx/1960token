import dayjs, { Dayjs } from "dayjs"
export const countDownTimerInMs = (milliseconds: number) => {
    const dayjsRemainingTimeStamp = dayjs(milliseconds)
    const dayjsNowTimeStamp = dayjs()

    return {
        hours: hoursRemaining(dayjsNowTimeStamp, dayjsRemainingTimeStamp),
        minutes: minutesRemaining(dayjsNowTimeStamp, dayjsRemainingTimeStamp),
        seconds: secondsRemaining(dayjsNowTimeStamp, dayjsRemainingTimeStamp)
        
    }
}


const hoursRemaining = (now:Dayjs, remainingTime:Dayjs) => {
    return now.diff(remainingTime, 'hours') % 24
}
const minutesRemaining = (now:Dayjs, remainingTime:Dayjs) => {
    return now.diff(remainingTime, 'minutes') % 60
}
const secondsRemaining = (now:Dayjs, remainingTime:Dayjs) => {
    return now.diff(remainingTime, 'seconds') % 60
}

