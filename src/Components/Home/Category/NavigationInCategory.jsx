import React from 'react'
import { Box, Flex, HStack, Icon, Link, Stack, Text } from '@chakra-ui/react'
import { BsTagFill, BsChatRightTextFill, BsStarFill } from 'react-icons/bs'
import { HiOutlineUserCircle } from 'react-icons/hi'
import NextLink from 'next/link'

export default function NavigationInCategory() {
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

                <NextLink href='/start_discussion'>
                    <Link href='/start_discussion'>
                        <Box px={3} py={1} bg='#eae0c8' maxW={200} textAlign='center'>
                            Recently Replied
                        </Box>
                    </Link>
                </NextLink>


                <NextLink href='/start_discussion'>
                    <Link href='/start_discussion'>
                        <Box px={3} py={1} bg='#eae0c8' maxW={200} textAlign='center'>
                            Following
                        </Box>
                    </Link>
                </NextLink>

            </Stack>
        </Box>
    )
}
