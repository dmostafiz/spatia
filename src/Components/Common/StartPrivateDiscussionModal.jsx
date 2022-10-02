import React, { useCallback, useEffect, useState } from 'react'
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Box, Flex, HStack, Input, Spacer, useDisclosure, Text, Avatar, Icon, Tooltip, Tag, TagLabel, Wrap } from '@chakra-ui/react';
import { Button, SimpleGrid } from '@chakra-ui/react'
import SelectPeopleModal from './SelectPeopleModal';
import { useToast } from '@chakra-ui/react'
import useToken from '../../Hooks/useToken';
import axios from 'axios'
import { useRouter } from 'next/router';
import { MultiSelect } from '@mantine/core';
import { Modal, Group } from '@mantine/core';
import { RichTextEditor } from '@mantine/rte';
import { ActionIcon } from '@mantine/core';
import { X } from 'tabler-icons-react';
import UploadFiles from './UploadFiles';
import SelectCategoryModal from './SelectCategoryModal';

export default function StartPrivateDiscussionModal() {

    const router = useRouter()
    const toast = useToast()
    const [opened, setOpened] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [members, setMembers] = useState([])

    const [loading, setLoading] = useState(false)

    const [files, setFiles] = useState([])

    const [tags, setTags] = useState([]);

    useEffect(() => {

        console.log('Selected  Members: ', members)

    }, [members])


    const handleSubmitDiscussion = async () => {

        if (members.length < 2) {
            return toast({
                title: 'No mebers selected',
                description: "Please select members to discuss privately!",
                status: 'warning',
                duration: 9000,
                isClosable: true,
            })
        }

        setLoading(true)


        const data = {
            title: title,
            content: content,
            users: members,
            tags,
            files
        }

        // console.log('Coooooooooooooooookie: ', useCookie())

        const res = await axios.post('/discussion/private/store', data)

        if (res.data.status == 'success') {

            // return console.log(res.data)
            router.push(`/discussion/${res.data.body.id}`)

            setTitle('')
            setContent('')

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

    const removeSelectedUser = (member) => {
        setMembers(members.filter(user => user.id !== member.id))
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
            <Button onClick={() => setOpened(true)} bg='#e6caaf' rounded='full' fontSize='12px'>
                Start Private Discussion
            </Button>

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
                        <SelectPeopleModal members={members} setMembers={setMembers} />
                        <UploadFiles setFiles={setFiles} />
                    </Flex>
                </Flex>


                <Box w='full' py={2}>
                    {members.length ?
                        <Box pb={2}>
                            <Box>
                                <Text>Selected Members</Text>
                            </Box>
                            <Wrap >

                                {members.map((member, index) => {
                                    return <Flex key={index} gap={1} alignItems='center'>
                                        <Avatar size='xs' src='' name={member.name} />
                                        <Text fontSize='12px'>{member.name}</Text>
                                        <Icon onClick={() => removeSelectedUser(member)} color='red' fontSize='14px' cursor='pointer' title='remove' as={X} />
                                    </Flex>
                                })}
                            </Wrap>
                        </Box>

                        : <></>}
                </Box>

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
                    placeholder='Start your discussion...'
                    controls={[
                        ['bold', 'italic', 'underline', 'link'],
                        ['h1', 'h2', 'h3'],
                        ['alignLeft', 'alignCenter', 'alignRight'],
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
                            Post Discussion
                        </Button>
                    </Flex>
                </Box>

            </Modal>
        </>
    )
}
