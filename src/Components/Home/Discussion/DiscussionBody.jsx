import React from 'react'
import { Avatar, Box, Button, Flex, HStack, Icon, IconButton, Link, Menu, MenuButton, MenuItem, MenuList, Tag, TagLabel, Text, Wrap } from '@chakra-ui/react'
import { CgMailReply } from 'react-icons/cg'
import { AiOutlineEye } from 'react-icons/ai'
import { IoMdChatboxes } from 'react-icons/io'
import { RiHeart2Fill } from 'react-icons/ri'
import moment from 'moment'
import ReactionsReact from '../ReactionsReact'
import NextLink from 'next/link'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Edit, X } from 'tabler-icons-react'
import { FiDelete } from 'react-icons/fi'
import dynamic from "next/dynamic"
import DeleteConfirmation from '../../Common/DeleteConfirmation'
import authUser from '../../../Hooks/authUser'
import { useEffect } from 'react'

const EditPrivateDiscussionModal = dynamic(import('../../Common/EditPrivateDiscussionModal'), {
    ssr: false
})

const EditDiscussionModal = dynamic(import('../../Common/EditDiscussionModal'), {
    ssr: false
})

export default function DiscussionBody({ handleClickReply, discussion }) {

    const user = authUser()

    useEffect(() => {
        console.log('Auth User ', user)
    }, [user])

    return (
        <Box mb={4} px={5} py={4} bg='#f4edde'>
            <Flex direction={{ base: 'column', md: 'row' }} alignItems='flex-start' gap={2}>
                <Box w={50}>
                    <Avatar src='' name='Mahesh Babu' />
                </Box>
                <Box w='full'>
                    <HStack fontSize='14px' gap={2} mb={2}>
                        <NextLink href={`/user/${discussion?.author.id}`}>
                            <Link href={`/user/${discussion?.author.id}`}>
                                <Text
                                    fontWeight='bold'
                                    fontFamily={`'Montserrat', sans-serif;`}>
                                    {discussion?.author?.username}
                                </Text>
                            </Link>
                        </NextLink>
                        <Text
                            color='#7a7f85'
                        >
                            {moment(discussion.createdAt).calendar()}
                        </Text>
                    </HStack>

                    <Box w='full'>
                        <Wrap>
                            <Text
                                as='div'
                                fontSize='14px'
                                fontFamily={`'Montserrat', sans-serif;`}
                                wordBreak='break-word'
                                mb={4}
                                dangerouslySetInnerHTML={{
                                    __html: discussion.content
                                }}
                            >
                                {/* {discussion.content} */}
                            </Text>
                        </Wrap>

                        {discussion.files.length > 0 && <Box pb={'2'} fontFamily={'sans-serif'}>
                            <>
                                <Text fontWeight={'bold'}>Related files</Text>
                                <Wrap>
                                    {discussion.files.map((file, index) => {
                                        return <a target={'_blank'} href={file.url}>
                                            <Tag rounded='full' size={'md'} key={index} variant='outline' colorScheme='cyan'>
                                                <TagLabel>{file.name}</TagLabel>
                                            </Tag>
                                        </a>
                                    })}
                                </Wrap>
                            </>
                        </Box>}


                        <Flex w='full' direction={{ base: 'column', md: 'row' }} alignItems={{ base: 'left', md: 'center' }} justify='space-between' gap={3}>

                            <Wrap maxW='350px' alignItems='flex-start'>
                                <Icon fontSize='18px' as={CgMailReply} />
                                <Text color='#2c53a8' fontSize='12px' fontFamily={`'Montserrat', sans-serif;`} >
                                    {discussion.replies.length ?
                                        <>
                                            {discussion.replies.map((reply, index) => {
                                                return <Text key={index} as='span'>
                                                    <NextLink href={`/user/${reply.author?.id}`}>
                                                        <Link href={`/user/${reply.author?.id}`}>
                                                            <Text as='span' fontWeight='bold'>{reply.author.username}</Text>
                                                        </Link>
                                                    </NextLink> {index == discussion.replies.length - 2 && 'and '} {index < discussion.replies.length - 2 && ', '}
                                                </Text>
                                            })}
                                        </>
                                        : <Text as='span'>No one </Text>}

                                    <Text as='span'>replied to this</Text>

                                </Text>

                            </Wrap>


                            {/* <HStack gap={1}>
                                <Button rounded={'none'} size='sm' colorScheme='red'>Delete</Button>
                                <Button rounded={'none'} size='sm' colorScheme='blue'>Edit</Button>
                            </HStack> */}


                            <Flex>
                                <Wrap spacing={4}>
                                    <Flex alignItems='center' gap={1}>
                                        <Icon fontSize={24} as={AiOutlineEye} />
                                        <Text>{discussion.views ?? 0}</Text>
                                    </Flex>

                                    <ReactionsReact discussionId={discussion.id} />

                                    <Flex alignItems='center' gap={1}>
                                        <Icon fontSize={24} color='#3367b1' as={IoMdChatboxes} />
                                        <Text>{discussion.replyCount}</Text>
                                    </Flex>

                                    <Flex alignItems='center' gap={1}>
                                        <Text cursor='pointer' onClick={() => handleClickReply(null)}>Reply</Text>
                                    </Flex>

                                    {(user?.data?.role == 'admin' || user?.data?.role == 'moderator') &&
                                        <Menu>
                                            <MenuButton
                                                as={IconButton}
                                                aria-label='Options'
                                                icon={<BsThreeDotsVertical />}
                                                size='sm'
                                                color={'green.900'}
                                                background='transparent'
                                                colorScheme='transparent'
                                            />
                                            <MenuList>
                                                {/* <MenuItem onClick={() => alert("Edit discussion")} icon={<Edit />}>
                                            Edit
                                        </MenuItem> */}
                                                {discussion.isPrivate ? <EditPrivateDiscussionModal discussion={discussion} /> : <EditDiscussionModal discussion={discussion} />}

                                                <DeleteConfirmation title='Delete Discussion!' deleteUrl={'/discussion/delete'} deleteId={discussion.id} />

                                            </MenuList>
                                        </Menu>
                                    }


                                </Wrap>
                            </Flex>
                        </Flex>
                    </Box>
                </Box>
            </Flex>
        </Box>
    )
}
