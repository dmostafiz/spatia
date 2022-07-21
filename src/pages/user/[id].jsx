import { Text, Box, Container, Flex, Avatar, SimpleGrid, Icon, Spacer, Input } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { FiWatch } from 'react-icons/fi';
import { Bible, UserCheck, BoxMultiple } from 'tabler-icons-react';
import LeftSidebar from '../../Components/profile/LeftSidebar';
import Layout from './../../Components/Home/Layout';

export default function user() {

    const router = useRouter()

    const [user, setUser] = useState(null)

    useEffect(() => {
        async function getUserInfo() {

            const res = await axios.get(`/user/${router.query.id}`)

            console.log('Got user', res.data)

            if (res.data.status != 'error') {
                setUser(res.data)
            }
        }

        if (router.query.id) {
            getUserInfo()
        }
    }, [router])

    return (
        <Layout title='user'>

            <Container maxW='container.xl'>

                <Box as='div' w='full' p={3} mb={4} bg='#f6e3d1' rounded='sm' shadow>
                    <Box p={4} bg='#fffefd' rounded='sm'>

                        <Flex alignItems={{base: 'flex-start', lg: 'center'}} gap={5}  direction={{ base: 'column', lg: 'row' }}>

                            <Box>
                                <Avatar size='2xl' src={user?.avatar} name={user?.name} />
                            </Box>

                            <Box w='full' as='div'>
                                <Text as='h1' fontFamily='revert' fontSize={{ base: '20px', sm: '24px', md: '40px' }} fontWeight='bold' lineHeight='1' color='#000000'>
                                    {user?.name}
                                </Text>

                                <Spacer h={3} />
                                <SimpleGrid w='full' columns={{base: 2, sm: 2, md: 5, lg:7}} fontSize='13px' fontFamily='sans-serif' fontWeight='normal' letterSpacing={1}>
                                    <Flex alignItems='center' gap={2}>
                                        <Icon fontSize={18} as={FiWatch} />
                                        <Text>12 months ago</Text>
                                    </Flex>
                                    <Flex alignItems='center' gap={2}>
                                        {/* <Icon fontSize={18} as={FiWatch}/> */}
                                        <Text>Joined Nov, 2021</Text>
                                    </Flex>
                                    <Flex alignItems='center' gap={2}>
                                        <Icon fontSize={18} as={UserCheck} />
                                        <Text>Status-Verified</Text>
                                    </Flex>
                                    <Flex alignItems='center' gap={2}>
                                        <Icon fontSize={18} as={BoxMultiple} />
                                        <Text>888 Points</Text>
                                    </Flex>
                                </SimpleGrid>

                                <Spacer h={3} />

                                <Input placeholder='Write something about your self....' border={0} _focus={{ border: 'none', ring: 'none' }} px={1} />

                            </Box>
                        </Flex>

                    </Box>
                </Box>

                <Container maxW='container.xl' py={5}>
                    <Flex direction={{ base: 'column', lg: 'row' }}>
                        <Box minH='100vh' w={{base: 'full', lg: '270px'}} >

                            <LeftSidebar />

                        </Box>
                        <Box flex='1'></Box>
                    </Flex>

                </Container>

            </Container>

        </Layout>
    )
}
