import React, { useEffect, useState } from 'react'
import authUser from '../../Hooks/authUser'
import axios from 'axios';
import { Button, ButtonGroup, IconButton, Menu, MenuButton, MenuItem, MenuList, useToast } from '@chakra-ui/react';
import { Bible, UserCheck, BoxMultiple, ArrowDown } from 'tabler-icons-react';
import { useRouter } from 'next/router';


export default function FollowUnfollowDiscussion({ disc }) {

    const aUser = authUser()
    const toast = useToast()
    const router = useRouter()
    const [discussion, setDiscussion] = useState(disc)

    const [followAction, setFollowAction] = useState('Follow')
    const [ignoreAction, setIgnoreAction] = useState('Ignore')

    const [loading, setLoading] = useState(false)

    useEffect(() => {

        async function getDiscussionData() {
            console.log('User ', discussion)

            const res = await axios.get(`/discussion/${discussion?.id}`)

            console.log('Returning discussion ', res.data)

            changeDiscussionAction(res.data)
            // setDiscussion(red.data.discussion)
        }

        // if (discussion?.id) {
            getDiscussionData()
        // }

    }, [])

    const handleAction = async (actionValue) => {

        setLoading(true)

        const res = await axios.post('/discussion/action', { action: actionValue, discussionId: router.query?.id })

        if (actionValue == 'Follow') {
            toast({
                description: `You are following ${discussion?.title}`,
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }
        else if (actionValue == 'Unfollow') {
            toast({
                description: `You unfollowed ${discussion?.title}`,
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }
        else if (actionValue == 'Ignore') {
            toast({
                description: `You are ignoring ${discussion?.title}`,
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }
        else if (actionValue == 'Ignored') {
            toast({
                description: `You Stopped ignoring ${discussion?.title}`,
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }
        // console.log('Action Triggered ', res.data)

        changeDiscussionAction(res.data)

        setLoading(false)

    }

    function changeDiscussionAction(disc) {

        if (disc.followingUsersIds?.includes(aUser.data?.id)) {

            setFollowAction('Unfollow')

        } else {
            setFollowAction('Follow')
        }

        if (disc.ignoringUsersIds?.includes(aUser.data?.id)) {

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
                    {followAction == 'Follow' ? 'Follow Dsicussions' : followAction == 'Ignore' ? 'Ignoring discussion' :  'Following'}
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
