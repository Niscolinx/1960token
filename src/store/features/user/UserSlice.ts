import { AppState } from '../../app/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { nextAuthSession } from '../../../lib/types'
import { IUser } from '../../../models/User';
import { userData } from './UserApi';


const initialState: IUser = {
     _id: {},
    username: '',
    email: '',
    phoneNumber: '',
    isMining: false,
    miningStartedAt: '',
    role: '',
    totalMined: 0,
    portfolio: 0,
    status: '',
    password: '',
    pendingWithdrawals: [],
    pendingDeposits: [],
    totalWithdrawals: [],
    totalDeposits: []
}
export const getUser = createAsyncThunk(
    'user',
    async (userSession: nextAuthSession) => {
        const response = await userData(userSession)

        console.log({ response })
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
                state.status = 'success'

                state = action.payload
            })
            .addCase(getUser.rejected, (state) => {
                state.status = 'failed'
            })
    },
})

export const selectUser = (state: AppState) => state.user

export default UserSlice.reducer