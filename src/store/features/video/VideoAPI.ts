import axios from 'axios'
import { nextAuthSession } from '../../../lib/types'

interface IFetchedData {
    videoMined: number
}

export async function videoEnded(
    session: nextAuthSession
): Promise<IFetchedData> {
    const response = await axios.post('/api/videoEnded', session)

    return response.data
}

