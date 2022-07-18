import React from 'react'
import { Avatar, Box, Button, Flex, HStack, Icon, Input, Text } from '@chakra-ui/react'
import { CgMailReply } from 'react-icons/cg'
import { AiOutlineEye } from 'react-icons/ai'
import { IoMdChatboxes } from 'react-icons/io'
import { RiHeart2Fill } from 'react-icons/ri'
// import { RichTextEditor } from '@mantine/rte';
import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(() => import('@mantine/rte'), {
    // Disable during server side rendering
    ssr: false,

    // Render anything as fallback on server, e.g. loader or html content without editor
    loading: () => null,
});

export default function DiscussionReplyForm({ onSubmitReply, reply, setReply, data }) {

   

    return (
        <Box w='full' px={8} py={4} bg='#f4edde'>
            <Box pb={3}>
                <Text fontWeight='semibold'>Reply to the discussion</Text>
            </Box>
            <HStack alignItems='flex-start' gap={2}>
                <Box w={50}>
                    <Avatar src='' name={data.name} />
                </Box>
                <Box w='full'>

                    <RichTextEditor
                        stickyOffset={92}
                        // style={{ minHeight: 250 }}
                        radius={0}
                        initialValue=''
                        value={reply}
                        onChange={setReply}
                        placeholder='Write your comment...'
                        controls={[
                            ['bold', 'italic', 'underline', 'link'],
                            ['h1', 'h2', 'h3'],
                            ['alignLeft', 'alignCenter', 'alignRight'], 
                            ['code'],
                        ]}
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
}

