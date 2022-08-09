import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { io } from 'socket.io-client'
import { connectIo } from '../StateManager/Reducers/SocketIoSlice'

export default function initSocket() {

    const dispatch = useDispatch()

    useEffect(() => {
        const socket = io(`${process.env.SERVER_ENDPOINT}/`)
        dispatch(connectIo({socket}))
    }, [])

    return
}
