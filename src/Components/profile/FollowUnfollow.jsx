import React, { useEffect, useState } from 'react'
import authUser from '../../Hooks/authUser'
import axios from 'axios';
import { Button, ButtonGroup, IconButton, Menu, MenuButton, MenuItem, MenuList, useToast } from '@chakra-ui/react';
import { Bible, UserCheck, BoxMultiple, ArrowDown } from 'tabler-icons-react';
import { useRouter } from 'next/router';


export default function FollowUnfollow({ user }) {

    const aUser = authUser()
    const toast = useToast()
    const router = useRouter()

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
        <>
            {aUser.data?.id && <ButtonGroup mt={3} size='md' isAttached variant='outline' fontFamily='body'>
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
                    fontFamily='body'
                    rounded='full'
                >
                    {followAction == 'Follow' ? 'Follow' : 'Following'}
                </Button>
                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label='Options'
                        icon={<ArrowDown />}
                        variant='outline'
                        rounded='full'
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
            </ButtonGroup>}
        </>
    )
}
