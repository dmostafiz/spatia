import React from 'react'
import PageTitle from '../../Components/Home/PageTitle';
import Layout from '../../Components/Home/Layout';
import { Container, Box, Flex, VStack, Show } from '@chakra-ui/react';
import CategoryLeftSidebar from '../../Components/Home/Category/CategoryLeftSidebar';
import CategoryRightSidebar from '../../Components/Home/Category/CategoryRightSidebar';
import CategoryContents from '../../Components/Home/Category/CategoryContents';
import CategoryContentsTopbar from '../../Components/Home/Category/CategoryContentsTopbar';
import StickyBox from "react-sticky-box"
import { useRouter } from 'next/router';
import ContentLoader from '../../Components/Home/ContentLoader';
import useClientAuth from '../../Hooks/useClientAuth';
import axios from 'axios'
import BigSpinner from './../../Components/Common/BigSpinner';
import useSWR from 'swr';

export default function slug() {


  const user = useClientAuth()

  const router = useRouter();

  const { data, error } = useSWR(`/category/${router.query?.slug}`, async () => {
    const res = await axios.get(`/category/${router.query?.slug}`)
    // setLoading(false)
    return res.data
  })


  return (
    <Layout title={data?.title}>

      <Container maxW='container.xl'>


        <PageTitle
          title={data?.title}
          subtitle={data?.description}
        // navigation={<NavigationIndata />}
        />

        <Flex gap={5} direction={{ base: 'column', lg: 'row' }}>

          <Box maxW={{ base: '100vw', lg: 200 }}>
            <StickyBox offsetTop={110}>

              {/* Category left sidebar */}
              <CategoryLeftSidebar currentCategory={data} />

            </StickyBox>
          </Box>

          <Box flex='1' minH='calc(100vh - 300px)'>
            <VStack alignItems='flex-start'>

              {/* Topbar of the category page */}
              <CategoryContentsTopbar />

              {/* Contents Of Category */}
              {!data ? <BigSpinner /> : <CategoryContents discussions={data?.discussions} />}

            </VStack>
          </Box>


          <Show above='md'>
            <Box w={200} minH='100vh' overflowWrap='hidden'>
              <StickyBox offsetTop={250}>

                {/* Right sidebar (Scroll navigator) */}
                {data && <CategoryRightSidebar />}

              </StickyBox>
            </Box>
          </Show>

        </Flex>

      </Container>

    </Layout>
  )
}
