import React, { useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Box, Flex, HStack, Input, Spacer, useDisclosure, Text, Avatar, Icon } from '@chakra-ui/react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react'
import getCategories from './../../Hooks/getCategories';
import axios from 'axios';

export default function SelectPeopleModal({ members, setMembers }) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [q, setQuery] = useState(null)
    const [users, setUsers] = useState([])

    useEffect(() => {

        async function getMembers() {
            const res = await axios.get(`/members?q=${q}`)

            console.log('Searched Users: ', res.data.users)
            setUsers(res.data.users)

        }

        getMembers()

    }, [q])


    // const categories = getCategories()

    const [selected, setSelected] = useState([])

    const handleClickUser = (member) => {

        const hasSelected = selected.find(user => user.id == member.id)

        if (!hasSelected) {
            setSelected([...selected, member])
        } else {
            setSelected(selected.filter(user => user.id != member.id))

        }

        // setCategory(category)
        // onClose()
    }

    useEffect(() => {
        setSelected(members)
    }, [members])

    const handleSelectionDone = () => {
        setMembers(selected)
        onClose()
    }

    // useEffect(() => {

    //     console.log('hasSelected: ', selected)

    // }, [selected])

    return (
        <>
            <Button onClick={onOpen} bg='white' variant='outline' rounded='none'>
                Select members
            </Button>

            <Modal
                // closeOnOverlayClick={false}
                size='3xl'
                isOpen={isOpen}
                onClose={onClose}
                isCentered
            >

                <ModalOverlay
                    bg='blackAlpha.500'
                    backdropFilter='blur(3px)'
                />

                <ModalContent rounded='none'>
                    <ModalHeader>
                        Select members for private discussion
                    </ModalHeader>

                    <ModalCloseButton rounded='full' />
                    {/* <ModalCloseButton /> */}
                    <ModalBody py={0}>

                        <Box pb={5}>
                            <Input onChange={e => setQuery(e.target.value)} value={q} placeholder='Search people by name...' />
                        </Box>

                        <Box maxH='calc(100vh - 200px)' overflowY='auto'>

                            {
                                users.length ? <Box>

                                    {
                                        users.map((user, index) => {

                                            return <HStack
                                                key={index}
                                                w='full'
                                                _hover={{ bg: '#ede7e0' }}
                                                bg={selected.includes(user) && '#ede7e0'}
                                                cursor='pointer'
                                                p={3}
                                                alignItems='center'
                                                onClick={() => handleClickUser(user)}
                                            >
                                                <Box pr={3}>
                                                    <Avatar size='sm' src='' name={user.name} />
                                                </Box>
                                                <Box>
                                                    <Text fontSize='20px' fontWeight='bold'>{user.name}</Text>
                                                </Box>
                                            </HStack>

                                        })
                                    }
                                </Box>
                            
                            :

                            <Box py={10}>
                                <Text>Please type user name to find members</Text>
                            </Box>
                            
                            
                            }

                        </Box>

                    </ModalBody>

                    <ModalFooter as='flex' w='100%' gap={2}>

                        <Button onClick={handleSelectionDone} rounded='full' bg='#fcc31e' border='2px solid' w={150}>
                            Selection Done!
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>


        </>
    )
}
