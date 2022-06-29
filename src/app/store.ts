import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import MiningReducer from '../features/mine/MinerSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, MiningReducer)

export function makeStore() {
    return configureStore({
        reducer: { mine: persistedReducer },
    })
}

const store = makeStore()

export type MineState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    MineState,
    unknown,
    Action<string>
>

export default store
