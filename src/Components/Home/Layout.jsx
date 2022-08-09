import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Modal from '../Common/Modal'
import AppContainer from '../AppContainer'
import Link from 'next/link'
import TopBar from './TopBar';
import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import Footer from './Footer';
import authUser from '../../Hooks/authUser';
import initSocket from '../../Hooks/initSocket';
import { useSelector, useDispatch } from 'react-redux'
import { setOnline } from '../../StateManager/Reducers/UserOnlineSlice';

export default function Layout({ children, title = 'Home' }) {
  initSocket()

  const titleHead = `${title} | Spatial Community`

  const socket = useSelector(state => state.socket.io)

  const aUser = authUser()

  const dispatch = useDispatch()

  useEffect(() => {
    console.log('Socket from redux ', socket)
    socket?.emit('addUser', {
      user: aUser?.data
    })
  }, [aUser, socket])


  useEffect(() => {

    socket?.on('userAdded', (users) => {
      console.log('userAdded called from server ', users)

      dispatch(setOnline(users))

    })
  }, [socket])


  return (
    <AppContainer>

      <Head>
        <title>{titleHead}</title>
      </Head>


      <TopBar />

      <Box
        as='div'
        minH='calc(100vh - 70px)'
        py={{ base: 24, sm: 24, md: 28, lg: 32 }}
      >
        {children}

      </Box>

      <Footer />

    </AppContainer>
  )
}
