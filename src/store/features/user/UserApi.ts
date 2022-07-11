import axios from 'axios'
import { nextAuthSession } from '../../../lib/types'
import { IUser } from '../../../models/User'

export async function userData(
    session: nextAuthSession
): Promise<IUser> {
    const response = await axios.post('/api/user', session)

    return response.data
}


export async function userPortfolio(
    session: nextAuthSession,
    portfolio: number
): Promise<{portfolio: number}> {
    const response = await axios.post('/api/portfolio', {session, portfolio})

    return response.data
}


