import { Box, Button, Divider, Flex, Input, Spacer, Stack, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

export default function UpddateProfile() {

    const [userName, setUsername] = useState(null)
    const [fullName, setFullname] = useState(null)
    const [email, setEmail] = useState(null)

    const [loading, setLoading] = useState(false)

    const saveChanges = () => {

        
        setLoading(true)
    }

    return (
        <div>
            <Text fontWeight='bold' color='gray.800' fontSize={'18px'}>Upddate Profile</Text>
            <hr />
            <Spacer h='5' />
            <Flex>
                <Box w={{ base: 'full', md: '50%' }}>
                    <Stack spacing={4}>
                        <Box>
                            <Text>Username (unique)</Text>
                            <Text color={'gray.600'} fontFamily='cursive' fontSize={'12px'}>Only ( _ ) and ( . ) are allowed. don't use any white space.</Text>
                            <Spacer h={1} />
                            <Input onChange={e => setUsername(e.target.value)} value={userName} placeholder='Enter your unique username' size='md' />
                        </Box>
                        <Box>
                            <Text>Full Name</Text>
                            <Input onChange={e => setFullname(e.target.value)} value={fullName} placeholder='Your full name' size='md' />
                        </Box>
       
                        <Box>
                            <Text>Email</Text>
                            <Input onChange={e => setEmail(e.target.value)} value={email} placeholder='Enter your valid email' size='md' />
                        </Box>
                        
                        <Box pt='3'>
                            <Button isLoading={loading} loadingText='Saving...' onClick={saveChanges} colorScheme='yellow'>Save Changes</Button>
                        </Box>
                    </Stack>
                </Box>
                <Box></Box>
            </Flex>

        </div>
    )
}
