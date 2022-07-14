import React from 'react'
import { Avatar, Box, Flex, HStack, Icon, Text } from '@chakra-ui/react'
import { CgMailReply } from 'react-icons/cg'
import { AiOutlineEye } from 'react-icons/ai'
import { IoMdChatboxes } from 'react-icons/io'
import { RiHeart2Fill } from 'react-icons/ri'

export default function DiscussionBody({ discussion }) {
    return (
        <Box mb={4} px={8} py={4} bg='#f4edde'>
            <HStack alignItems='flex-start' gap={2}>
                <Box w={50}>
                    <Avatar src='' name='Mahesh Babu' />
                </Box>
                <Box>
                    <HStack fontSize='14px' gap={2} mb={2}>
                        <Text
                            fontWeight='bold'
                            fontFamily={`'Montserrat', sans-serif;`}>
                            echiam08
                        </Text>
                        <Text
                            color='#7a7f85'
                        >
                            4 hours ago
                        </Text>
                    </HStack>

                    <Box>
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

                        <Flex direction={{ base: 'column', md: 'row' }} justify='space-between' gap={3}>
                            <HStack>
                                <Icon fontSize='18px' as={CgMailReply} />
                                <Text color='#2c53a8' fontSize='12px' fontFamily={`'Montserrat', sans-serif;`}  >
                                    mrpootis, peterpan098 and mage9876 replied to this
                                </Text>
                            </HStack>

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
                                    <Text>Reply</Text>
                                </Flex>
                            </HStack>
                        </Flex>
                    </Box>
                </Box>
            </HStack>
        </Box>
    )
}
