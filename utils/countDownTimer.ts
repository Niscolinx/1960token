import dayjs, { Dayjs } from 'dayjs'
export const countDownTimerInMs = (hour: number) => {
    const dayjsRemainingTimeStamp = dayjs(16436736000000)
    const dayjsNowTimeStamp = dayjs()

    console.log(dayjsNowTimeStamp.format())
    console.log(dayjsNowTimeStamp.diff(dayjsNowTimeStamp))

    if(dayjsRemainingTimeStamp.isBefore(dayjsNowTimeStamp)){
        console.log("before")
    }
    return {
        days: daysRemaining(dayjsNowTimeStamp, dayjsRemainingTimeStamp),
        hours: hoursRemaining(dayjsNowTimeStamp, dayjsRemainingTimeStamp),
        minutes: minutesRemaining(dayjsNowTimeStamp, dayjsRemainingTimeStamp),
        seconds: secondsRemaining(dayjsNowTimeStamp, dayjsRemainingTimeStamp),
    }
}

const daysRemaining = (now: Dayjs, remainingTime: Dayjs) => {
    const dayjs = remainingTime.diff(now, 'days') 
    return padWithZeros(dayjs, 2)
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
