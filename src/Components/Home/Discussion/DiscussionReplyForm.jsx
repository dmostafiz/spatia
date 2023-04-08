import React, { forwardRef, useCallback } from 'react'
import { Avatar, Box, Button, Flex, HStack, Icon, Input, Spinner, Tag, TagLabel, Text, useToast, Wrap } from '@chakra-ui/react'
import { CgMailReply } from 'react-icons/cg'
import { AiOutlineEye } from 'react-icons/ai'
import { IoMdChatboxes } from 'react-icons/io'
import { RiHeart2Fill } from 'react-icons/ri'
// import { RichTextEditor } from '@mantine/rte';
import dynamic from 'next/dynamic';
import useMentions from '../../../Hooks/useMentions'
import axios from 'axios'
import UploadFiles from '../../Common/UploadFiles'
import { useEffect } from 'react'
import { useState } from 'react'
import { X } from 'tabler-icons-react'

// const RichTextEditor = dynamic(() => import('@mantine/rte'), {
//     // Disable during server side rendering
//     ssr: false,

//     // Render anything as fallback on server, e.g. loader or html content without editor
//     loading: () => null,
// });

const RichTextEditor = dynamic(
    async () => {
        const { default: RE } = await import('@mantine/rte');
        return ({ forwardedRef, ...props }) => <RE ref={forwardedRef} {...props} />;
    },
    {
        ssr: false
    }
)

const DiscussionReplyForm = forwardRef(({ setReplyFiles, onSubmitReply, reply, setReply, data }, ref) => {

    const toast = useToast()

    const menstions = useMentions('hello i am from mention quill')

    const [files, setFiles] = useState([])

    useEffect(() => {
        setReplyFiles(files)
    }, [files])


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


    const [removeLoading, setRemoveLoading] = useState(false)
    const removeFile = async (file) => {
        setRemoveLoading(true)

        const res = await axios.post('/delete_file', { file_url: file.key })
        if (res?.data?.status == 'success') {
            setFiles(files.filter(fl => fl.url != file.url))
        } else {
            toast({
                title: res?.data?.msg,
                description: 'Please update you role policy in your amazon s3 bucket to active file delete permission for current user.',
                status: 'error',
                duration: 10000,
                isClosable: true,
            })
        }

        setRemoveLoading(false)

    }


    return (
        <Box w='full'>
            <Box pb={2} pt={8}>
                <Text fontWeight='' fontSize='20px' fontFamily='sans-serif'>Reply to the discussion</Text>
            </Box>
            <Box pb={2}>
                <UploadFiles setFiles={setFiles} />
            </Box>

            {files.length > 0 && <Box pb={'2'}>
                <Text>Additional uploading files</Text>
                <Wrap>
                    {files.map((file, index) => {
                        return <Tag rounded='full' size={'md'} key={index} variant='outline' colorScheme='blue'>
                            <TagLabel>{file.name}</TagLabel>
                            {removeLoading ?
                                <Spinner zIndex={99999} size={'xs'} color='red' m='1' />
                                : <Icon onClick={() => removeFile(file)} color={'red'} cursor='pointer' fontSize={'22px'} as={X} />}
                        </Tag>
                    })}
                </Wrap>
            </Box>}


            <HStack alignItems='flex-start' gap={2}>
                {/* <Box w={50}>
                    <Avatar src='' name={data.name} />
                </Box> */}
                <Box w='full'>

                    <RichTextEditor
                        forwardedRef={ref}
                        stickyOffset={92}
                        // style={{ minHeight: 250 }}
                        data-autofocus={true}
                        radius={0}
                        value={reply}
                        onChange={setReply}
                        onImageUpload={handleImageUpload}
                        placeholder='Write your comment...'
                        controls={[
                            ['bold', 'italic', 'underline', 'link'],
                            ['h1', 'h2', 'h3'],
                            ['alignLeft', 'alignCenter', 'alignRight'],
                            ['code'],
                            ['image']
                        ]}

                        mentions={menstions}
                        onChangeSelection={() => {
                            console.log('Selection changed ')
                        }}

                    />

                    <Flex justify='flex-end'>
                        <Button
                            mt={5}
                            // isLoading={loading}
                            loadingText='Submitting'
                            onClick={onSubmitReply}
                            rounded='full'
                            bg='#fcc31e'
                            border='2px solid'
                            w={150}
                        >
                            Post Reply
                        </Button>
                    </Flex>

                    {/* <Input
                        value={reply}
                        onChange={e => setReply(e.target.value)}
                        as='textarea'
                        border='none'
                        placeholder='Write your reply...'
                        _focus={{ border: '0px solid', ring: '0px' }}
                    /> */}

                </Box>
            </HStack>
        </Box>
    )
})

export default DiscussionReplyForm

