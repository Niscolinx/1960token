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

interface timerProps {
    now: Dayjs,
    remainingTime: Dayjs
}

const hoursRemaining = ({now, remainingTime}:timerProps) => {
    return now.diff(remainingTime, 'hours') % 24
}
const minutesRemaining = ({now, remainingTime}:timerProps) => {
    return now.diff(remainingTime, 'minutes') % 60
}
const secondsRemaining = ({now, remainingTime}:timerProps) => {
    return now.diff(remainingTime, 'seconds') % 60
}

