import axios from "axios"
import dayjs from "dayjs"

export async function startMining(amount = 1): Promise<void> {
    const dayjsRemainingTimeStamp = dayjs().add(12, 'hours')

    const getTimeStore = localStorage.getItem('miningTime')

    if (!getTimeStore) {
        const remainingTime = dayjsRemainingTimeStamp

        axios
            .post('/api/startMining', { session, remainingTime })
            .then(({ data }) => {
                const { miningStart } = data
                localStorage.setItem('miningTime', miningStart)
                setPrevTimeStore(dayjs(miningStart))
            })
            .catch((err) => {
                console.log({ err })
            })
    } else {
        console.log('handle start already')
    }
}
