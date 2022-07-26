import { Box, Center, HStack, Skeleton, Text, VStack } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useInfiniteQuery } from 'react-query'
import BigSpinner from '../../../Components/Common/BigSpinner'
import CategoryContentsTopbar from '../../../Components/Home/Category/CategoryContentsTopbar'
import DiscussionThread from '../../../Components/Home/Discussion/DiscussionThread'
import UserLayout from '../../../Components/user/UserLayout'
import { useInView } from 'react-intersection-observer';

export default function posts() {

  const router = useRouter()

  const { ref, inView } = useInView();

  const [sortBy, setSortBy] = useState('Newest')

  const {
    isLoading,
    isError,
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery(['userDiscussions', sortBy, router], async (params) => {

    const passCursor = typeof params.pageParam == 'undefined' ? 0 : params.pageParam
    const res = await axios.get(`/user/posts/${router.query?.id}?cursor=${passCursor}&sortBy=${sortBy}`)
    return res.data

  },
    {
      getNextPageParam: (lastPage, allPages) => {

        return lastPage.length > 0 ? allPages.flat().length : false
      }
    }
  )

  useEffect(() => {

    console.log('User Discussions ### ', data)

  }, [data])

  useEffect(() => {

    if (hasNextPage) {
      console.log('loading more')
      fetchNextPage(data?.pages.flat().length)
    }

  }, [inView])


  return (
    <UserLayout>


      <VStack alignItems='flex-start'>

        {/* Topbar of the category page */}
        <Box pt={{ base: '30px', md: '0px' }}>
          <HStack>
            <Text>All posts</Text>
            <CategoryContentsTopbar
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </HStack>
        </Box>

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

    </UserLayout>
  )
}
