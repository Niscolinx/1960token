import { AppState } from './../../app/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { nextAuthSession } from '../../../lib/types'
import { videoEnded } from './VideoAPI'

export interface videoState {
    status: 'idle' | 'loading' | 'failed' | 'success'
    videoMined: number
}

const initialState: videoState = {
    status: 'idle',
    videoMined: 0,
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
        clearVideoTokens: (state, action) => {
            state.videoMined = 0
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(initVideoEnded.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(initVideoEnded.fulfilled, (state, action) => {
                const { videoMined } = action.payload
                state.status = 'success'

                state.videoMined = videoMined
            })
            .addCase(initVideoEnded.rejected, (state) => {
                state.status = 'failed'
            })
    },
})

export const {clearVideoTokens} = VideoSlice.actions

export const selectVideo = (state: AppState) => state.video as videoState

export default VideoSlice.reducer
