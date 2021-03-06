import React from 'react'
// import { FacebookSelector } from 'react-reactions';
import { FacebookSelector, FacebookCounter } from '@charkour/react-reactions';
import { Box, Button, Flex, Icon, Text } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react'
import { useQuery } from 'react-query'
import axios from 'axios'
import useSWR from 'swr'
import swrFetcher from '../../Hooks/swrFetcher';
import {BiLike} from 'react-icons/bi'
import authUser from '../../Hooks/authUser';

export default function ReplyReaction({ replyId }) {

    const user = authUser()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const images = [
        { emoji: 'like', by: 'you' },
        { emoji: 'like', by: 'Mostafiz' },
        { emoji: 'love', by: 'Ullash' },
        { emoji: 'haha', by: 'Limon' },
    ];

    const reactions = useQuery([replyId, isOpen], async () => {

        const res = await axios.get(`/reply/reaction/get/${replyId}`)
        return res.data
    })
    // const reactions = useSWR(`/reaction/get/${discussionId}`, swrFetcher)

    const handleSelect = async (reaction) => {
        console.log('Selected reaction: ', reaction)

        const data = {
            replyId,
            reaction
        }

        const res = await axios.post('/reply/reaction/store', data)

        if(res.data.status == 'success'){

            onClose()

        }else {

        }

    }

    return (
        <Box position='relative' onMouseLeave={onClose}>

            <Box as='div' position='relative' onMouseEnter={onOpen}>

                <Box hidden={!isOpen} as='div' position='absolute' height='50px' bottom={-3} zIndex={9999} right={-16} rounded='3xl' shadow='xl'>
                    <FacebookSelector onSelect={handleSelect} />
                </Box>

                {(reactions.data && reactions.data.reactions.length) 
                ?  <FacebookCounter user={user.data?.name} counters={reactions.data.reactions} showReactsOnly={true} />
                : 
                <Flex alignItems='center' gap={1}>
                    <Icon fontSize='19px' as={BiLike}/>
                    <Text>Like</Text>

                </Flex>
                }

            </Box>
        </Box>

    )
}
