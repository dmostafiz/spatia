import React, { useEffect, useState } from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Box, Flex, HStack, Input, Spacer, useDisclosure, Text, Icon } from '@chakra-ui/react';
import { Button, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react'
import SelectCategoryModal from './SelectCategoryModal';
import { useToast } from '@chakra-ui/react'
import useToken from '../../Hooks/useToken';
import axios from 'axios'
import { useRouter } from 'next/router';
import { MultiSelect } from '@mantine/core';
import { Modal, Group } from '@mantine/core';
import { RichTextEditor } from '@mantine/rte';
import { ActionIcon } from '@mantine/core';
import { ArrowRight, X } from 'tabler-icons-react';
import authUser from '../../Hooks/authUser';

export default function StartDiscussionModal() {

    const user = authUser()

    const router = useRouter()
    const toast = useToast()
    const [opened, setOpened] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [category, setCategory] = useState(null)
    const [subCategory, setSubCategory] = useState(null)


    const [loading, setLoading] = useState(false)

    const [tags, setTags] = useState([]);
    // const [selectedCategory, setSelectedCategory] = useState(null)

    useEffect(() => {

        if (router.query.slug) {
            // console.log('sdsdsd#####################', router.query.slug)

            async function getCategory() {
                const res = await axios.get(`/category/${router.query.slug}`)
                if (res.data) {
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

        if (!title) {
            return toast({
                title: 'Title is empty',
                description: "Please write a title of the discussion.",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }

        if (content.replace(/<[^>]+>/g, '').replace(/\s+/g, '') == '' || content == '<p><br></p>') {

            return toast({
                title: 'Discussions body is empty',
                description: 'Please write your discussion description!',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }

        setLoading(true)


        const data = {
            title: title,
            content: content,
            categoryId: category.id,
            subCategoryId: subCategory.id,
            tags
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
            {(!user.isLoading && user.data)
                ?
                <Button onClick={() => setOpened(true)} bg='#e6caaf' rounded='full'>
                    Start Discussion
                </Button>

                : <Button rounded='full' bg='#e6caaf' fontSize='12px'>Login to start discussion</Button>
            }


            <Modal
                overlayColor='black'
                closeOnEscape={true}
                overlayBlur={3}
                overlayOpacity={.5}
                closeOnClickOutside={false}
                withCloseButton={false}
                opened={opened}
                onClose={() => setOpened(false)}
                // title={<Text fontWeight='bold' fontSize={20}>Write your discussion content</Text>}
                size='xl'
                centered
                radius={0}
                zIndex={999}
            >
                {/* Modal content */}
                <ActionIcon
                    style={{
                        position: 'absolute',
                        top: -22,
                        right: -22
                    }}
                    variant="transparent"
                    onClick={() => setOpened(false)}
                >
                    <X size={18} color='#f4edde' />
                </ActionIcon>

                <Flex w='100%' gap={2} mb={2}>
                    <Box flex='1' >
                        <Input
                            data-autofocus
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
                        <SelectCategoryModal setCategory={setCategory} setSubCategory={setSubCategory} />
                    </Box>
                </Flex>


                {category && <Box py={2}>
                    <Flex direction='row' gap={1} alignItems='center'>
                        <Icon fontSize='22px' as={category.icon} />
                        <Text>{category.title}</Text>
                        {subCategory && <>
                            <Icon fontSize='22px' as={ArrowRight} />
                            <Text>{subCategory.name}</Text>
                        </>}
                    </Flex>
                </Box>}

                <RichTextEditor
                    stickyOffset={-50}
                    style={{ minHeight: 300 }}
                    radius={0}
                    value={content}
                    onChange={setContent}
                    placeholder='Start your discussion...'
                    controls={[
                        ['bold', 'italic', 'underline', 'link'],
                        ['h1', 'h2', 'h3'],
                        ['alignLeft', 'alignCenter', 'alignRight'],
                        ['code'],
                    ]}
                />

                {/* <CKEditor
                    zIndex={99999}
                    config={{
                        minHeight: '400px',
                        placeholder: "Start your discussion...",
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

                /> */}
                <Box pt={3}>
                    <Text fontSize='12px' fontFamily=''>You can add 4 tags maximum</Text>
                    <Flex gap={5}>
                        <Box flex='1'>
                            <MultiSelect
                                limit={4}
                                zIndex={99999}
                                radius='xl'
                                padding={5}
                                data={tags}
                                placeholder="Discussion tags"
                                searchable
                                creatable
                                maxSelectedValues={4}
                                getCreateLabel={(query) => `+ Create ${query}`}
                                onCreate={(query) => setTags((current) => [...current, query])}
                            />
                        </Box>

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
                    </Flex>
                </Box>

            </Modal>
        </>
    )
}
