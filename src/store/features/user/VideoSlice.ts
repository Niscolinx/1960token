import { AppState } from './../../app/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { nextAuthSession } from '../../../lib/types'
import { IUser } from '../../../models/User';


const initialState: IUser = {
     _id: Object
    username: string
    email: string
    phoneNumber: string
    isMining: boolean
    miningStartedAt: string
    role: string
    totalMined: number
    portfolio: number
    status: string
    password: string
    pendingWithdrawals: Types.ObjectId[]
    pendingDeposits: Types.ObjectId[]
    totalWithdrawals: Types.ObjectId[]
    totalDeposits: Types.ObjectId[]
}
export const initVideoEnded = createAsyncThunk(
    'video',
    async (userSession: nextAuthSession) => {
        const response = await videoEnded(userSession)

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
