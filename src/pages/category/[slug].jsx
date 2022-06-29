import React, { useState } from 'react'
import PageTitle from '../../Components/Home/PageTitle';
import Layout from '../../Components/Home/Layout';
import { Container, Box, Flex, VStack, Show } from '@chakra-ui/react';
import CategoryLeftSidebar from '../../Components/Home/Category/CategoryLeftSidebar';
import CategoryRightSidebar from '../../Components/Home/Category/CategoryRightSidebar';
import CategoryContents from '../../Components/Home/Category/CategoryContents';
import CategoryContentsTopbar from '../../Components/Home/Category/CategoryContentsTopbar';
import StickyBox from "react-sticky-box"
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import demoItems from '../../Components/Home/Category/demoItems';
import ContentLoader from '../../Components/Home/ContentLoader';

export default function slug() {

  const router = useRouter();
  const [category, setCategory] = useState(null);

  useEffect(() => {

    if (router.query.slug) {

        const categoryItem = demoItems.find(item => item.slug == router.query.slug);
        // console.log('Discussion Item: ', discussionItem)
        setCategory(categoryItem);
    }

  }, [router]);

  return (
    <Layout title={category?.title}>

      <Container maxW='container.xl'>

        {category ? <>

          <PageTitle
            title={category?.title}
            subtitle={category?.description}
          // navigation={<NavigationInCategory />}
          />

          <Flex gap={5} direction={{ base: 'column', lg: 'row' }}>

            <Box maxW={{ base: '100vw', lg: 200 }}>
              <StickyBox offsetTop={110}>

                {/* Category left sidebar */}
                <CategoryLeftSidebar currentCategory={category} />

              </StickyBox>
            </Box>

            <Box flex='1' minH='calc(100vh - 300px)'>
              <VStack alignItems='flex-start'>

                {/* Topbar of the category page */}
                <CategoryContentsTopbar />

                {/* Contents Of Category */}
                <CategoryContents /> 

              </VStack>
            </Box>


            <Show above='md'>
              <Box w={200} minH='100vh' overflowWrap='hidden'>
                <StickyBox offsetTop={250}>

                  {/* Right sidebar (Scroll navigator) */}
                  {category && <CategoryRightSidebar />}

                </StickyBox>
              </Box>
            </Show>

          </Flex>

        </> : <ContentLoader />}

      </Container>

    </Layout>
  )
}
