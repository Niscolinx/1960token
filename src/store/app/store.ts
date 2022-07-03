import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit'
import MiningReducer from '../features/mine/MinerSlice'
import VideoReducer from '../features/video/VideoSlice'
import storage from 'redux-persist/lib/storage'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    mine: MiningReducer,
    video: VideoReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: rootReducer,
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

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
>
