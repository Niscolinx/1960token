import axios from 'axios'
import { nextAuthSession } from '../../../lib/types'
import { IUser } from '../../../models/User'

export async function userData(
    session: nextAuthSession
): Promise<IUser> {
    const response = await axios.post('/api/user', session)

    return response.data
}
