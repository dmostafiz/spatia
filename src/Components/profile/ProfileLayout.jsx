import { Text, Box, Container, Flex, Avatar, SimpleGrid, Icon, Spacer, Input, Button, Center } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { FiWatch } from 'react-icons/fi';
import { Bible, UserCheck, BoxMultiple } from 'tabler-icons-react';
import LeftSidebar from './LeftSidebar';
import UserHead from './UserHead';
import Layout from '../Home/Layout';
import StickyBox from "react-sticky-box"
import authUser from '../../Hooks/authUser';
import BigSpinner from '../Common/BigSpinner';

export default function ProfileLayout({ children }) {

    const router = useRouter()

    const aUser = authUser()

    const [user, setUser] = useState(null)

    useEffect(() => {
        async function getUserInfo() {

            const res = await axios.get(`/user/${aUser.data?.id}`)

            console.log('Got user', res.data)

            if (res.data.status != 'error') {
                setUser(res.data)
            }
        }

        if (aUser.data?.id) {
            getUserInfo()
        }
    }, [aUser.data])

    return (
        <Layout title='user'>

            <Container maxW='container.xl'>

                {user && <UserHead user={user} />}

                {(!aUser.isLoading && aUser.data?.id) ? <Container maxW='container.xl' py={5}>
                    <Flex direction={{ base: 'column', lg: 'row' }} gap={5}>

                        {user &&
                            <Box minH={{ base: 'auto', md: '100vh' }} w={{ base: 'full', lg: '250px' }} >
                                <StickyBox offsetTop={110}>
                                    <LeftSidebar user={user} />
                                </StickyBox>
                            </Box>
                        }

                        <Box flex='1'>
                            {user ? children : <BigSpinner />}
                        </Box>
                    </Flex>

                </Container> : aUser.isLoading ? <BigSpinner /> : <Center h='300px' w='full'>
                    <Text>You are not authenticated to see this page !</Text>
                </Center>}


            </Container>

        </Layout>
    )
}
