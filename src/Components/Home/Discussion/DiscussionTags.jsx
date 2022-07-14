import React from 'react'
import NextLink from 'next/link';
import { Box, Link, Stack } from '@chakra-ui/react'


export default function DiscussionTags() {
    return (
        <Stack direction='row' gap={1} fontSize='12px' alignItems={{ sm: 'start', lg: 'center' }} >

            <NextLink href='/start_discussion'>
                <Link href='/start_discussion'>
                    <Box px={3} py={1} bg='#eae0c8' maxW={200} textAlign='center'>
                        Productivity Tips
                    </Box>
                </Link>
            </NextLink>


            <NextLink href='/start_discussion'>
                <Link href='/start_discussion'>
                    <Box px={3} py={1} bg='#eae0c8' maxW={200} textAlign='center'>
                        Workplace
                    </Box>
                </Link>
            </NextLink>

        </Stack>
    )
}
