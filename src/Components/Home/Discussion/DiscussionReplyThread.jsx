import React from 'react'
import { Avatar, Box, Flex, HStack, Icon, Link, Tag, TagLabel, Text, useToast, Wrap } from '@chakra-ui/react'
import { CgMailReply } from 'react-icons/cg'
import { AiFillStar, AiOutlineEye, AiOutlineStar } from 'react-icons/ai'
import { IoMdChatboxes } from 'react-icons/io'
import { RiHeart2Fill } from 'react-icons/ri'
import moment from 'moment'
import ReplyReaction from '../ReplyReaction'
import NextLink from 'next/link'
import { Star } from 'tabler-icons-react'
import axios from 'axios'
import authUser from '../../../Hooks/authUser'

export default function DiscussionReplyThread({ setBestAnswer, discussion, handleClickReply, reply }) {


    const user = authUser()
    const toast = useToast()

    const addBestAnswer = async (replyId) => {

        if (user.data.id != discussion.authorId) {
            return
        }

        const { data } = await axios.post('/store_best_answer', { replyId, discussionId: discussion.id })

        if (data.status == 'success') {

            setBestAnswer(reply.id)

            return toast({
                title: 'Success',
                description: 'Reply set as best answer!',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })

        }

        if (data.status == 'error') {
            return toast({
                title: 'Success',
                description: data.msg,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })

        }
    }

    return (
        <Box w='full' px={8} py={4} bg='#f4edde'>
            <HStack alignItems='flex-start' gap={2}>
                <Box w={50}>
                    <Avatar src={reply?.author?.avatar} name={reply?.author?.name} />
                </Box>
                <Box w='full'>
                    <HStack fontSize='14px' gap={2} mb={2}>
                        <NextLink href={`/user/${reply?.author?.id}`}>
                            <Link href={`/user/${reply?.author?.id}`}>
                                <Text
                                    fontWeight='bold'
                                    fontFamily={`'Montserrat', sans-serif;`}>
                                    {reply?.author?.name}
                                </Text>
                            </Link>
                        </NextLink>
                        <Text
                            color='#7a7f85'
                        >
                            {moment(reply.cereatedAt).calendar()}
                        </Text>
                    </HStack>

                    <Flex gap={1} mb={2}>
                        <Icon fontSize='18px' as={CgMailReply} />
                        <NextLink href={`/user/${reply?.parent ? reply?.parent?.author?.id : reply?.discussion?.author?.id}`}>
                            <Link href={`/user/${reply?.parent ? reply?.parent?.author?.id : reply?.discussion?.author?.id}`}>
                                <Text color='' fontSize='14px' fontWeight='semibold' fontFamily={`'Montserrat', sans-serif;`}  >
                                    {reply?.parent ? reply?.parent?.author?.name : reply?.discussion?.author?.name}
                                </Text>
                            </Link>
                        </NextLink>
                    </Flex>


                    <Box w='full'>
                        <Text
                            as='div'
                            fontSize='14px'
                            fontFamily={`'Montserrat', sans-serif;`}
                            mb={4}
                            dangerouslySetInnerHTML={{
                                __html: reply.content
                            }}
                        />

                        {reply.files.length > 0 && <Box pb={'2'} fontFamily={'sans-serif'}>
                            <>
                                <Text fontWeight={'bold'}>Related files</Text>
                                <Wrap>
                                    {reply.files.map((file, index) => {
                                        return <a target={'_blank'} href={file.url}>
                                            <Tag rounded='full' size={'md'} key={index} variant='outline' colorScheme='cyan'>
                                                <TagLabel>{file.name}</TagLabel>
                                            </Tag>
                                        </a>
                                    })}
                                </Wrap>
                            </>
                        </Box>}

                        <Flex direction={{ base: 'column', md: 'row' }} justify='flex-end' gap={3}>

                            <Flex alignItems='center' gap={4}>
                                {/* <Flex alignItems='center' gap={1}>
                                    <Icon fontSize={24} as={AiOutlineEye} />
                                    <Text>25</Text>
                                </Flex> */}

                                <ReplyReaction replyId={reply?.id} />

                                <Flex alignItems='center' gap={1}>
                                    <Text cursor='pointer' onClick={() => handleClickReply(reply?.id)}>Reply</Text>
                                </Flex>

                                <Box>

                                    {!reply.bestAnswer
                                        ? <Icon title='Set as the best answer' cursor='pointer' onClick={() => addBestAnswer(reply?.id)} fontSize={20} as={AiOutlineStar} />
                                        : <Icon title='Best Answer' fontSize={20} color='yellow.500' as={AiFillStar} />}
                                </Box>
                            </Flex>
                        </Flex>
                    </Box>
                </Box>
            </HStack>
        </Box>
    )
}
