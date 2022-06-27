import React from 'react'
import PageTitle from '../../Components/Home/PageTitle';
import Layout from '../../Components/Home/Layout';
import { Container, Box, Flex, VStack } from '@chakra-ui/react';
import CategoryLeftSidebar from '../../Components/Home/Category/CategoryLeftSidebar';
import CategoryRightSidebar from '../../Components/Home/Category/CategoryRightSidebar';
import CategoryContents from '../../Components/Home/Category/CategoryContents';
import CategoryContentsTopbar from '../../Components/Home/Category/CategoryContentsTopbar';

export default function slug() {
  return (
    <Layout>
      <Container maxW='container.xl'>

        <PageTitle
          title='Discussion Overview'
          subtitle='In-depth knowledge, hidden settings, and trivia - dispense it or discover it here'
        // navigation={<NavigationInCategory />}
        />

        <Flex gap={5} direction={{ base: 'column', lg: 'row' }}>

          <Box maxW={{base:'100vw', lg:200}}>
            <CategoryLeftSidebar />
          </Box>

          <Box flex='1' minH='calc(100vh - 300px)' bg='green.500'>
            <VStack alignItems='flex-start'>
              <CategoryContentsTopbar />
              <CategoryContents />
            </VStack>
          </Box>

          <CategoryRightSidebar />

        </Flex>

      </Container>

    </Layout>
  )
}
