import { Text, Box, Container, Flex, Avatar, SimpleGrid, Icon, Spacer, Input, Button } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { FiWatch } from 'react-icons/fi';
import { Bible, UserCheck, BoxMultiple } from 'tabler-icons-react';
import LeftSidebar from '../../../Components/user/LeftSidebar';
import UserHead from '../../../Components/user/UserHead';
import UserLayout from '../../../Components/user/UserLayout';
import Layout from './../../../Components/Home/Layout';

export default function user() {
    
    return (
        <UserLayout>
            User Index
        </UserLayout>
    )
}
