import axios, { AxiosResponse } from 'axios'
import dayjs from 'dayjs'
import { nextAuthSession } from '../../lib/types'

export async function startMining(
    session: nextAuthSession
): Promise<AxiosResponse<void>> {

    const getTimeStore = localStorage.getItem('miningTime')
    const response = await axios.post('/api/startMining', session )

    return response.data
}
