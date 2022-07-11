import { AppState } from '../../app/store'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { nextAuthSession } from '../../../lib/types'
import { IUser } from '../../../models/User'
import { userData, userPortfolio } from './UserApi'

const initialState: IUser = {
    _id: {},
    username: '',
    email: '',
    phoneNumber: '',
    isMining: false,
    miningStartedAt: '',
    role: '',
    upliner: '',
    referrals: [],
    totalMined: 0,
    portfolio: 0,
    status: 'idle',
    password: '',
    pendingWithdrawals: [],
    pendingDeposits: [],
    totalWithdrawals: [],
    totalDeposits: [],
}
export const updatePortolio = createAsyncThunk(
    'updatePortolio',
    async (userData: {userSession: nextAuthSession, data: number}) => {
        const {userSession, data} = userData
        const response = await userPortfolio(userSession, data)
        return response
    }
)
export const getUser = createAsyncThunk(
    'user',
    async (userSession: nextAuthSession) => {
        const response = await userData(userSession)
        return response
    }
)

export const UserSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getUser.fulfilled, (state, action) => {
                const payload = action.payload
                state.status = 'success'

                // for(let i in payload){
                //   state[i] = payload[i]
                // }

                Object.entries(payload).forEach((field) => {
                    const key = field[0] as 'username'
                    state[key] = field[1] as string 
                })
            })
            .addCase(getUser.rejected, (state) => {
                state.status = 'failed'
            })
            .addCase(updatePortolio.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(updatePortolio.fulfilled, (state, action) => {
                const {portfolio} = action.payload
                state.status = 'success'
            })
            .addCase(updatePortolio.rejected, (state) => {
                state.status = 'failed'
            })
    },
})

export const selectUser = (state: AppState) => state.user

export default UserSlice.reducer
