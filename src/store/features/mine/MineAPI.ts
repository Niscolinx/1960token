import axios from 'axios'
import { nextAuthSession } from '../../../lib/types'

interface IFetchedData {
    isMining: boolean
    miningStartedAt: string
    totalMined: number
}

export async function startMining(
    session: nextAuthSession
): Promise<IFetchedData> {
    const response = await axios.post('/api/startMining', session)

    return response.data
}
export async function stopMining(
    session: nextAuthSession
): Promise<IFetchedData> {
    const response = await axios.post('/api/stopMining', session)

    return response.data
}
