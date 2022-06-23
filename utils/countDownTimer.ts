import dayjs, { Dayjs } from 'dayjs'
export const countDownTimerInMs = (hour: number) => {
    const dayjsRemainingTimeStamp = dayjs().add(365, 'hours')

    const getTimeStore = localStorage.getItem('miningTime')
    let prevTimeStore = null

    if (!getTimeStore) {
         localStorage.setItem(
            'miningTime',
            JSON.stringify(dayjsRemainingTimeStamp)
        )

    }else{
        prevTimeStore = dayjs(JSON.parse(getTimeStore))

    
    }

    console.log({prevTimeStore})

    const dayjsNowTimeStamp = dayjs()

    console.log(
        'format',
        dayjsNowTimeStamp.format(),
        prevTimeStore
    )

    if(prevTimeStore)
    if (prevTimeStore.isBefore(dayjsNowTimeStamp)) {
        console.log('before')
    }
    if(prevTimeStore)
    return {
        hours: hoursRemaining(dayjsNowTimeStamp, prevTimeStore),
        minutes: minutesRemaining(dayjsNowTimeStamp, prevTimeStore),
        seconds: secondsRemaining(dayjsNowTimeStamp, prevTimeStore),
    }
    else{
        return {

            hours: '00',
            minutes: '00',
            seconds: '00'
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
