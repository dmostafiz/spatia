import React from 'react'
import { Avatar, Box, Flex, HStack, Icon, Text } from '@chakra-ui/react'
import { CgMailReply } from 'react-icons/cg'
import { AiOutlineEye } from 'react-icons/ai'
import { IoMdChatboxes } from 'react-icons/io'
import { RiHeart2Fill } from 'react-icons/ri'
import moment from 'moment'
import ReplyReaction from '../ReplyReaction'

export default function DiscussionReplyThread({ handleClickReply, reply }) {
    return (
        <Box w='full' px={8} py={4} bg='#f4edde'>
            <HStack alignItems='flex-start' gap={2}>
                <Box w={50}>
                    <Avatar src={reply?.author?.avatar} name={reply?.author?.name} />
                </Box>
                <Box w='full'>
                    <HStack fontSize='14px' gap={2} mb={2}>
                        <Text
                            fontWeight='bold'
                            fontFamily={`'Montserrat', sans-serif;`}>
                            {reply?.author?.name}
                        </Text>
                        <Text
                            color='#7a7f85'
                        >
                            {moment(reply.cereatedAt).calendar()}
                        </Text>
                    </HStack>

                    <Flex gap={1} mb={2}>
                        <Icon fontSize='18px' as={CgMailReply} />
                        <Text color='' fontSize='14px' fontWeight='semibold' fontFamily={`'Montserrat', sans-serif;`}  >
                            {reply?.parent ? reply?.parent?.author?.name : reply?.discussion?.author?.name}
                        </Text>
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
                        <Flex direction={{ base: 'column', md: 'row' }} justify='flex-end' gap={3}>


                            <HStack gap={4}>
                                {/* <Flex alignItems='center' gap={1}>
                                    <Icon fontSize={24} as={AiOutlineEye} />
                                    <Text>25</Text>
                                </Flex> */}

                                <ReplyReaction replyId={reply?.id} />

                                <Flex alignItems='center' gap={1}>
                                    <Text cursor='pointer' onClick={() => handleClickReply(reply?.id)}>Reply</Text>
                                </Flex>
                            </HStack>
                        </Flex>
                    </Box>
                </Box>
            </HStack>
        </Box>
    )
}
