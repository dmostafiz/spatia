import { Box, Button, Flex, Input, Spacer, Stack, Text } from '@chakra-ui/react'
import React from 'react'

export default function UpddateProfile() {
    return (
        <div>
            <Text fontWeight='bold' color='gray.800'>Upddate Profile</Text>
            <Spacer h='3' />
            <Flex>
                <Box w={{ base: 'full', md: '50%' }}>
                    <Stack spacing={3}>
                        <Box>
                            <Text>Username (unique)</Text>
                            <Input placeholder='Enter your unique username' size='md' />
                            <Text color={'gray.600'} fontFamily='cursive' fontSize={'12px'}>Only ( _ ) and ( . ) are allowed. don't use any white space.</Text>
                        </Box>
                        <Box>
                            <Text>First Name</Text>
                            <Input placeholder='Your first name' size='md' />
                        </Box>
                        <Box>
                            <Text>Last Name</Text>
                            <Input placeholder='Your last name' size='md' />
                        </Box>
                        <Box>
                            <Text>Email</Text>
                            <Input placeholder='Enter your valid email' size='md' />
                        </Box>
                        
                        <Box pt='3'>
                            <Button colorScheme='yellow'>Save Changes</Button>
                        </Box>
                    </Stack>
                </Box>
                <Box></Box>
            </Flex>

        </div>
    )
}
