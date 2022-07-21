import { HStack, Icon, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import { BsChatRightDots, BsChatText } from 'react-icons/bs'
import { RiChatPrivateLine } from 'react-icons/ri'
import { GoMention } from 'react-icons/go'
import { BiBlock } from 'react-icons/bi'
import { FaCog } from 'react-icons/fa'
import { AiOutlineUser } from 'react-icons/ai'


export default function LeftSidebar() {
    return (
        <SimpleGrid columns={{ base: 2, sm: 2, md: 5, lg: 1 }} gap={{ base: 3, lg: 3 }} >

            <HStack alignItems='flex-start'>
                <Icon fontSize={{ base: 22, lg: 24 }} as={BsChatRightDots} />
                <Text fontWeight={{ base: 'normal'}}>Posts 0</Text>
            </HStack>

            <HStack alignItems='flex-start'>
                <Icon fontSize={{ base: 22, lg: 24 }} as={BsChatText} />
                <Text fontWeight={{ base: 'normal'}}>Discussions 0</Text>
            </HStack>

            <HStack alignItems='flex-start'>
                <Icon fontSize={{ base: 22, lg: 24 }} as={RiChatPrivateLine} />
                <Text fontWeight={{ base: 'normal'}}>Private Discussions 0</Text>
            </HStack>

            <HStack alignItems='flex-start'>
                <Icon fontSize={{ base: 22, lg: 24 }} as={GoMention} />
                <Text fontWeight={{ base: 'normal'}}>Mentions</Text>
            </HStack>

            <HStack alignItems='flex-start'>
                <Icon fontSize={{ base: 22, lg: 24 }} as={BiBlock} />
                <Text fontWeight={{ base: 'normal'}}>Ignored Users</Text>
            </HStack>

            <HStack alignItems='flex-start'>
                <Icon fontSize={{ base: 22, lg: 24 }} as={FaCog} />
                <Text fontWeight={{ base: 'normal'}}>Settings</Text>
            </HStack>

            <HStack alignItems='flex-start'>
                <Icon fontSize={{ base: 22, lg: 24 }} as={AiOutlineUser} />
                <Text fontWeight={{ base: 'normal'}}>My booking profile</Text>
            </HStack>
        </SimpleGrid>
    )
}
