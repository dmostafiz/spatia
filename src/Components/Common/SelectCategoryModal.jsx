import React, { useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Box, Flex, HStack, Input, Spacer, useDisclosure, Text, Stack, Icon } from '@chakra-ui/react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react'
import Discussion from './../../pages/discussion/[id]';
import getCategories from './../../Hooks/getCategories';

export default function SelectCategoryModal({ setCategory, setSubCategory }) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const categories = getCategories()
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
                        Choose the Tag(s) for your Discussion
                    </ModalHeader>

                    <ModalCloseButton rounded='full' />
                    {/* <ModalCloseButton /> */}
                    <ModalBody py={0}>

                        <Box maxH='calc(100vh - 200px)' overflowY='auto'>

                            {categories.map((cat, index) => {

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

                            })}

                        </Box>

                    </ModalBody>

                    <ModalFooter as='flex' w='100%' gap={2}>

                        {/* <Button rounded='full' bg='#fcc31e' border='2px solid' w={150}>
                            Post Discussion
                        </Button> */}

                    </ModalFooter>
                </ModalContent>
            </Modal>


        </>
    )
}
