import React from 'react'
import { Box, Flex, HStack, Icon, Link, Stack, Text } from '@chakra-ui/react'
import { BsTagFill, BsChatRightTextFill, BsStarFill } from 'react-icons/bs'
import { HiOutlineUserCircle } from 'react-icons/hi'
import NextLink from 'next/link'
import { useRouter } from 'next/router';

export default function CategoryContentsTopbar() {
    const router = useRouter()

    return (
        <Box fontWeight='bold' fontFamily='heading'>

            <Stack direction='row' gap={1} alignItems={{ sm: 'start', lg: 'center' }} >

                <NextLink href={`/all_discussions`}>
                    <Link href={`/all_discussions`}>
                        <HStack alignItems='flex-start' bg={router.pathname == "/all_discussions" ? '#ede7e0' : 'none'} p={router.pathname == "/all_discussions" ? 2 : 0}>
                            <Icon fontSize={26} as={BsChatRightTextFill} />
                            <Text fontWeight={{ base: 'normal', lg: '700' }}>All Discussions</Text>
                        </HStack>
                    </Link>
                </NextLink>

                <NextLink href='/private_discussion'>
                    <Link href='/private_discussion'>
                        <HStack alignItems='flex-start' bg={router.pathname == "/private_discussion" ? '#ede7e0' : 'none'} p={router.pathname == "/private_discussion" ? 2 : 0}>
                            <Icon fontSize={26} as={HiOutlineUserCircle} />
                            <Text>Private Discussion</Text>
                        </HStack>
                    </Link>
                </NextLink>


                <NextLink href='/following'>
                    <Link href='/following'>
                        <HStack alignItems='flex-start' bg={router.pathname == "/following" ? '#ede7e0' : 'none'} p={router.pathname == "/following" ? 2 : 0}>
                            <Icon fontSize={22} as={BsStarFill} />
                            <Text>Following</Text>
                        </HStack>
                    </Link>
                </NextLink>

                {/* <NextLink href='/tags'>
                    <Link href='/tags' alignItems='flex-start'>
                        <HStack alignItems='flex-start'>
                            <Icon fontSize={22} as={BsTagFill} />
                            <Text>Tags</Text>
                        </HStack>
                    </Link>
                </NextLink> */}

            </Stack>
        </Box>
    )
}
