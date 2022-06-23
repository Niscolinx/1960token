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
    return remainingTime.diff(now, 'hours') % 24
}
const minutesRemaining = (now:Dayjs, remainingTime:Dayjs) => {
    return remainingTime.diff(now, 'minutes') % 60
}
const secondsRemaining = (now:Dayjs, remainingTime:Dayjs) => {
    return remainingTime.diff(now, 'seconds') % 60
}

