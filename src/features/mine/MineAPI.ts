import axios from "axios"
import dayjs from "dayjs"
import { nextAuthSession } from "../../lib/types"

export async function startMining(session:nextAuthSession): Promise<void> {
    const dayjsRemainingTimeStamp = dayjs().add(12, 'hours')

    const getTimeStore = localStorage.getItem('miningTime')

    if (!getTimeStore) {
        const remainingTime = dayjsRemainingTimeStamp

        axios
            .post('/api/startMining', { session, remainingTime })
            .then(({ data }) => {
                // const { miningStart } = data
                // localStorage.setItem('miningTime', miningStart)
                // setPrevTimeStore(dayjs(miningStart))

                return data
            })
            
    
}
