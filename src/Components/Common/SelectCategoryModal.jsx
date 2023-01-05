import React, { useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Box, Flex, HStack, Input, Spacer, useDisclosure, Text, Stack, Icon } from '@chakra-ui/react';
import { Button, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react'
// import Discussion from './../../pages/discussion/[id]';
import getCategories from './../../Hooks/getCategories';
import { Modal } from '@mantine/core';
import authUser from '../../Hooks/authUser';


export default function SelectCategoryModal({ setCategory, setSubCategory }) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const aUser = authUser()
    const categories = getCategories()

    useEffect(() => {

        console.log('Auth User: ', aUser?.data)
    }, [aUser])

    const [viewSubCategories, setViewSubCategories] = useState({ show: false, catId: null })

    // const [selected, setSelected] = useState(null)

    const handleClickCategory = (category) => {

        // const hasSelected = selected.find(cat => cat == category.id)

        // if (!hasSelected) {
        //     setSelected([...selected, category.id])
        // } else {
        //     setSelected(selected.filter(cat => cat != category.id))

        // }

        setCategory(category)

        if (!category.subCategories.length) {
            setSubCategory(null)
        }

        if (!category.subCategories.length) {
            setViewSubCategories({ show: false, catId: null })
            onClose()
        } else {
            setViewSubCategories({ show: true, catId: category.id })
        }
    }

    const handleClickSubCategory = (subCategory) => {
        setSubCategory(subCategory)
        setViewSubCategories({ show: false, catId: null })
        onClose()
    }

    // useEffect(() => {

    //     console.log('hasSelected: ', selected)

    // }, [selected])

    return (
        <>
            <Button onClick={onOpen} bg='white' variant='outline' rounded='none'>
                Choose category
            </Button>

            <Modal
                // closeOnOverlayClick={false}
                size='3xl'
                opened={isOpen}
                onClose={onClose}
                // zIndex={100000000000}
                title={<Text fontWeight='bold' fontSize={20}>Select category & sub category</Text>}
                zIndex={99999}
                isCentered
            >

                {/* <ModalOverlay
                    bg='blackAlpha.500'
                    backdropFilter='blur(3px)'
                /> */}
                {/* 
                <ModalContent rounded='none'>
                    <ModalHeader>
                        Choose the Tag(s) for your Discussion
                    </ModalHeader>

                    <ModalCloseButton rounded='full' />
                    <ModalBody py={0}> */}

                <Box maxH='calc(100vh - 200px)' overflowY='auto'>

                    {categories.map((cat, index) => {


                        if (cat.slug == "announcements") {
                            if (aUser?.data?.role != 'user') {
                                return <HStack
                                    key={index}
                                    w='full'
                                    _hover={{ bg: '#ede7e0' }}
                                    // bg={selected.includes(cat.id) && '#ede7e0'}
                                    cursor='pointer'
                                    p={3}
                                    alignItems='flex-start'
                                    onClick={() => handleClickCategory(cat)}
                                >
                                    <Box pr={3}>
                                        <Icon fontSize='32px' as={cat.icon} />
                                    </Box>
                                    <Box>
                                        <Text fontSize='20px' fontWeight='bold'>{cat.title}</Text>
                                        <Text>{cat.description}</Text>
                                    </Box>
                                </HStack>
                            }

                        } else {
                            return <HStack
                                key={index}
                                w='full'
                                _hover={{ bg: '#ede7e0' }}
                                // bg={selected.includes(cat.id) && '#ede7e0'}
                                cursor='pointer'
                                p={3}
                                alignItems='flex-start'
                                onClick={() => handleClickCategory(cat)}
                            >
                                <Box pr={3}>
                                    <Icon fontSize='32px' as={cat.icon} />
                                </Box>
                                <Box>
                                    <Text fontSize='20px' fontWeight='bold'>{cat.title}</Text>
                                    <Text>{cat.description}</Text>

                                    {(viewSubCategories.show == true && viewSubCategories.catId == cat.id) && <Box pt={2}>
                                        <Text fontWeight='bold'>Choose a sub category</Text>
                                        <Spacer h={1} />
                                        <HStack>
                                            {cat.subCategories.map((ct, index) => {
                                                return <Button
                                                    key={index}
                                                    size='sm'
                                                    rounded='full'
                                                    bg='#fcc31e'
                                                    _hover={{
                                                        bg: 'yellow.500'
                                                    }}
                                                    onClick={() => handleClickSubCategory(ct)}
                                                >
                                                    {ct.name}
                                                </Button>
                                            })}
                                        </HStack>
                                    </Box>}
                                </Box>
                            </HStack>
                        }

                    })}

                </Box>

                {/* </ModalBody>

                    <ModalFooter as='flex' w='100%' gap={2}>

                    </ModalFooter>
                </ModalContent> */}
            </Modal>


        </>
    )
}
