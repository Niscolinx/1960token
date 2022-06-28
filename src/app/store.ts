import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import counterReducer from '../features/counter/counterSlice'
import MiningReducer from '../features/mine/MinerSlice'

export function makeStore() {
    return configureStore({
        reducer: { counter: counterReducer, mine: MiningReducer },
    })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>
export type MineState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
>

export default store
