import React from 'react'
import Layout from './../Components/Home/Layout';
import { Container } from '@chakra-ui/react';

export default function test() {
  return (
    <Layout title='Test'>
      <Container maxW='container.xl'>
        Hello Test

      </Container>
    </Layout>
  )
}
