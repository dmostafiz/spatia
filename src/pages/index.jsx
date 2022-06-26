import React, { useState } from 'react'
import Layout from '../Components/Home/Layout'
import { Container } from '@chakra-ui/react';

export default function index() {


  return (
    <Layout title='Home'>
      <Container maxW='container.xl'>

        <div className="w-fit bg-gray-50">
          Hello Home Page
        </div>

      </Container>

    </Layout>
  )
}
