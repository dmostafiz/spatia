import React, { useState } from 'react'
import Layout from '../Components/Home/Layout'
import { Container } from '@chakra-ui/react';
import PageTitle from './../Components/Home/PageTitle';
import TitleNavigation from '../Components/Home/TitleNavigation';
import DiscussionItems from '../Components/Home/Discussion/DiscussionItems';

export default function index() {


  return (
    <Layout title='Home'>
      <Container maxW='container.xl'>

        <PageTitle
          title='Welcome to Spatial community'
          subtitle='In-depth knowledge, hidden settings, and trivia - dispense it or discover it here'
          navigation={<TitleNavigation />}
        />

        <DiscussionItems />

      </Container>

    </Layout>
  )
}
