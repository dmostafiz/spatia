import { Text, Box, Container, Flex, Avatar, SimpleGrid, Icon, Spacer, Input, Button, ButtonGroup, IconButton, MenuButton, MenuList, MenuItem, Menu, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { FiUserPlus, FiWatch } from 'react-icons/fi';
import { Bible, UserCheck, BoxMultiple, ArrowDown } from 'tabler-icons-react';
import authUser from '../../Hooks/authUser';

export default function UserHead({ user }) {

    const router = useRouter()
    const aUser = authUser()
    const toast = useToast()
    // const [action, setAction] = useState('Follow')

    const [followAction, setFollowAction] = useState('Follow')
    const [ignoreAction, setIgnoreAction] = useState('Ignore')

    const [loading, setLoading] = useState(false)

    useEffect(() => {

        async function getUserData() {
            console.log('User ', user)

            const res = await axios.get(`/user/${user?.id}`)

            changeUserAction(res.data)
        }

        if (user.id) {
            getUserData()
        }

    }, [user])

    const handleAction = async (actionValue) => {

        setLoading(true)

        const res = await axios.post('/user/action', { action: actionValue, userId: router.query?.id })

        if (actionValue == 'Follow') {
            toast({
                description: `You are now following ${user.name}`,
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }
        else if (actionValue == 'Unfollow') {
            toast({
                description: `You unfollowed ${user.name}`,
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }
        else if (actionValue == 'Ignore') {
            toast({
                description: `You are ignoring ${user.name}`,
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }
        else if (actionValue == 'Ignored') {
            toast({
                description: `You Stopped ignoring ${user.name}`,
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }
        // console.log('Action Triggered ', res.data)

        changeUserAction(res.data)

        setLoading(false)

    }

    function changeUserAction(usr) {

        if (usr.followerIds?.includes(aUser.data?.id)) {

            setFollowAction('Unfollow')

        } else {
            setFollowAction('Follow')
        }

        if (usr.haterIds?.includes(aUser.data?.id)) {

            setIgnoreAction('Ignored')

        } else {
            setIgnoreAction('Ignore')
        }
    }

    return (
        <Box as='div' w='full' p={3} mb={4} bg='#f6e3d1' rounded='sm' shadow>
            <Box p={4} bg='#fffefd' rounded='sm'>

                <Flex alignItems={{ base: 'flex-start', lg: 'flex-start' }} gap={5} direction={{ base: 'column', lg: 'row' }}>

                    <Box>
                        <Avatar size='2xl' src={user?.avatar} name={user?.name} />
                    </Box>

                    <Box w='full' as='div' pt={{ base: 0, lg: 3 }}>
                        <Text as='h1' fontFamily='revert' fontSize={{ base: '20px', sm: '24px', md: '40px' }} fontWeight='bold' lineHeight='1' color='#000000'>
                            {user?.name}
                        </Text>

                        <Spacer h={3} />
                        <SimpleGrid w='full' columns={{ base: 2, sm: 2, md: 5, lg: 7 }} fontSize='13px' fontFamily='sans-serif' fontWeight='normal' letterSpacing={1}>
                            <Flex alignItems='center' gap={1}>
                                <Icon fontSize={18} as={FiWatch} />
                                <Text>2 minutes ago</Text>
                            </Flex>
                            <Flex alignItems='center' gap={1}>
                                {/* <Icon fontSize={18} as={FiWatch}/> */}
                                <Text>Joined Nov, 2021</Text>
                            </Flex>
                            <Flex alignItems='center' gap={1}>
                                <Icon fontSize={18} as={UserCheck} />
                                <Text>Status-Verified</Text>
                            </Flex>
                            {/* <Flex alignItems='center' gap={1}>
                                <Icon fontSize={18} as={BoxMultiple} />
                                <Text>888 Points</Text>
                            </Flex> */}

                            <Flex alignItems='center' gap={1}>
                                <Icon fontSize={18} as={FiUserPlus} />
                                <Text>{user.followerIds?.length} Follower{user.followerIds?.length > 1 && 's'}</Text>
                            </Flex>
                        </SimpleGrid>
                        <Spacer h={3} />

                        {/* <Input placeholder='Write something about your self....' border={0} _focus={{ border: 'none', ring: 'none' }} px={1} /> */}
                        {user.bio && <>
                            <Box p={3}>
                                <Text>{user?.bio}</Text>
                            </Box>
                            <Spacer h={3} />
                        </>}


                        {/* <Button rounded='full' bg='#ede7e0'>Follow</Button> */}
                        <ButtonGroup mt={3} size='md' isAttached variant='outline' fontFamily='body'>
                            <Button
                                disabled={loading}
                                _hover={{
                                    bg: 'white'
                                }}
                                _active={{
                                    bg: 'white'
                                }}
                                cursor='default'
                                isLoading={loading}
                                fontFamily='body'>
                                {followAction == 'Follow' ? 'Follow' : 'Following'}
                            </Button>
                            <Menu>
                                <MenuButton
                                    as={IconButton}
                                    aria-label='Options'
                                    icon={<ArrowDown />}
                                    variant='outline'
                                />
                                <MenuList>

                                    {followAction == 'Follow' && <MenuItem onClick={() => handleAction('Follow')} fontFamily='body'>
                                        Follow
                                    </MenuItem>}


                                    {followAction == 'Unfollow' && <MenuItem onClick={() => handleAction('Unfollow')} fontFamily='body'>
                                        Unfollow
                                    </MenuItem>}

                                    {ignoreAction == 'Ignored' && <MenuItem onClick={() => handleAction('Ignored')} fontFamily='body'>
                                        Ignored
                                    </MenuItem>}

                                    {ignoreAction == 'Ignore' && <MenuItem onClick={() => handleAction('Ignore')} fontFamily='body'>
                                        Ignore
                                    </MenuItem>}

                                </MenuList>
                            </Menu>
                        </ButtonGroup>

                    </Box>
                </Flex>

            </Box>
        </Box>
    )
}
