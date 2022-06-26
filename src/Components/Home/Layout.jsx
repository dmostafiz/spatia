import React from 'react'
import Modal from '../Common/Modal'
import AppContainer from '../AppContainer'
import Link from 'next/link'
import TopBar from './TopBar';
import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import Footer from './Footer';

export default function Layout({ children, title = 'Home' }) {
  return (
    <AppContainer>

      <Head>
        <title>{title} | Spatial Community</title>
      </Head>

      <TopBar />

      <Box as='div' minH='88vh' py={{base: 16, sm: 24, md: 24, lg:32}}>
        {children}
      </Box>

      <Footer />

    </AppContainer>
  )
}
