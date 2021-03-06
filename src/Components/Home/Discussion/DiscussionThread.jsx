import React from 'react'
import { Box, Center, HStack, Text, VStack, Icon, Link, Flex, Tooltip } from '@chakra-ui/react';
import NextLink from 'next/link';
import { HiOutlineLightBulb, HiReply } from 'react-icons/hi'
import { AiOutlineEye } from 'react-icons/ai'
import { IoMdChatboxes, IoHeartCircle } from 'react-icons/io'
import { RiHeart2Fill } from 'react-icons/ri'
import { CgMailReply } from 'react-icons/cg'
import truncate from 'truncate-html';
import ReactionsReact from '../ReactionsReact';
import { FacebookSelector, FacebookCounter } from '@charkour/react-reactions';
import moment from 'moment';

// import ReactionsReact from '../ReactionsReact';


export default function DiscussionThread({ discussion }) {

    console.log('discussion subcategory ', discussion.subCategory)

    return (
        <>
            {discussion.id ? <Box as='div' w='full' p={2} bg='#f6e3d1' rounded='sm' shadow>
                <Box w='full' p={3} bg='#fffefd' rounded='sm'>

                    <Text
                        as='h1'
                        fontSize='22px'
                        fontWeight='black'
                        lineHeight={1}
                    >
                        {discussion.title}
                    </Text>

                    {discussion.subCategory && <Box as='button' bg='#f4edde' px={2} py={1}>
                        <HStack>
                            <Icon as={HiOutlineLightBulb} />
                            <Text fontSize={10} fontWeight='bold'>{discussion.subCategory.name}</Text>
                        </HStack>
                    </Box>}

                    {/* {discussion.tags?.length ? <HStack pt={2}>
                        {discussion.tags.map((tag, index) => {
                            return <Box key={index} as='button' bg='#f4edde' px={2} py={1}>
                                <HStack>
                                    <Icon as={HiOutlineLightBulb} />
                                    <Text fontSize={10} fontWeight='bold'>{tag.name}</Text>
                                </HStack>
                            </Box>
                        })}
                    </HStack> : <></>} */}


                    <HStack justify='space-between' pt={2} pb={3}>
                        <Text fontSize={12} fontFamily={`'Assistant', sans-serif`}>
                            By <NextLink href={`/user/${discussion?.author?.id}`}>
                                <Link href={`/user/${discussion?.author?.id}`} color='blue.400'>{discussion?.author?.name}</Link>
                            </NextLink>
                        </Text>

                        {discussion.replies.length ?
                            <Flex alignItems='end' gap={1}>
                                <Icon fontSize={24} as={CgMailReply} />
                                <Text fontSize={12} fontFamily={`'Assistant', sans-serif`}>
                                    <NextLink href={`/user/${discussion.replies[discussion.replies.length - 1].author.id}`}>
                                        <Link href={`/user/${discussion.replies[discussion.replies.length - 1].author.id}`} color='blue.400'>
                                            {discussion.replies[discussion.replies.length - 1].author.name}
                                        </Link>
                                    </NextLink> {moment(discussion.replies[discussion.replies.length - 1].createdAt).calendar()}
                                </Text>
                            </Flex>
                            : <Text fontSize={12} fontFamily={`'Assistant', sans-serif`}>No replies yet</Text>}

                    </HStack>

                    <Box w='full' p={3} bg='#f4edde' rounded='sm'>
                        <Text as='div' w='full' fontSize={14} fontFamily={`'Assistant', sans-serif`} fontWeight='semibold' dangerouslySetInnerHTML={{
                            __html: truncate(discussion.content, 400, {
                                keepWhitespaces: true,
                                stripTags: true
                            })
                        }}
                        />
                    </Box>

                    <Box pt={2}>
                        <HStack justify='space-between'>
                            <NextLink href={`/discussion/${discussion.id}`}>
                                <Link href={`/discussion/${discussion.id}`}>
                                    <Text
                                        fontSize={14}
                                        fontWeight='bold'
                                    >
                                        View More
                                    </Text>
                                </Link>
                            </NextLink>

                            <HStack gap={4}>

                                <Flex alignItems='center' gap={1}>
                                    <Icon fontSize={24} as={AiOutlineEye} />
                                    <Text>{discussion.views}</Text>
                                </Flex>

                                <ReactionsReact discussionId={discussion.id} />

                                <Flex alignItems='center' gap={1}>
                                    <Icon fontSize={20} as={IoMdChatboxes} />
                                    <Text>{discussion.replies?.length}</Text>
                                </Flex>

                            </HStack>
                        </HStack>

                    </Box>

                </Box>

            </Box> : <></>}

        </>
    )
}
