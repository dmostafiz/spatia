import React from 'react'
import { Avatar, Box, Flex, HStack, Icon, Link, Text } from '@chakra-ui/react'
import { CgMailReply } from 'react-icons/cg'
import { AiOutlineEye } from 'react-icons/ai'
import { IoMdChatboxes } from 'react-icons/io'
import { RiHeart2Fill } from 'react-icons/ri'
import moment from 'moment'
import ReactionsReact from '../ReactionsReact'
import NextLink from 'next/link'

export default function DiscussionBody({ handleClickReply, discussion }) {
    return (
        <Box mb={4} px={8} py={4} bg='#f4edde'>
            <HStack alignItems='flex-start' gap={2}>
                <Box w={50}>
                    <Avatar src='' name='Mahesh Babu' />
                </Box>
                <Box w='full'>
                    <HStack fontSize='14px' gap={2} mb={2}>
                        <NextLink href={`/user/${discussion?.author.id}`}>
                            <Link href={`/user/${discussion?.author.id}`}>
                                <Text
                                    fontWeight='bold'
                                    fontFamily={`'Montserrat', sans-serif;`}>
                                    {discussion?.author?.name}
                                </Text>
                            </Link>
                        </NextLink>
                        <Text
                            color='#7a7f85'
                        >
                            {moment(discussion.createdAt).calendar()}
                        </Text>
                    </HStack>

                    <Box w='full'>
                        <Text
                            as='div'
                            fontSize='14px'
                            fontFamily={`'Montserrat', sans-serif;`}
                            mb={4}
                            dangerouslySetInnerHTML={{
                                __html: discussion.content
                            }}
                        >
                            {/* {discussion.content} */}
                        </Text>

                        <Flex w='full' direction={{ base: 'column', md: 'row' }} justify='space-between' gap={3}>
                            <HStack maxW='350px' alignItems='flex-start'>
                                <Icon fontSize='18px' as={CgMailReply} />
                                <Text color='#2c53a8' fontSize='12px' fontFamily={`'Montserrat', sans-serif;`} >
                                    {discussion.replies.length ?
                                        <>
                                            {discussion.replies.map((reply, index) => {
                                                return <Text key={index} as='span'>
                                                    <NextLink href={`/user/${reply.author?.id}`}>
                                                        <Link href={`/user/${reply.author?.id}`}>
                                                            <Text as='span' fontWeight='bold'>{reply.author.name}</Text>
                                                        </Link>
                                                    </NextLink> {index == discussion.replies.length - 2 && 'and '} {index < discussion.replies.length - 2 && ', '}
                                                </Text>
                                            })}
                                        </>
                                        : <Text as='span'>No one </Text>}

                                    <Text as='span'>replied to this</Text>

                                </Text>

                            </HStack>

                            <Flex flex={1} justify='flex-end'>
                                <HStack gap={3}>
                                    <Flex alignItems='center' gap={1}>
                                        <Icon fontSize={24} as={AiOutlineEye} />
                                        <Text>{discussion.views ?? 0}</Text>
                                    </Flex>

                                    <ReactionsReact discussionId={discussion.id} />

                                    <Flex alignItems='center' gap={1}>
                                        <Icon fontSize={24} color='#3367b1' as={IoMdChatboxes} />
                                        <Text>{discussion.replyCount}</Text>
                                    </Flex>

                                    <Flex alignItems='center' gap={1}>
                                        <Text cursor='pointer' onClick={() => handleClickReply(null)}>Reply</Text>
                                    </Flex>
                                </HStack>
                            </Flex>
                        </Flex>
                    </Box>
                </Box>
            </HStack>
        </Box>
    )
}
