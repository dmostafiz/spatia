import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    io: null
}
export const SocketIoSlice = createSlice({
    name: 'socketIo',
    initialState,
    reducers: {
        connectIo: (state, action) => {
            state.io = action.payload.socket
        },
    }
})

export const { connectIo } = SocketIoSlice.actions

export default SocketIoSlice.reducer