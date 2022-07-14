import React from 'react'
import { Box, Link, Stack } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function CategoryContentsTopbar() {
    return (
        <Box fontWeight='bold' fontFamily='heading'>

            <Stack direction='row' gap={1} alignItems={{sm: 'start', lg: 'center'}} >

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
