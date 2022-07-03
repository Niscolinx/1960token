import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import MiningReducer from '../features/mine/MinerSlice'
import VideoReducer from '../features/video/VideoSlice'
import storage from 'redux-persist/lib/storage'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, MiningReducer)

export const store = configureStore({
    reducer: { mine: persistedReducer, video: VideoReducer },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
})

export const persistedStore = persistStore(store)

export type MineState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    MineState,
    unknown,
    Action<string>
>
