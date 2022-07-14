import React from 'react'
import { Avatar, Box, Flex, HStack, Icon, Input, Text } from '@chakra-ui/react'
import { CgMailReply } from 'react-icons/cg'
import { AiOutlineEye } from 'react-icons/ai'
import { IoMdChatboxes } from 'react-icons/io'
import { RiHeart2Fill } from 'react-icons/ri'

export default function DiscussionReplyForm({ data }) {
    return (
        <Box w='full' px={8} py={4} bg='#f4edde'>
            <HStack alignItems='flex-start' gap={2}>
                <Box w={50}>
                    <Avatar src='' name={data.name} />
                </Box>
                <Box w='full'>

                    <Input as='textarea' border='none' placeholder='Write your reply...' _focus={{border: '0px solid', ring: '0px'}} />

                </Box>
            </HStack>
        </Box>
    )
}

