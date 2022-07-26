import { HStack, Icon, Link, SimpleGrid, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { BsChatRightDots, BsChatText } from 'react-icons/bs'
import { RiChatPrivateLine } from 'react-icons/ri'
import { GoMention } from 'react-icons/go'
import { BiBlock } from 'react-icons/bi'
import { FaCog } from 'react-icons/fa'
import { AiOutlineUser } from 'react-icons/ai'
import NextLink from 'next/link'
import { useRouter } from 'next/router'


export default function LeftSidebar({ user }) {
    const router = useRouter()

    useEffect(() => {
        console.log('Sidebar Router   ', router)
    }, [router])

    return (
        <SimpleGrid columns={{ base: 2, sm: 2, md: 5, lg: 1 }} gap={{ base: 3, lg: 3 }} >

            <NextLink href={`/user/${user.id}/posts`}>
                <Link href={`/user/${user.id}/posts`} color='black'>
                    <HStack alignItems='flex-start' bg={router.pathname == `/user/[id]/posts` ? '#ede7e0' : 'none'} p={router.pathname == `/user/[id]/posts` ? 2 : 0}>
                        <Icon fontSize={{ base: 22, lg: 24 }} as={BsChatRightDots} />
                        <Text fontWeight={{ base: 'normal' }}>Posts  ({user.posts?.length})</Text>
                    </HStack>
                </Link>
            </NextLink>

            <NextLink href={`/user/${user.id}/discussions`}>
                <Link href={`/user/${user.id}/discussions`} color='black'>
                    <HStack alignItems='flex-start' bg={router.pathname == `/user/[id]/discussions` ? '#ede7e0' : 'none'} p={router.pathname == `/user/[id]/discussions` ? 2 : 0}>
                        <Icon fontSize={{ base: 22, lg: 24 }} as={BsChatText} />
                        <Text fontWeight={{ base: 'normal' }}>Discussions ({user.discussions?.length})</Text>
                    </HStack>
                </Link>
            </NextLink>
            {/* <HStack alignItems='flex-start'>
                <Icon fontSize={{ base: 22, lg: 24 }} as={RiChatPrivateLine} />
                <Text fontWeight={{ base: 'normal'}}>Private Discussions 0</Text>
            </HStack> */}

            <NextLink href={`/user/${user.id}/mentions`}>
                <Link href={`/user/${user.id}/mentions`} color='black'>
                    <HStack alignItems='flex-start' bg={router.pathname == `/user/[id]/mentions` ? '#ede7e0' : 'none'} p={router.pathname == `/user/[id]/mentions` ? 2 : 0}>
                        <Icon fontSize={{ base: 22, lg: 24 }} as={GoMention} />
                        <Text fontWeight={{ base: 'normal' }}>Mentions</Text>
                    </HStack>
                </Link>
            </NextLink>
            {/* <HStack alignItems='flex-start'>
                <Icon fontSize={{ base: 22, lg: 24 }} as={BiBlock} />
                <Text fontWeight={{ base: 'normal'}}>Ignored Users</Text>
            </HStack> */}

            {/* <HStack alignItems='flex-start'>
                <Icon fontSize={{ base: 22, lg: 24 }} as={FaCog} />
                <Text fontWeight={{ base: 'normal'}}>Settings</Text>
            </HStack> */}

            {/* <HStack alignItems='flex-start'>
                <Icon fontSize={{ base: 22, lg: 24 }} as={AiOutlineUser} />
                <Text fontWeight={{ base: 'normal'}}>My booking profile</Text>
            </HStack> */}
        </SimpleGrid>
    )
}
