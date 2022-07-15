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
import useSWRInfinite from 'swr/infinite'
import swrFetcher from '../../Hooks/swrFetcher';
import { data } from 'autoprefixer';


// const getKey = (pageIndex, previousPageData) => {
//   if (previousPageData && !previousPageData.length) return null // reached the end
//   return `/category/${router.query?.slug}?page=${pageIndex}&limit=10`  // SWR key
// }

export default function slug() {


  // const user = useClientAuth()

  const router = useRouter();

  // const [prevCat, setPrevCat] = useState()

  const category = useSWR(`/category/${router.query?.slug}`, swrFetcher)
  const discussions = useSWR(`/category/discussions/${router.query?.slug}`, swrFetcher)
  // const { data, size, setSize } = useSWRInfinite(getKey, swrFetcher)

  // console.log('Just ategory: ', data)
  // console.log('Discussions from category: ', discussions)


  return (
    <Layout title={category.data?.title}>

      <Container maxW='container.xl'>

        { category.data ? <PageTitle
          title={category.data.title}
          subtitle={category.data.description}
        // navigation={<NavigationIndata />}
        /> : <Box h={117}></Box>}


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
              {!discussions.data && <BigSpinner />}

              {discussions.data && <CategoryContents discussions={discussions.data} /> }

            </VStack>
          </Box>


          <Show above='md'>
            <Box w={200} minH='100vh' overflowWrap='hidden'>
              <StickyBox offsetTop={250}>

                {/* Right sidebar (Scroll navigator) */}
                {discussions.data?.length ? <CategoryRightSidebar /> : <></>}

              </StickyBox>
            </Box>
          </Show>

        </Flex>

      </Container>

    </Layout>
  )
}
