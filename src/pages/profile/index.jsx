import { Text, Box, Container, Flex, Avatar, SimpleGrid, Icon, Spacer, Input } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { FiWatch } from 'react-icons/fi';
import { Bible, UserCheck, BoxMultiple } from 'tabler-icons-react';
import LeftSidebar from '../../Components/profile/LeftSidebar';
import ProfileLayout from '../../Components/profile/ProfileLayout';
import authUser from '../../Hooks/authUser';
import Layout from './../../Components/Home/Layout';

export default function profile() {

    const router = useRouter()

    const userData = authUser()

    const [user, setUser] = useState(null)

    useEffect(() => {
        async function getUserInfo() {

            const res = await axios.get(`/user/${userData.data?.id}`)

            console.log('Got user', res.data)

            if (res.data.status != 'error') {
                setUser(res.data)
            }
        }

        if (userData.data?.id) {
            getUserInfo()
        }
    }, [userData.data, router])

    return (
        <ProfileLayout title='Profile'>

            Profile Index

        </ProfileLayout>
    )
}
