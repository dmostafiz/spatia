import { Box, Flex, FormControl, FormLabel, Spacer, Switch, Text } from '@chakra-ui/react'
import React from 'react'

export default function GeneralSettings() {
    return (
        <div>
            <Text fontWeight='bold' color='gray.800' fontSize={'18px'}>General Settings</Text>
            <hr />
            <Spacer h='5' />
            <Box>
                <FormControl display='flex' alignItems='center' gap={3}>
                    <Switch id='email-alerts' />
                    <FormLabel htmlFor='email-alerts' mb='0'>
                        Disable private discussions
                    </FormLabel>
                </FormControl>

                <Spacer h={3} />

                <FormControl display='flex' alignItems='center' gap={3}>
                    <Switch id='auto-follow' />
                    <FormLabel htmlFor='auto-follow' mb='0'>
                        Automatically follow discussions that i reply to
                    </FormLabel>
                </FormControl>
            </Box>

        </div>
    )
}
