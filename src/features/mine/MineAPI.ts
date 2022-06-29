import axios, { AxiosResponse } from 'axios'
import dayjs from 'dayjs'
import { nextAuthSession } from '../../lib/types'

export async function startMining(
    session: nextAuthSession
): Promise<AxiosResponse<boolean>> {
    const dayjsRemainingTimeStamp = dayjs().add(12, 'hours')

    const getTimeStore = localStorage.getItem('miningTime')

    console.log('in start mining api')

    // if (!getTimeStore) {
    //const remainingTime = dayjsRemainingTimeStamp

    const response = await axios.post('/api/startMining', session )

    return response.data
}
