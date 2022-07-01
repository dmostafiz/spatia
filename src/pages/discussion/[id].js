import { Avatar, Box, Container, Flex, HStack, Icon, Link, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import Layout from '../../Components/Home/Layout'
import NextLink from 'next/link';
import DiscussionTags from '../../Components/Home/Discussion/DiscussionTags';
import DiscussionBody from '../../Components/Home/Discussion/DiscussionBody';
import DiscussionReplyThread from '../../Components/Home/Discussion/DiscussionReplyThread';


export default function Discssion() {
    return (
        <Layout>
            <Container maxW='container.xl'>

                <Flex gap={3} direction={{ base: 'column', lg: 'row' }}>

                    <Box flex='1' minH='calc(100vh - 300px)'>

                        {/* Discussion Head / Title */}
                        <Box as='div' w='full' p={3} mb={4} bg='#f6e3d1' rounded='sm' shadow>
                            <Box p={4} bg='#fffefd' rounded='sm'>

                                {/* Tags */}
                                <Box pb={4} fontFamily='heading'>
                                    <DiscussionTags />
                                </Box>

                                {/* Title */}
                                <Text fontSize={{base:'20px', sm: '24px', md: '50px'}} fontWeight='bold' lineHeight='1' color='#000000'>
                                    Here's 5 productivity tips to boost your
                                    mood while working from home.
                                </Text>

                            </Box>
                        </Box>

                        {/* Discussion Body */}
                        <DiscussionBody />

                        {/* Discussion Replies */}
                        <VStack>

                          <DiscussionReplyThread data={{ name: 'Ali Ahamed'}} />
                          <DiscussionReplyThread data={{ name: 'Robiul Sardar'}} />
                          <DiscussionReplyThread data={{ name: 'Habib Molla'}} />
                          <DiscussionReplyThread data={{ name: 'Helal Haoladar'}} />
                          <DiscussionReplyThread data={{ name: 'Mostafiz Rahaman'}} />
                          <DiscussionReplyThread data={{ name: 'Mofiz Mia'}} />
                          <DiscussionReplyThread data={{ name: 'Rai Saaaaaa'}} />

                        </VStack>

                    </Box>

                    <Box w={150}>

                    </Box>

                </Flex>

            </Container>
        </Layout>
    )
}
