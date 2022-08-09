import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users : []
}

export const UserOnlineSlice = createSlice({
    name: 'onlineUsersState',
    initialState,
    reducers: {
        setOnline: (state, action) => {
            state.users = action.payload
        }
    }
})

export const { setOnline } = UserOnlineSlice.actions

export default UserOnlineSlice.reducer