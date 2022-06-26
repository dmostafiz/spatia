import React from 'react'
import PageTitle from '../../Components/Home/PageTitle';
import Layout from './../../Components/Home/Layout';
import { Container } from '@chakra-ui/react';

export default function slug() {
  return (
    <Layout>
      <Container maxW='container.xl'>
        
        <PageTitle
          title='Discussion Overview'
          subtitle='In-depth knowledge, hidden settings, and trivia - dispense it or discover it here'
        />

      </Container>

    </Layout>
  )
}
