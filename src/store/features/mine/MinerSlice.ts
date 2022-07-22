import dayjs from 'dayjs'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import type { AppState } from '../../app/store'
import { startMining, stopMining } from './MineAPI'
import { nextAuthSession } from '../../../lib/types'

export interface MiningState {
    isMining: boolean
    status: 'idle' | 'loading' | 'failed' | 'success'
    miningStartedAt: string
    tokensMined: number
    miningSession: 'over' | 'active' | 'stall'
    countDownToken: string
    tokensCount: number
}

const initialState: MiningState = {
    isMining: false,
    status: 'idle',
    miningStartedAt: JSON.stringify(dayjs().add(12, 'hour')),
    tokensMined: 0,
    miningSession: 'stall',
    countDownToken: '',
    tokensCount: 0
}

export const initMineAsync = createAsyncThunk(
    'mining',
    async (userSession: nextAuthSession | any) => {
        const response = await startMining(userSession)

        console.log('mining',{ response })
        // The value we return becomes the `fulfilled` action payload
        return response
    }
)
export const initStopMineAsync = createAsyncThunk(
    'stopMining',
    async (userSession: nextAuthSession) => {
        const response = await stopMining(userSession)

        console.log('init stopMining', { response })
        // The value we return becomes the `fulfilled` action payload
        return response
    }
)

export const MiningSlice = createSlice({
    name: 'mine',
    initialState,
    reducers: {
        increment: (state, action) => {
            state.countDownToken = action.payload
        },
        increaseTokenCount: (state) => {
            state.tokensCount += 0.00001158
        },

        clearMineTokens: (state) => {
            state.tokensMined = 0
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(initMineAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(initMineAsync.fulfilled, (state, action) => {
                const { isMining, miningStartedAt } = action.payload
                state.status = 'success'
                state.miningStartedAt = miningStartedAt
                state.isMining = isMining
                state.miningSession = 'active'
            })
            .addCase(initMineAsync.rejected, (state) => {
                state.status = 'failed'
            })
            .addCase(initStopMineAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(initStopMineAsync.fulfilled, (state, action) => {
                const { isMining, miningStartedAt, tokensMined } = action.payload
                state.status = 'success'
                state.miningStartedAt = miningStartedAt
                state.isMining = isMining
                state.miningSession = 'over'
                state.tokensMined = tokensMined
                localStorage.removeItem('persist:root')
            })
            .addCase(initStopMineAsync.rejected, (state) => {
                state.status = 'failed'
            })
    },
})

export const { increment, increaseTokenCount, clearMineTokens} = MiningSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectMining = (state: AppState) => state.mine as MiningState

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//     (amount: number): AppThunk =>
//     (dispatch, getState) => {
//         const currentValue = selectCount(getState())
//         if (currentValue % 2 === 1) {
//             dispatch(incrementByAmount(amount))
//         }
//     }

export default MiningSlice.reducer
