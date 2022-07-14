import React from 'react'
import { Box, Center, HStack, Text, VStack, Icon, Link, Flex } from '@chakra-ui/react';
import NextLink from 'next/link';
import { HiOutlineLightBulb, HiReply } from 'react-icons/hi'
import { AiOutlineEye } from 'react-icons/ai'
import { IoMdChatboxes, IoHeartCircle } from 'react-icons/io'
import { RiHeart2Fill } from 'react-icons/ri'
import { CgMailReply } from 'react-icons/cg'
import truncate from 'truncate-html';


export default function DiscussionThread({ discussion }) {
    return (
        <Box as='div' w='full' p={2} bg='#f6e3d1' rounded='sm' shadow>
            <Box p={3} bg='#fffefd' rounded='sm'>

                <Text
                    as='h1'
                    fontSize='22px'
                    fontWeight='black'
                    lineHeight={1}
                >
                    {discussion.title}
                </Text>

                <HStack pt={2}>
                    <Box as='button' bg='#f4edde' px={2} py={1}>
                        <HStack>
                            <Icon as={HiOutlineLightBulb} />
                            <Text fontSize={10} fontWeight='bold'>Productivity Tips</Text>
                        </HStack>
                    </Box>
                </HStack>

                <HStack justify='space-between' pt={2} pb={3}>
                    <Text fontSize={12} fontFamily={`'Assistant', sans-serif`}>
                        By <NextLink href='#'>
                            <Link href='#' color='blue.400'>{discussion?.author?.name}</Link>
                        </NextLink>
                    </Text>

                    <Flex alignItems='end' gap={1}>
                        <Icon fontSize={24} as={CgMailReply} />
                        <Text fontSize={12} fontFamily={`'Assistant', sans-serif`}>
                            <NextLink href='#'>
                                <Link href='#' color='blue.400'>echiam08</Link>
                            </NextLink> Replied 12 hours ago
                        </Text>
                    </Flex>
                </HStack>

                <Box p={3} bg='#f4edde' rounded='sm'>
                    <Text fontSize={14} fontFamily={`'Assistant', sans-serif`} fontWeight='semibold' dangerouslySetInnerHTML={{
                        __html: truncate(discussion.content, 400)
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
                                <Text>25</Text>
                            </Flex>

                            <Flex alignItems='center' gap={1}>
                                <Icon fontSize={24} color='#f55064' as={RiHeart2Fill} />
                                <Text>7</Text>
                            </Flex>

                            <Flex alignItems='center' gap={1}>
                                <Icon fontSize={20} as={IoMdChatboxes} />
                                <Text>3</Text>
                            </Flex>
                        </HStack>
                    </HStack>

                </Box>

            </Box>

        </Box>
    )
}
