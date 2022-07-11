import { AppState } from './../../app/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { nextAuthSession } from '../../../lib/types'
import { videoEnded } from './VideoAPI'

export interface videoState {
    status: 'idle' | 'loading' | 'failed' | 'success'
    totalMined: number
}

const initialState: videoState = {
    status: 'idle',
    totalMined: 0.0,
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
    reducers: {
        clearVideoM: (state, action) => {
            state.totalMined = 0
        },
    },

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

export const {clearVideoM} = VideoSlice.actions

export const selectVideo = (state: AppState) => state.video as videoState

export default VideoSlice.reducer
