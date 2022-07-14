import { Avatar, Box, Container, Flex, HStack, Icon, Link, Show, Spacer, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import Layout from '../../Components/Home/Layout'
import DiscussionTags from '../../Components/Home/Discussion/DiscussionTags';
import DiscussionBody from '../../Components/Home/Discussion/DiscussionBody';
import DiscussionReplyThread from '../../Components/Home/Discussion/DiscussionReplyThread';
import StickyBox from 'react-sticky-box';
import DiscussionsRightSidebar from '../../Components/Home/Discussion/DiscussionsRightSidebar';
import DiscussionReplyForm from '../../Components/Home/Discussion/DiscussionReplyForm';
import axios from 'axios'

function Discussion({ discussion }) {

    // console.log('Single Discussion: ', discussion)
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
                                <Text as='h1' fontSize={{ base: '20px', sm: '24px', md: '50px' }} fontWeight='bold' lineHeight='1' color='#000000'>
                                    {discussion.title}
                                </Text>

                            </Box>
                        </Box>

                        {/* Discussion Body */}
                        <DiscussionBody discussion={discussion} />


                        {/* Discussion Replies */}
                        <VStack>

                            <DiscussionReplyThread data={{ name: 'Ali Ahamed' }} />
                            <DiscussionReplyThread data={{ name: 'Robiul Sardar' }} />
                            <DiscussionReplyThread data={{ name: 'Habib Molla' }} />
                            <DiscussionReplyThread data={{ name: 'Helal Haoladar' }} />
                            <DiscussionReplyThread data={{ name: 'Mostafiz Rahaman' }} />
                            <DiscussionReplyThread data={{ name: 'Mofiz Mia' }} />
                            <DiscussionReplyThread data={{ name: 'Rai Saaaaaa' }} />

                            <Spacer />
                            <Spacer />


                            <DiscussionReplyForm data={{ name: 'Card Reply' }} />


                        </VStack>

                    </Box>

                    <Show above='md'>
                        <Box w={200} minH='100vh' overflowWrap='hidden'>
                            <StickyBox offsetTop={250}>

                                <DiscussionsRightSidebar />

                            </StickyBox>
                        </Box>
                    </Show>

                </Flex>

            </Container>
        </Layout>
    )
}

Discussion.getInitialProps = async (context) => {

    const res = await axios.get(`/discussion/${context.query.id}`);

    // console.log('###########################################', res.data)

    return {
        discussion: res?.data, // will be passed to the page component as props
    }

}

export default Discussion