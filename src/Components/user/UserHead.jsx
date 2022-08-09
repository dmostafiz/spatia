import { Text, Box, Container, Flex, Avatar, SimpleGrid, Icon, Spacer, Input, Button, ButtonGroup, IconButton, MenuButton, MenuList, MenuItem, Menu, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { FiUserPlus, FiWatch } from 'react-icons/fi';
import { GoPrimitiveDot } from 'react-icons/go';


import { Bible, UserCheck, BoxMultiple, ArrowDown } from 'tabler-icons-react';
import authUser from '../../Hooks/authUser';
import FollowUnfollow from '../profile/FollowUnfollow';
import { useSelector } from 'react-redux'


export default function UserHead({ user }) {

    const onlineUsers = useSelector(state => state.onlineState.users)

    const [userOnline, setUserOnline] = useState(false)

    const router = useRouter()
    const aUser = authUser()
    const toast = useToast()

    useEffect(() => {

        const userExist = onlineUsers?.filter(usr => usr.id == user.id)

        if (userExist.length) {
            setUserOnline(true)
        }else{
            setUserOnline(false)
        }
        // console.log('Online Users ID ', userExist)

    }, [onlineUsers])

    // const [action, setAction] = useState('Follow')
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
                            {userOnline && <Flex>
                                <Icon fontSize={18} color='green.500' as={GoPrimitiveDot} />
                                <Text>Online</Text>
                            </Flex>}

                            <Flex alignItems='center' gap={1}>
                                <Icon fontSize={18} as={FiWatch}/>
                                <Text>Joined {user.createdAt ? moment(user.createdAt).calendar() : 'Nov, 2021'}</Text>
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
                        {/* {aUser.data?.id && <ButtonGroup mt={3} size='md' isAttached variant='outline' fontFamily='body'>
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
                        </ButtonGroup>} */}


                        <FollowUnfollow user={user} />

                    </Box>
                </Flex>

            </Box>
        </Box>
    )
}
