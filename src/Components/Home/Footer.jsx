import React from 'react'
import { Container, Box, HStack, Icon, Link, Stack, Text } from '@chakra-ui/react';
import { FaFacebookF } from 'react-icons/fa';
import { BsInstagram } from 'react-icons/bs';
import { AiOutlineLinkedin } from 'react-icons/ai';

export default function Footer() {
    return (
        <Box as='footer' py={3} bg='#dfc6b1'>
            <Container maxW='container.xl'>

                <Stack
                    alignItems={{ sm: '', lg: 'center' }}
                    direction={{ base: 'column', sm: 'column', md: 'column', lg: 'row' }}
                    justify={'space-between'}
                >

                    <HStack gap={2}>
                        <Link href='http://facebook.com/thespatialcollective'>
                            <Icon fontSize={30} as={FaFacebookF} />
                        </Link>
                        <Link href='http://facebook.com/thespatialcollective'>
                            <Icon fontSize={30} as={BsInstagram} />
                        </Link>
                        <Link href='http://facebook.com/thespatialcollective'>
                            <Icon fontSize={36} as={AiOutlineLinkedin} />
                        </Link>
                    </HStack>

                    <Text fontSize={12}>COPYRIGHT © 2020 SPATIAL COLLECTIVE PRIVATE LIMITED. </Text>



                    <HStack gap={2}>
                        <Link href='#'>
                            <Text>Terms & Conditions</Text>
                        </Link>

                        <Link href='#'>
                            <Text>Book Now</Text>
                        </Link>
                    </HStack>
                </Stack>
            </Container>
        </Box>
    )
}
