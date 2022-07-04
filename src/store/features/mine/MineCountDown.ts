import dayjs, { Dayjs } from 'dayjs'

//mining utils
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

//token utils
let count = 0.00001158
// X = 0.5/12
// X = 0.04166 per hour ~ 0.0417Tk

// Per Minute
// X = 0.000695

// Per Second
// X = 0.00001158
const IncrementSeconds = (now: Dayjs, remainingTime: Dayjs) => {
    count += 0.00001158
    const seconds = count.toFixed(7)
    // return padWithDecimalZeros(seconds, 8)
    return seconds
}

const padWithDecimalZeros = (number: number, minLength: number) => {
    const numberString = number.toString()
    if (numberString.length >= minLength) return numberString

    return '0'.repeat(minLength - numberString.length) + numberString
}

//mining function
export const MineCountDown = (prevTimeStore?: Dayjs) => {
    const dayjsNowTimeStamp = dayjs()

    if (dayjsNowTimeStamp.isAfter(prevTimeStore)) {
        return {
            hours: '00',
            minutes: '00',
            seconds: '00',
        }
    }
    if (prevTimeStore) {
        return {
            hours: hoursRemaining(dayjsNowTimeStamp, prevTimeStore),
            minutes: minutesRemaining(dayjsNowTimeStamp, prevTimeStore),
            seconds: secondsRemaining(dayjsNowTimeStamp, prevTimeStore),
        }
    } else {
        return {
            hours: '00',
            minutes: '00',
            seconds: '00',
        }
    }
}

//token function
export const tokenCountDown = (prevTimeStore?: Dayjs) => {
    const dayjsNowTimeStamp = dayjs()

    if (prevTimeStore) {
        const seconds = IncrementSeconds(dayjsNowTimeStamp, prevTimeStore)
        return seconds
    } else return '00'
}
