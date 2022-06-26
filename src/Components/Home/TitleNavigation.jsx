import { Box, Flex, HStack, Icon, Link, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { BsTagFill, BsChatRightTextFill, BsStarFill } from 'react-icons/bs'
import { HiOutlineUserCircle } from 'react-icons/hi'
import NextLink from 'next/link'

export default function TitleNavigation() {
    return (
        <Box fontWeight='bold' fontFamily='heading'>

            <Stack direction={{ base: 'column', sm: 'column', md: 'column', lg: 'row' }} gap={{sm: 2, lg: 5}} alignItems={{sm: 'start', lg: 'center'}} >

                <NextLink href='/start_discussion'>
                    <Link href='/start_discussion'>
                        <Box px={3} py={1} bg='#e6caaf' maxW={200} textAlign='center'>
                            Start Discussion
                        </Box>
                    </Link>
                </NextLink>

                <NextLink href='/all_discussions'>
                    <Link href='/all_discussions'>
                        <HStack alignItems='flex-start'>
                            <Icon fontSize={22} as={BsChatRightTextFill} />
                            <Text>All Discussions</Text>
                        </HStack>
                    </Link>
                </NextLink>


                <NextLink href='/private_discussion'>
                    <Link href='/private_discussion'>
                        <HStack alignItems='center'>
                            <Icon fontSize={26} as={HiOutlineUserCircle} />
                            <Text>Private Discussion</Text>
                        </HStack>
                    </Link>
                </NextLink>

                <NextLink href='/following'>
                    <Link href='/following'>
                        <HStack alignItems='flex-start'>
                            <Icon fontSize={22} as={BsStarFill} />
                            <Text>Following</Text>
                        </HStack>
                    </Link>
                </NextLink>

                <NextLink href='/tags'>
                    <Link href='/tags' alignItems='flex-start'>
                        <HStack alignItems='flex-start'>
                            <Icon fontSize={22} as={BsTagFill} />
                            <Text>Tags</Text>
                        </HStack>
                    </Link>
                </NextLink>
            </Stack>
        </Box>
    )
}
