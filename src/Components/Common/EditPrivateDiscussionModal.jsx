import React, { useCallback, useEffect, useState } from 'react'
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Box, Flex, HStack, Input, Spacer, useDisclosure, Text, Icon, MenuItem, Wrap, Tag, TagLabel } from '@chakra-ui/react';
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
import { ArrowRight, Edit, X } from 'tabler-icons-react';
import authUser from '../../Hooks/authUser';
import LoginWindowButton from './LoginWindowButton';
import useMentions from '../../Hooks/useMentions';
import UploadFiles from './UploadFiles';

export default function EditPrivateDiscussionModal({ discussion }) {

    const user = authUser()

    const menstions = useMentions('hello i am from mention quill')

    const router = useRouter()
    const toast = useToast()
    const [opened, setOpened] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [title, setTitle] = useState(discussion.title)
    const [content, setContent] = useState(discussion.content)

    const [loading, setLoading] = useState(false)

    const [tags, setTags] = useState([]);

    const [files, setFiles] = useState(discussion.files)
    // const [selectedCategory, setSelectedCategory] = useState(null)

    useEffect(() => {

        const editTags = []

        discussion.tags.map(tag => {
            editTags.push(tag.name)
        })

        console.log('editTags ', editTags)

        setTags(editTags)

    }, [])


    const handleSubmitDiscussion = async () => {

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
            id: discussion.id,
            title: title,
            content: content,
            tags,
            files
        }


        // console.log('Coooooooooooooooookie: ', useCookie())

        const res = await axios.post('/discussion/private/update', data)

        if (res.data.status == 'success') {

            
            toast({
                title: 'Success',
                description: "Your discussion has beeen updated successfully!",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            
            router.reload(`/discussion/${res.data.body.id}`)
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


    const handleImageUpload = useCallback(

        file => new Promise((resolve, reject) => {

            const formData = new FormData();
            // formData.append('image', file);

            // fetch('https://api.imgbb.com/1/upload?key=api_key', {
            //     method: 'POST',
            //     body: formData,
            // })

            axios.post('/upload_discussion_photo', { file }, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

                // .then((response) => response.json())
                .then((result) => resolve(result.data.url))
                .catch(() => reject(new Error('Upload failed')));
        }),

        []

    )


    return (
        <>
            {/* <Button onClick={() => setOpened(true) } bg='#e6caaf' w={mode == 'mobile' ? 'full' : 'auto'} rounded={mode == 'mobile' ? 'none' : 'full'}>
                    Start Discussion
                </Button> */}
            {(!user.isLoading && user.data)
                &&
                <MenuItem onClick={() => setOpened(true)} icon={<Edit />}>
                    Edit
                </MenuItem>
                // <Button rounded='full' bg='#e6caaf' fontSize='12px'>Login to start discussion</Button>
            }


            <Modal
                // overlayColor='black'
                closeOnEscape={true}
                // overlayBlur={3}
                overlayOpacity={.1}
                closeOnClickOutside={false}
                withCloseButton={false}
                opened={opened}
                onClose={() => setOpened(false)}
                // title={<Text fontWeight='bold' fontSize={20}>Write your discussion content</Text>}
                size='xl'
                centered
                radius={0}
                zIndex={9999}
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
                    <X size={18} color='black' />
                </ActionIcon>

                <Flex direction={{ base: 'column', md: 'row' }} w='100%' gap={2} mb={2}>
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
                    <Flex gap={2} mb={2}>
                        <UploadFiles setFiles={setFiles} />
                    </Flex>
                </Flex>


                {files.length > 0 && <Box pb={'2'}>
                    <Text>Additional uploading files</Text>
                    <Wrap>
                        {files.map((file, index) => {
                            return <Tag rounded='full' size={'md'} key={index} variant='outline' colorScheme='blue'>
                                <TagLabel>{file.name}</TagLabel>
                            </Tag>
                        })}
                    </Wrap>
                </Box>}


                <RichTextEditor
                    stickyOffset={-50}
                    style={{ minHeight: 300 }}
                    radius={0}
                    value={content}
                    onChange={setContent}

                    onImageUpload={handleImageUpload}
                    mentions={menstions}
                    placeholder='Start your discussion...'
                    controls={[
                        ['bold', 'italic', 'underline', 'link'],
                        ['h1', 'h2', 'h3'],
                        ['alignLeft', 'alignCenter', 'alignRight'],
                        ['code'],
                        ['image']
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
                            Update Discussion
                        </Button>
                    </Flex>
                </Box>

            </Modal>
        </>
    )
}
