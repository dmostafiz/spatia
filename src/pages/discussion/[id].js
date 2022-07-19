import { Avatar, Box, Container, Flex, HStack, Icon, Link, Show, Spacer, Stack, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Home/Layout'
// import DiscussionTags from '../../Components/Home/Discussion/DiscussionTags';
import DiscussionBody from '../../Components/Home/Discussion/DiscussionBody';
import DiscussionReplyThread from '../../Components/Home/Discussion/DiscussionReplyThread';
// import StickyBox from 'react-sticky-box';
// import DiscussionsRightSidebar from '../../Components/Home/Discussion/DiscussionsRightSidebar';
import DiscussionReplyForm from '../../Components/Home/Discussion/DiscussionReplyForm';
import axios from 'axios'
import { HiOutlineLightBulb } from 'react-icons/hi';
import CategoryLeftSidebar from './../../Components/Home/Category/CategoryLeftSidebar';
import ReactStickyBox from 'react-sticky-box';
import CategoryContentsTopbar from './../../Components/Home/Category/CategoryContentsTopbar';
import { useScrollIntoView } from '@mantine/hooks';
import { useToast } from '@chakra-ui/react'
import { useInfiniteQuery } from 'react-query';
import { useRouter } from 'next/router';


function Discussion({ discussion }) {

    const router = useRouter()
    const toast = useToast()
    const [reply, setReply] = useState('')
    const [replySubmited, setReplySubmitted] = useState(false)
    const { scrollIntoView, targetRef } = useScrollIntoView({ offset: 60 })
    const [parentId, setParentId] = useState(null)
    
    const handleClickReply = (id) => {
        console.log('handleClickReply ', id)
        setParentId(id)
        scrollIntoView({ alignment: 'center' })
    }


    useEffect(() => {
        setReplySubmitted(false)
    }, [replySubmited])

    const onSubmitReply = async () => {
    
        if (reply == '' || reply == '<p><br></p>') {

            return toast({
                title: 'Error',
                description: 'Please write a reply!',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }

        const data = {
            reply,
            discussionId: discussion.id,
            parentId: parentId
        }

        const res = await axios.post('/reply/store', data)

        if (res.data.status == 'success') {

            setReply('')
            setReplySubmitted(true)

            return toast({
                title: 'Success',
                description: 'Reply submitted successfully!',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }

    }


    const {
        isLoading,
        isError,
        data,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage
    } = useInfiniteQuery(['replies', replySubmited], async (params) => {

        const passCursor = typeof params.pageParam == 'undefined' ? 0 : params.pageParam
        const res = await axios.get(`/replies/${router.query?.id}?cursor=${passCursor}`)
        return res.data

    },
        {
            getNextPageParam: (lastPage, allPages) => {

                return lastPage.length > 0 ? allPages.flat().length : false
            }
        }
    )



    console.log('Response Discussions: ', data)

    return (
        <Layout>
            <Container maxW='container.xl'>

                <Flex gap={3} direction={{ base: 'column', lg: 'row' }}>

                    <Box maxW={{ base: '100vw', lg: 200 }}>
                        <ReactStickyBox offsetTop={110}>

                            {/* Category left sidebar */}
                            <CategoryLeftSidebar currentCategory={null} />

                        </ReactStickyBox>
                    </Box>


                    <Box flex='1' minH='calc(100vh - 300px)'>
                        <Box pb={5}>
                            <CategoryContentsTopbar />
                        </Box>

                        {/* Discussion Head / Title */}
                        <Box as='div' w='full' p={3} mb={4} bg='#f6e3d1' rounded='sm' shadow>
                            <Box p={4} bg='#fffefd' rounded='sm'>

                                {/* Tags */}
                                {discussion.tags.length ? <HStack pb={4} fontFamily='heading'>
                                    {discussion.tags.map((tag, index) => {
                                        return <Box key={index} as='button' bg='#f4edde' px={2} py={1}>
                                            <HStack>
                                                <Icon as={HiOutlineLightBulb} />
                                                <Text fontSize={10} fontWeight='bold'>{tag.name}</Text>
                                            </HStack>
                                        </Box>
                                    })}
                                </HStack> : <></>}

                                {/* Title */}
                                <Text as='h1' fontSize={{ base: '20px', sm: '24px', md: '50px' }} fontWeight='bold' lineHeight='1' color='#000000'>
                                    {discussion.title}
                                </Text>

                            </Box>
                        </Box>

                        {/* Discussion Body */}
                        <DiscussionBody handleClickReply={handleClickReply} discussion={discussion} />


                        {/* Discussion Replies */}
                        <VStack>

                            {(!isError && data?.pages?.flat().length) ? data?.pages?.flat()?.map((reply, index) => {
                                return <DiscussionReplyThread handleClickReply={handleClickReply} key={index} reply={reply} />
                            }) :
                                <></>
                            }

                            <Spacer />
                            <Spacer />

                            <Box w='full' ref={targetRef}>
                                <DiscussionReplyForm key={replySubmited} onSubmitReply={onSubmitReply} reply={reply} setReply={setReply} data={{ name: 'Card Reply' }} />
                            </Box>

                        </VStack>
                    </Box>

                    {/* <Show above='md'>
                        <Box w={200} minH='100vh' overflowWrap='hidden'>
                            <StickyBox offsetTop={250}>

                                <DiscussionsRightSidebar />

                            </StickyBox>
                        </Box>
                    </Show> */}

                </Flex>

            </Container>
        </Layout>
    )
}

Discussion.getInitialProps = async (context) => {

    const res = await axios.get(`/discussion/${context.query.id}`);

    // console.log('###########################################', res.data)

    return {
        discussion: res?.data, // will be passed to the page component as props
    }

}

export default Discussion