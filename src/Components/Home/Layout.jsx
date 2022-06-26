import React from 'react'
import Modal from '../Common/Modal'
import AppContainer from '../AppContainer'
import Link from 'next/link'
import TopBar from './TopBar';
import Head from 'next/head';

export default function Layout({ children, title = 'Home' }) {
  return (
    <AppContainer>

      <Head>
        <title>{title} | Spatial Community</title>
      </Head>

      <TopBar />

      {children}

    </AppContainer>
  )
}
