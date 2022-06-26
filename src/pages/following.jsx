import React, { useState } from 'react'
import Layout from '../Components/Home/Layout'
import { Container } from '@chakra-ui/react';
import PageTitle from './../Components/Home/PageTitle';
import TitleNavigation from '../Components/Home/TitleNavigation';

export default function following() {


  return (
    <Layout title='Following'>
      <Container maxW='container.xl'>

        <PageTitle
          title='Welcome to Spatial community'
          // subtitle='In-depth knowledge, hidden settings, and trivia - dispense it or discover it here'
          navigation={<TitleNavigation />}
        />

        <div className="w-fit bg-gray-50">
          Following
        </div>

      </Container>

    </Layout>
  )
}
