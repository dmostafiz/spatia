import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Modal from '../Common/Modal'
import AppContainer from '../AppContainer'
import Link from 'next/link'
import TopBar from './TopBar';
import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import Footer from './Footer';
import authUser from '../../Hooks/authUser';

export default function Layout({ children, title = 'Home' }) {

  const titleHead = `${title} | Spatial Community`

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
