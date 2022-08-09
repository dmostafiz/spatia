import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import SocketIoSlice from './Reducers/SocketIoSlice'
import UserOnlineSlice from './Reducers/UserOnlineSlice'

const combineReducer = combineReducers({
    onlineState: UserOnlineSlice,
    socket: SocketIoSlice
})

export const makeStore = () =>
    configureStore({
        reducer: combineReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
        devTools: process.env.NODE_ENV !== 'production'
    })


export const wrapper = createWrapper(makeStore)

