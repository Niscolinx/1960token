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
    const response = await axios.post('/api/videoEnded', session)

    return response.data
}

