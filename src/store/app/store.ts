import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit'
import MiningReducer from '../features/mine/MinerSlice'
import VideoReducer from '../features/video/VideoSlice'
import UserReducer from '../features/user/UserSlice'
import storage from 'redux-persist/lib/storage'
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['video', 'user', 'mine']
}

const rootReducer = combineReducers({
    mine: MiningReducer,
    video: VideoReducer,
    user: UserReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
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
