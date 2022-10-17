import { Box, Button, Divider, Flex, FormControl, FormErrorMessage, Input, Spacer, Stack, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const schema = yup.object().shape({

    userName: yup.string()
        .default('jimmy')
        .min(4, 'Username must have 4 characters.')
        .required()
        .matches(
            /^[a-zA-Z_.]*$/u,
            'Only ( _ ) dash and ( . ) dot are allowed. White space are not allowed.'
        ),

    fullName: yup.string()
        .min(3, 'Full name should have at least 3 characters.')
        .required('Fullname field is required.'),

    email: yup.string()
        .email("This should be a valid email.")
        .required("Email field is required."),

});

schema.cast({
    fullName: 'dfdf dfdf dfdfdf',
    email: 'email@gmail.com',
});


export default function UpddateProfile({ user }) {

    const toast = useToast()

    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange',
        defaultValues: {
            userName: user.username,
            fullName: user.name,
            email: user.email,
        },
        resolver: yupResolver(schema)
    });


    const [loading, setLoading] = useState(false)

    const saveChanges = async (data) => {

        setLoading(true)
        const user = await axios.post('/update_profile', data)

        if(user.data.status == 'success'){

            Cookies.set('_token', user.data.token)

            toast({
                title: 'Success',
                description: "Your profile information has been updated!",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })

            router.reload()
        }

        setLoading(false)

    }


    return (
        <div>
            <Text fontWeight='bold' color='gray.800' fontSize={'18px'}>Update Profile</Text>
            <hr />
            <Spacer h='5' />
            <Flex>
                <Box w={{ base: 'full', md: '50%' }}>
                    <Stack spacing={4}>
                        <FormControl>
                            
                            <Text>Username (unique)</Text>
                            <Text color={'gray.600'} fontFamily='cursive' fontSize={'12px'}>Only ( _ ) and ( . ) are allowed. don't use any white space.</Text>
                            
                            <Spacer h={1} />
                            <Input
                                // name='userName'
                                {...register('userName')}
                                placeholder='Enter your unique username'
                                size='md'
                            />

                            <Text color='red.500'>{errors?.userName?.message}</Text>
                        </FormControl>
                        <Box>
                            <Text>Full Name</Text>
                            <Input
                                readOnly={user.name}
                                disabled={user.name}
                                {...register('fullName')}
                                placeholder='Your full name'
                                size='md'
                            />
                            <Text color='red.500'>{errors?.fullName?.message}</Text>
                        </Box>

                        <Box>
                            <Text>Email</Text>
                            <Input
                                readOnly={user.email}
                                disabled={user.email}
                                {...register('email')}
                                placeholder='Enter your valid email'
                                size='md'
                            />
                            <Text color='red.500'>{errors?.email?.message}</Text>

                        </Box>

                        <Box pt='3'>
                            <Button isLoading={loading} loadingText='Saving...' onClick={handleSubmit(saveChanges)} colorScheme='yellow'>Save Changes</Button>
                        </Box>
                    </Stack>
                </Box>
                <Box></Box>
            </Flex>

        </div>
    )
}
