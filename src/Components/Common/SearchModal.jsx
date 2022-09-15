import { Avatar, Box, Button, Flex, Input, InputGroup, InputRightElement, Link, Stack, Text, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

import axios from 'axios'
import NextLink from 'next/link'
import Highlighter from "react-highlight-words";
import { useRouter } from 'next/router'

export default function SearchModal({mobileMenu = false}) {

    const router = useRouter()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [searchQuery, setSearchQuery] = useState('')
    
    const [discussions, setDiscussions] = useState([])
    const [users, setUsers] = useState([])
    const [discussionTags, setDiscussionTags] = useState([])

    useEffect(() => {

        async function searchApi() {
            const res = await axios.get(`/search?q=${searchQuery}`)

            setDiscussions(res.data.discussions)
            setUsers(res.data.users)
            setDiscussionTags(res.data.discussionTags)

            console.log('Search Results: ', res.data)

        }

        if (searchQuery?.length > 1) {
            searchApi()
        }
        else {
            setDiscussions([])
            setUsers([])
        }

        return () => {
            setDiscussions([])
            setUsers([])
        }

    }, [searchQuery])

    useEffect(() => {
        onClose()
    }, [router])

    return (
        <>
            <InputGroup mr={20}>
                <Input
                    readOnly={true}
                    onClick={() => onOpen()}
                    rounded='full'
                    minW={mobileMenu ? 50 : 300}
                    pr={mobileMenu ? 0 : 50} pl={25} py={6} bg='white'
                    border='0px solid #7e8b9f'
                    _focus={{ ring: 0, border: '0px soild', outline: 0 }}
                    placeholder='Search the community'
                    fontFamily={`'Assistant', sans-serif`}
                />
                <InputRightElement py={6} pr={3} >
                    <FiSearch color='green.500' fontSize={20} />
                </InputRightElement>
            </InputGroup>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay
                    bg='blackAlpha.800'
                    backdropFilter='blur(10px)'
                />
                <ModalContent rounded='0' >
                    {/* <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton /> */}
                    <ModalBody p={0} rounded='0'>

                        <Input
                            border={0} _focus={{ border: 0, ring: 0 }}
                            placeholder='Search the community...'
                            onChange={e => setSearchQuery(e.target.value)}
                        />

                        <Box>
                            {discussions?.length > 0 && <Box>
                                <Box bg='black' color='white' p={2}>
                                    <Text>Search results of discussions</Text>
                                </Box>

                                <Box maxH={200} overflowY='auto' p={2}>
                                    <Flex direction='column'>
                                        {discussions.map((discussion, index) => {
                                            return <NextLink key={index} href={`/discussion/${discussion.id}`}>
                                                <Link href={`/discussion/${discussion.id}`}>
                                                    <Text fontFamily='sans-serif' color='gray.500'>
                                                        <Highlighter
                                                            highlightClassName="search-highlighter"
                                                            searchWords={[searchQuery]}
                                                            autoEscape={true}
                                                            textToHighlight={discussion.title}
                                                        />
                                                    </Text>
                                                </Link>
                                            </NextLink>
                                        })}
                                    </Flex>
                                </Box>
                            </Box>}
                        </Box>


                        <Box>
                            {discussionTags?.length > 0 && <Box>
                                <Box bg='black' color='white' p={2}>
                                    <Text>Search results of discussions by tags</Text>
                                </Box>

                                <Box maxH={200} overflowY='auto' p={2}>
                                    <Flex direction='column'>
                                        {discussionTags.map((discussion, index) => {
                                            return <NextLink key={index} href={`/discussion/${discussion.id}`}>
                                                <Link href={`/discussion/${discussion.id}`}>
                                                    <Text fontFamily='sans-serif' color='gray.500'>
                                                        <Highlighter
                                                            highlightClassName="search-highlighter"
                                                            searchWords={[searchQuery]}
                                                            autoEscape={true}
                                                            textToHighlight={discussion.title}
                                                        />
                                                    </Text>
                                                </Link>
                                            </NextLink>
                                        })}
                                    </Flex>
                                </Box>
                            </Box>}
                        </Box>

                        <Box>
                            {users?.length > 0 && <Box>
                                <Box bg='black' color='white' p={2}>
                                    <Text>Search results of users</Text>
                                </Box>

                                <Box maxH={150} p={2} overflowY='auto'>
                                    <Flex direction='column'>
                                        {users.map((user, index) => {
                                            return <NextLink key={index} href={`/user/${user.id}`}>
                                                <Link href={`/user/${user.id}`}>
                                                    <Flex alignItems='center' gap={2}>
                                                        <Avatar size='xs' src={user.avatar} name={user.name} />
                                                        <Text>{user.name}</Text>
                                                    </Flex>

                                                </Link>
                                            </NextLink>
                                        })}
                                    </Flex>
                                </Box>
                            </Box>}

                        </Box>

                    </ModalBody>


                </ModalContent>
            </Modal>
        </>
    )
}
