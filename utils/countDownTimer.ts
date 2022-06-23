import dayjs from "dayjs"
export const countDownTimerInMs = (milliseconds: number) => {
    const dayjsRemainingTimeStamp = dayjs(milliseconds)
    const dayjsNowTimeStamp = dayjs()

    return {
        hours: hoursRemaining(dayjsNowTimeStamp, dayjsRemainingTimeStamp),
        minutes: minutesRemaining(dayjsNowTimeStamp, dayjsRemainingTimeStamp),
        seconds: secondsRemaining(dayjsNowTimeStamp, dayjsRemainingTimeStamp)
        
    }
}


const hoursRemaining = (now, remainingTime) => {

}

