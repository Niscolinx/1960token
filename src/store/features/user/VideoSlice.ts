import { AppState } from './../../app/store';
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

export const VideoSlice = createSlice({
    name: 'videoEnded',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(initVideoEnded.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(initVideoEnded.fulfilled, (state, action) => {
                const { totalMined } = action.payload
                state.status = 'success'

                state.totalMined = totalMined
            })
            .addCase(initVideoEnded.rejected, (state) => {
                state.status = 'failed'
            })
    },
})

export const selectVideo = (state: AppState) => state.video as videoState

export default VideoSlice.reducer
