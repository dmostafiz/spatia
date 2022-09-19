import React, { useEffect, useState } from 'react'
import PageTitle from '../Components/Home/PageTitle';
import Layout from '../Components/Home/Layout';
import { Container, Box, Flex, VStack, Stack, Skeleton, Text, Center, Show } from '@chakra-ui/react';
import CategoryLeftSidebar from '../Components/Home/Category/CategoryLeftSidebar';
import CategoryContentsTopbar from '../Components/Home/Category/CategoryContentsTopbar';
import StickyBox from "react-sticky-box"
import { useRouter } from 'next/router';
import axios from 'axios'
import BigSpinner from '../Components/Common/BigSpinner';
import { useInView } from 'react-intersection-observer';
import DiscussionThread from './../Components/Home/Discussion/DiscussionThread';
import dynamic from 'next/dynamic'
import { useInfiniteQuery } from 'react-query';

const StartDiscussionModal = dynamic(() => import('./../Components/Common/StartDiscussionModal'), {
  ssr: false
})

export default function all_discussions() {

  const router = useRouter();

  const { ref, inView } = useInView();

  const [sortBy, setSortBy] = useState('Newest')
  // const discussions = useSWR(`/category/discussions/all`, swrFetcher)

  const {
    isLoading,
    isError,
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery(['discussions', sortBy, router], async (params) => {

    const passCursor = typeof params.pageParam == 'undefined' ? 0 : params.pageParam
    const res = await axios.get(`/discussions/all?cursor=${passCursor}&sortBy=${sortBy}`)
    return res.data

  },
    {
      getNextPageParam: (lastPage, allPages) => {

        return lastPage.length ? allPages.flat().length : false
      }
    }
  )

  useEffect(() => {

    if (hasNextPage) {
      console.log('loading more')
      fetchNextPage(data?.pages.flat().length)
    }

  }, [inView])


  return (
    <Layout title="All Discussions">

      <Container maxW='container.xl'>

        <PageTitle
          title="All Discussions"
        //   subtitle={category.data.description}
        // navigation={<NavigationIndata />}
        />


        <Flex gap={5} direction={{ base: 'column', lg: 'row' }}>

          <Show above='lg'>
            <Box maxW={{ base: '100vw', lg: 200 }}>
              <StickyBox offsetTop={110}>
                {/* Category left sidebar */}
                <CategoryLeftSidebar currentCategory={null} />
              </StickyBox>
            </Box>
          </Show>

          <Box flex='1' minH='calc(100vh - 300px)'>
            <VStack alignItems='flex-start'>

              {/* Topbar of the category page */}
              <CategoryContentsTopbar
                sortBy={sortBy}
                setSortBy={setSortBy}
              />

              {/* Contents Of Category */}
              {isLoading && <BigSpinner />}

              {/* {discussions.data && <CategoryContents discussions={discussions.data} />} */}

              <VStack gap={3} as='section' w='full' pt={3}>

                {(!isError && data?.pages?.flat().length) ? data?.pages?.flat()?.map((discussion, index) => {
                  return <DiscussionThread key={index} discussion={discussion} />
                }) :

                  !isLoading &&
                  <Center w='full' height='300px'>
                    <VStack>
                      <Text fontSize='22px'>No discussions found.</Text>
                      <StartDiscussionModal />
                    </VStack>
                  </Center>

                }
              </VStack>


              <Box w='full' pt={2}>

                <Box w='full'>
                  {isFetchingNextPage ? <Box w='full'>
                    <Skeleton height='15px' mb={2} />
                    <Skeleton height='15px' mb={2} />
                    <Skeleton height='15px' mb={2} />
                  </Box> : <></>}
                </Box>

              </Box>

            </VStack>

            {hasNextPage &&
              <Box ref={ref} h='10px'></Box>
            }

          </Box>



          {/* <Show above='md'>
            <Box w={200} minH='100vh' overflowWrap='hidden'>
              <StickyBox offsetTop={250}>

                {discussions.data?.length ? <CategoryRightSidebar /> : <></>}

              </StickyBox>
            </Box>
          </Show> */}

        </Flex>

      </Container>

    </Layout>
  )
}
