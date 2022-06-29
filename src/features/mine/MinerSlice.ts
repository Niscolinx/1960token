import { nextAuthSession } from './../../lib/types';
import dayjs, { Dayjs } from 'dayjs';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState, AppThunk, MineState } from '../../app/store'
import { startMining } from './MineAPI'

export interface MiningState {
    value: number
    status: 'idle' | 'loading' | 'failed'
    startedMining: string
    hello: any
}

const initialState: MiningState = {
    value: 0,
    status: 'idle',
   // startedMining: JSON.stringify(dayjs().add(12, 'hours')),
    hello: ''
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const initMineAsync = createAsyncThunk('mining', async (userSession: nextAuthSession) => {
    console.log("reducer mining async")
    const response = await startMining(userSession)

    console.log({response})
    // The value we return becomes the `fulfilled` action payload
    return response
})

export const MiningSlice = createSlice({
    name: 'mine',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        increment: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1
        },
        decrement: (state) => {
            state.value -= 1
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        initMine: (state, action: PayloadAction<Dayjs>) => {
            state.hello = ''
        },
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder
            .addCase(initMineAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(initMineAsync.fulfilled, (state, action) => {
                state.status = 'idle'
            })
    },
})

export const { increment, decrement, initMine } = MiningSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectMining = (state: MineState) => state.mine.startedMining

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
