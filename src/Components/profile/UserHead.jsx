import { Text, Box, Container, Flex, Avatar, SimpleGrid, Icon, Spacer, Input, Button, useToast } from '@chakra-ui/react';
import axios from 'axios';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react'
import { FiWatch } from 'react-icons/fi';
import { Bible, UserCheck, BoxMultiple, UserPlus } from 'tabler-icons-react';
import { useDropzone } from 'react-dropzone'

export default function UserHead({ user }) {


    const toast = useToast()


    const [bio, setBio] = useState(user?.bio)

    const [uploaded, setUploaded] = useState(null)
    const [loading, setLoading] = useState(false)

    const onDrop = useCallback(async (acceptedFiles) => {

        setLoading(true)
        // Do something with the files
        const file = acceptedFiles[0]
  
        const res = await axios.post('/upload_profile_photo', {file}, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        if(res.data.status == 'success'){
            setUploaded(res.data.user.avatar)

            toast({
                title: 'Success',
                description: "Profile images changed successfully!",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }

        setLoading(false)

        


    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })


    const handleSaveBio = async () => {
        const res = await axios.post('/user/save_bio', { bio: bio })
    }

    return (
        <Box as='div' w='full' p={3} mb={4} bg='#f6e3d1' rounded='sm' shadow>
            <Box p={4} bg='#fffefd' rounded='sm'>

                <Flex alignItems={{ base: 'flex-start', lg: 'center' }} gap={5} direction={{ base: 'column', lg: 'row' }}>

                    <Box>
                        <Avatar size='2xl' src={uploaded || user?.avatar} name={user?.name} />
                        <Spacer h={2} />
                        <Button isLoading={loading} loadingText='Uploading...'  {...getRootProps()} size='sm' type='file' colorScheme='gray' variant='outline' rounded='full'>Chnage Avatar</Button>
                    </Box>

                    <Box w='full' as='div'>
                        <Text as='h1' fontFamily='revert' fontSize={{ base: '20px', sm: '24px', md: '40px' }} fontWeight='bold' lineHeight='1' color='#000000'>
                            {user?.name}
                        </Text>

                        <Spacer h={3} />
                        <SimpleGrid w='full' columns={{ base: 2, sm: 2, md: 5, lg: 9 }} fontSize='13px' fontFamily='sans-serif' fontWeight='normal' letterSpacing={1}>
                            <Flex alignItems='center' gap={1}>
                                <Icon fontSize={18} as={FiWatch} />
                                <Text>{user.createdAt ? moment(user.createdAt).calendar() : 'Nov, 2021'}</Text>
                            </Flex>

                            <Flex alignItems='center' gap={1}>
                                <Icon fontSize={18} as={BoxMultiple} />
                                <Text>{user.points ?? 0} Points</Text>
                            </Flex>

                            <Flex alignItems='center' gap={1}>
                                <Icon fontSize={18} as={UserPlus} />
                                <Text>{user.followerIds?.length} Follower{user.followerIds?.length > 1 && 's'}</Text>
                            </Flex>

                            <Flex alignItems='center' gap={1}>
                                <Icon fontSize={18} as={UserCheck} />
                                <Text>{user.followingIds?.length} Following</Text>
                            </Flex>

                        </SimpleGrid>

                        <Spacer h={3} />

                        <Input onBlur={handleSaveBio} onChange={(e) => setBio(e.target.value)} value={bio} placeholder='Write something about your self....' border={0} _focus={{ border: 'none', ring: 'none' }} px={1} />

                    </Box>
                </Flex>

            </Box>
        </Box>
    )
}
