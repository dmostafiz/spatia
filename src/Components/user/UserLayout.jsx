import { Text, Box, Container, Flex, Avatar, SimpleGrid, Icon, Spacer, Input, Button } from '@chakra-ui/react';
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

export default function UserLayout({ children }) {

    const router = useRouter()

    const aUser = authUser()

    const [user, setUser] = useState(null)

    useEffect(() => {
        if (aUser.data && aUser.data.id == router.query?.id) {
            router.replace('/profile')
        }

    }, [aUser.data, router.query])

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

                {user && <UserHead user={user} />}

                <Container maxW='container.xl' py={5}>
                    <Flex direction={{ base: 'column', lg: 'row' }} gap={5}>

                        <Box minH={{ base: 'auto', md: '100vh' }} w={{ base: 'full', lg: '250px' }} >
                            {user && <StickyBox offsetTop={110}>
                                <LeftSidebar user={user} />
                            </StickyBox>}
                        </Box>

                        <Box flex='1'>
                            {children}
                        </Box>
                    </Flex>

                </Container>

            </Container>

        </Layout>
    )
}
