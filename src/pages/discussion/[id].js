import { Avatar, Box, Container, Flex, HStack, Icon, Center, Show, Spacer, Button, Text, VStack, Link } from '@chakra-ui/react'
import React, { createRef, useEffect, useRef, useState } from 'react'
import Layout from '../../Components/Home/Layout'
// import DiscussionTags from '../../Components/Home/Discussion/DiscussionTags';
import DiscussionBody from '../../Components/Home/Discussion/DiscussionBody';
import DiscussionReplyThread from '../../Components/Home/Discussion/DiscussionReplyThread';
import StickyBox from 'react-sticky-box';
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
import BeatLoader from "react-spinners/BeatLoader";
import BigSpinner from '../../Components/Common/BigSpinner';
import useToken from '../../Hooks/useToken';
import authUser from '../../Hooks/authUser';
import Cookies from "js-cookie";
import LoginWindowButton from '../../Components/Common/LoginWindowButton';
import FollowUnfollow from '../../Components/profile/FollowUnfollow';
import FollowUnfollowDiscussion from '../../Components/profile/FollowUnfollowDiscussion';
import NextLink from 'next/link'

function Discussion({ discussion }) {

    const [wl, setWl] = useState(false)

    useEffect(() => {
        setWl(true)
    }, [])

    const user = authUser()
    const router = useRouter()
    const toast = useToast()
    const [reply, setReply] = useState('')
    const [replySubmited, setReplySubmitted] = useState(false)
    const { scrollIntoView, targetRef } = useScrollIntoView({ offset: 60 })
    const [parentId, setParentId] = useState(null)

    const [files, setReplyFiles] = useState([])

    const editorRef = useRef()

    const [mentioned, setMentioned] = useState([])

    const [finalMentioned, setFinalMentioned] = useState([])

    useEffect(() => {
        const mentionHtml = document.getElementsByClassName('mention');

        for (var i = 0; i < mentionHtml.length; i++) {
            // console.log('Current Mentions', mentionHtml[i].dataset)
            setMentioned([...mentioned, mentionHtml[i].dataset.id])
        }
        // console.log("Current mentioned docs ", mentionHtml)
    }, [reply])


    useEffect(() => {
        const myMentions = Cookies.get('mentions') ? JSON.parse(Cookies.get('mentions')) : []

        // console.log('Editor Mentions #####', myMentions)
        // console.log('Pre Mentions ##### ', mentioned)

        // Getting common Entries from two arrays.
        var commonMentions = myMentions.filter(x => mentioned.includes(x))

        // Merge two arrays into one
        const mergedArray = [...finalMentioned, ...commonMentions]

        let uniqueEntries = [];

        mergedArray.forEach((c) => {
            if (!uniqueEntries.includes(c)) {
                uniqueEntries.push(c);
            }
        });

        //Set Final mentioned user after filtering
        setFinalMentioned(uniqueEntries)

        Cookies.remove('mentions')

    }, [mentioned])

    useEffect(() => {
        console.log('Final Mentions ##### ', finalMentioned)
    }, [finalMentioned])

    const handleClickReply = (id) => {

        if (user.data?.id) {
            editorRef.current.focus()
        }

        // console.log('handleClickReply ', id)
        setParentId(id)
        scrollIntoView({ alignment: 'center' })

    }



    useEffect(() => {
        setReplySubmitted(false)
    }, [replySubmited])

    useEffect(() => {
        if (discussion != null) {
            axios.post(`/discussion/views/${router.query?.id}`)
        }
    }, [])

    const onSubmitReply = async () => {

        if (reply.replace(/<[^>]+>/g, '').replace(/\s+/g, '') == '' || reply == '<p><br></p>') {

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
            parentId: parentId,
            mentions: finalMentioned,
            files
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


    const [bestAnswer, setBestAnswer] = useState(null)


    const {
        isLoading,
        isError,
        data,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage
    } = useInfiniteQuery(['replies', replySubmited, bestAnswer, router], async (params) => {

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

    if (discussion == null) {
        return { notFound: true }
    }

    return (
        <Layout title={discussion.title} error={discussion == null && 404}>

            <Container maxW='container.xl'>

                <Flex gap={3} direction={{ base: 'column', lg: 'row' }}>

                    <Show above='lg'>
                        <Box maxW={{ base: '100vw', lg: 200 }}>
                            <ReactStickyBox offsetTop={110}>

                                {/* Category left sidebar */}
                                <CategoryLeftSidebar currentCategory={discussion.category} />

                            </ReactStickyBox>
                        </Box>
                    </Show>


                    <Box flex='1' minH='calc(100vh - 300px)'>
                        {/* <Box pb={5}>
                            <CategoryContentsTopbar />
                        </Box> */}

                        {/* Discussion Head / Title */}
                        <Box as='div' w='full' p={3} mb={4} bg='#f6e3d1' rounded='sm' shadow>
                            <Box p={4} bg='#fffefd' rounded='sm'>



                                {/* Tags */}
                                <HStack pb={4} fontFamily='heading'>

                                    {discussion?.subCategory &&
                                        <NextLink href={`/subcategory/${discussion.subCategory.id}`}>
                                            <Link href={`/subcategory/${discussion.subCategory.id}`}>
                                                <Box as='button' bg='#f4edde' px={2} py={1}>
                                                    <HStack>
                                                        <Icon as={HiOutlineLightBulb} />
                                                        <Text fontSize={10} fontWeight='bold'>{discussion?.subCategory?.name}</Text>
                                                    </HStack>
                                                </Box>
                                            </Link>
                                        </NextLink>
                                    }

                                    {discussion?.tags?.length ?

                                        discussion.tags.map((tag, index) => {
                                            return <NextLink key={index} href={`/tag/${tag.name}`}>
                                                <Link href={`/tag/${tag.name}`}>
                                                    <Box as='button' bg='#f4edde' px={2} py={1}>
                                                        <HStack>
                                                            <Icon as={HiOutlineLightBulb} />
                                                            <Text fontSize={10} fontWeight='bold'>{tag.name}</Text>
                                                        </HStack>
                                                    </Box>
                                                </Link>
                                            </NextLink>
                                        })

                                        : <></>}
                                </HStack>

                                {/* Title */}
                                <Text as='h1' fontSize={{ base: '20px', sm: '24px', md: '50px' }} fontWeight='bold' lineHeight='1' color='#000000'>
                                    {discussion?.title}
                                </Text>

                            </Box>
                        </Box> 

                        {/* Discussion Body */}
                        {discussion && <DiscussionBody handleClickReply={handleClickReply} discussion={discussion} />}

                        {/* Discussion Replies */}
                        {(!isError && data?.pages?.flat().length) ?
                            <>
                                <Box pt={5} pb={3}>
                                    <Text fontSize='20px' fontFamily='sans-serif'>Replies</Text>
                                </Box>

                                <VStack>

                                    {data?.pages?.flat()?.map((reply, index) => {
                                        return <DiscussionReplyThread setBestAnswer={setBestAnswer} discussion={discussion} handleClickReply={handleClickReply} key={index} reply={reply} />
                                    })}
                                </VStack>

                                {hasNextPage && <Box py={2}>
                                    <Button
                                        size='xs'
                                        onClick={fetchNextPage}
                                        isLoading={isFetchingNextPage}
                                        colorScheme='yellow'
                                        variant='outline'
                                        rounded='full'
                                        fontSize='14px'
                                        fontWeight='thin'
                                        spinner={<BeatLoader size={8} color='black' />}
                                    >Load more</Button>
                                </Box>}

                            </>
                            : !isLoading ? <Box py={5}>
                                <Text>No replies found</Text>
                            </Box> : <Center w='full' height={20}>
                                <BigSpinner />
                            </Center>}

                        {user.data?.id
                            ? <Box w='full' ref={targetRef}>
                                <Spacer />
                                {wl ? <DiscussionReplyForm
                                    setReplyFiles={setReplyFiles}
                                    key={replySubmited}
                                    ref={editorRef}
                                    onSubmitReply={onSubmitReply}
                                    reply={reply}
                                    setReply={setReply}
                                    data={{ name: 'Card Reply' }}
                                /> : <></>}

                            </Box>
                            : <Box ref={targetRef} pt={5}>

                                <Text fontSize='22px'>Please login to reply</Text>

                            </Box>
                        }

                    </Box>

                    <Show above='md'>
                        <Box w={200} minH='100vh' overflowWrap='hidden'>
                            <StickyBox offsetTop={110}>

                                {/* <DiscussionsRightSidebar /> */}
                                {user.data?.id
                                    ? <Box>
                                        {/* <Button
                                            // onClick={() => handleClickReply(null)}
                                            bg='#f4edde'
                                            rounded='full'
                                            shadow='sm'
                                        >
                                            Follow Respbery
                                        </Button> */}



                                        <Button
                                            onClick={() => handleClickReply(null)}
                                            bg='#f4edde'
                                            rounded='full'
                                            shadow='sm'
                                        >
                                            Reply this discussion
                                        </Button>

                                        <Spacer h={2} />

                                        <FollowUnfollowDiscussion disc={discussion} />

                                    </Box>
                                    : <LoginWindowButton
                                        bg='#f4edde'
                                        rounded='full'
                                        shadow='sm'
                                        innerText='Login to reply'
                                    />
                                }


                            </StickyBox>
                        </Box>
                    </Show>

                </Flex>

            </Container>
        </Layout>
    )

}





export async function getServerSideProps(context) {

    let data = null

    try {

        axios.defaults.baseURL = process.env.ENVIRONMENT == 'development' ? 'http://localhost:3000/api' : 'https://spacom.herokuapp.com/api'
        // axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.req.cookies?.token;

        const res = await axios.get(`/discussion/${context.query.id}`, {
            headers: {
                Authorization: 'Bearer ' + context.req.cookies?._token
            }
        });

        if (res.data.status == 'error') {
            return { notFound: true }
        }

        data = res.data

    } catch (error) {

        console.log('Single discussion error ################', error.message)
    }


    return {
        props: { discussion: data || null } // will be passed to the page component as props
    }

}

export default Discussion