import React, { useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Box, Flex, HStack, Input, Spacer, useDisclosure, Text, Icon } from '@chakra-ui/react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react'
import SelectCategoryModal from './SelectCategoryModal';
import { useToast } from '@chakra-ui/react'
import useToken from '../../Hooks/useToken';
import axios from 'axios'
import { useRouter } from 'next/router';

export default function StartDiscussionModal() {

    const router = useRouter()
    const toast = useToast()

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [category, setCategory] = useState(null)

    const [loading, setLoading] = useState(false)
    // const [selectedCategory, setSelectedCategory] = useState(null)

    useEffect(() => {

        if (router.query.slug) {
            // console.log('sdsdsd#####################', router.query.slug)

            async function getCategory() {
                const res = await axios.get(`/category/${router.query.slug}`)
                if(res.data){
                    setCategory(res.data)
                }
            }

            getCategory()
        }
    

    }, [router.query.slug])

    const handleSubmitDiscussion = async () => {

        if (!category) {
            return toast({
                title: 'Category not selectec',
                description: "Please choose a category for your discussion",
                status: 'warning',
                duration: 9000,
                isClosable: true,
            })
        }

        setLoading(true)


        const data = {
            title: title,
            content: content,
            categoryId: category.id
        }

        // console.log('Coooooooooooooooookie: ', useCookie())

        const res = await axios.post('/discussion/store', data)

        if (res.data.status == 'success') {

            router.push(`/discussion/${res.data.body.id}`)

            setTitle('')
            setContent('')
            setCategory(null)

            toast({
                title: 'Success',
                description: "Your discussion has beeen created successfully!",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })

            // console.log('Created discussion: ', res.data.body)

            onClose()
        } else {

            toast({
                title: 'Error',
                description: res.data.msg,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }


        setLoading(false)

    }

    return (
        <>
            <Button onClick={onOpen} bg='#e6caaf' rounded='none'>
                Start Discussion
            </Button>

            <Modal
                closeOnOverlayClick={false}
                size='3xl'
                isOpen={isOpen}
                onClose={onClose}
                isCentered
            >

                <ModalOverlay
                    bg='blackAlpha.700'
                    backdropFilter='blur(5px)'
                />

                <ModalContent rounded='none'>
                    <ModalHeader py={6}>

                        <Text>Start Discussion</Text>

                    </ModalHeader>

                    <ModalCloseButton rounded='full' />
                    {/* <ModalCloseButton /> */}
                    <ModalBody py={0}>

                        <Flex w='100%' gap={2} mb={2}>
                            <Box flex='1' >
                                <Input
                                    flex='1'
                                    _focus={{
                                        border: '1px solid #c4c4c452',
                                        ring: '0px'
                                    }}
                                    placeholder='Discussion Title' rounded='none'
                                    onChange={e => setTitle(e.target.value)}
                                    value={title}
                                />
                            </Box>
                            <Box>
                                <SelectCategoryModal setCategory={setCategory} />
                            </Box>
                        </Flex>


                        {category && <Box py={2}>
                            <Flex direction='row' gap={1} alignItems='center'>
                                <Icon fontSize='22px' as={category.icon} />
                                <Text>{category.title}</Text>
                            </Flex>
                        </Box>}


                        <CKEditor
                            config={{
                                minHeight: '400px',
                                placeholder: "Start your discussion..."
                            }}
                            style={{ height: '300px' }}
                            editor={ClassicEditor}
                            data={content}
                            onReady={editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log('Editor is ready to use!', editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setContent(data)
                                console.log({ event, editor, data });
                            }}
                        // onBlur={(event, editor) => {
                        //     console.log('Blur.', editor);
                        // }}
                        // onFocus={(event, editor) => {
                        //     console.log('Focus.', editor);
                        // }}
                        />



                    </ModalBody>

                    <ModalFooter as='flex' w='100%' gap={2}>

                        <Button
                            isLoading={loading}
                            loadingText='Submitting'
                            onClick={handleSubmitDiscussion}
                            rounded='full'
                            bg='#fcc31e'
                            border='2px solid'
                            w={150}
                        >
                            Post Discussion
                        </Button>

                    </ModalFooter>
                </ModalContent>
            </Modal>


        </>
    )
}
