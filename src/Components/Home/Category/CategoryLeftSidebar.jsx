import React from 'react'
import { Box, Link, Stack } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function CategoryLeftSidebar() {
    return (
        <Box w={230} minH='calc(100vh - 300px)'>

            <Stack direction={{ base: 'column', sm: 'column', md: 'column', lg: 'row' }} gap={{ sm: 2, lg: 5 }} alignItems={{ sm: 'start', lg: 'center' }} >

                <NextLink href='/start_discussion'>
                    <Link href='/start_discussion'>
                        <Box px={3} py={1} bg='#e6caaf' maxW={200} textAlign='center'>
                            Start Discussion
                        </Box>
                    </Link>
                </NextLink>

            </Stack>
        </Box>
    )
}
