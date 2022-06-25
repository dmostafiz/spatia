import React from 'react'
import Modal from '../Common/Modal'
import AppContainer from '../AppContainer'
import Link from 'next/link'
import TopBar from './TopBar';

export default function Layout({ children }) {
  return (
    <AppContainer>

      <TopBar />

      {children}

    </AppContainer>
  )
}
