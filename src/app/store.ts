import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'


export function makeStore() {
    return configureStore({
        reducer: { mine: MiningReducer },
    })
}

const store = makeStore()

export type MineState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
>

export default store
