import React, { forwardRef, useCallback } from 'react'
import { Avatar, Box, Button, Flex, HStack, Icon, Input, Text } from '@chakra-ui/react'
import { CgMailReply } from 'react-icons/cg'
import { AiOutlineEye } from 'react-icons/ai'
import { IoMdChatboxes } from 'react-icons/io'
import { RiHeart2Fill } from 'react-icons/ri'
// import { RichTextEditor } from '@mantine/rte';
import dynamic from 'next/dynamic';
import useMentions from '../../../Hooks/useMentions'
import axios from 'axios'

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

const DiscussionReplyForm = forwardRef(({ onSubmitReply, reply, setReply, data }, ref) => {

    const menstions = useMentions('hello i am from mention quill')


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
        <Box w='full'>
            <Box pb={2} pt={8}>
                <Text fontWeight='' fontSize='20px' fontFamily='sans-serif'>Reply to the discussion</Text>
            </Box>
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

