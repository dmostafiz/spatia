import React, { useEffect } from 'react'
import PageTitle from '../../Components/Home/PageTitle';
import Layout from '../../Components/Home/Layout';
import { Container, Box, Flex, VStack, Stack, Skeleton, Text, Center } from '@chakra-ui/react';
import CategoryLeftSidebar from '../../Components/Home/Category/CategoryLeftSidebar';
import CategoryContentsTopbar from '../../Components/Home/Category/CategoryContentsTopbar';
import StickyBox from "react-sticky-box"
import { useRouter } from 'next/router';
import axios from 'axios'
import BigSpinner from './../../Components/Common/BigSpinner';
import swrFetcher from '../../Hooks/swrFetcher';
import { useInfiniteQuery, useQuery } from 'react-query'
import { useInView } from 'react-intersection-observer';
import dynamic from 'next/dynamic'
import DiscussionThread from '../../Components/Home/Discussion/DiscussionThread';
import useSWR from 'swr';

const StartDiscussionModal = dynamic(() => import('../../Components/Common/StartDiscussionModal'), {
  ssr: false
})

export default function slug() {

  const router = useRouter();

  const { ref, inView } = useInView();

  const category = useSWR(`/category/${router.query?.slug}`, swrFetcher)

  const {
    isLoading,
    isError,
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery(['discussions', router], async (params) => {

    const passCursor = typeof params.pageParam == 'undefined' ? 0 : params.pageParam
    const res = await axios.get(`/category/discussions/${router.query?.slug}?cursor=${passCursor}`)
    return res.data

  },
    {
      getNextPageParam: (lastPage, allPages) => {

        return lastPage.length > 0 ? allPages.flat().length : false
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
    <Layout title={category.data?.title}>

      <Container maxW='container.xl'>

        {category.data ? <PageTitle
          title={category.data.title}
          subtitle={category.data.description}
        // navigation={<NavigationIndata />}
        /> : <Stack pb={5}>
          <Skeleton height='50px' maxW='500px' />
          <Skeleton height='20px' />
          <Skeleton height='20px' maxW='230px' />

        </Stack>}

        <Flex gap={5} direction={{ base: 'column', lg: 'row' }}>

          <Box maxW={{ base: '100vw', lg: 200 }}>
            <StickyBox offsetTop={110}>

              {/* Category left sidebar */}
              <CategoryLeftSidebar currentCategory={category.data} />

            </StickyBox>
          </Box>

          <Box flex='1' minH='calc(100vh - 300px)'>
            <VStack alignItems='flex-start'>

              {/* Topbar of the category page */}
              <CategoryContentsTopbar />

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
                      <Text fontSize='22px'>No discussions found in this category.</Text>
                      <StartDiscussionModal />
                    </VStack>
                  </Center>

                }
              </VStack>


              <Box w='full'>

                {hasNextPage &&
                  <div ref={ref}></div>
                }

                <Box w='full'>
                  {isFetchingNextPage ? <Stack pb={5}>
                    <Skeleton height='100px'/>
                    <Skeleton height='100px'/>
                  </Stack> : <></>}
                </Box>

              </Box>
            </VStack>
          </Box>


        </Flex>

      </Container>

    </Layout>
  )
}
