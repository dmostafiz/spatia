import { Box, Flex, FormControl, FormLabel, Spacer, Switch, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'

export default function GeneralSettings({user}) {

    const [disablePrivateDiscussion, setDisb] = useState(false)
    const [automaticallyFollowRepliedDiscussion, setAutom] = useState(false)

    useEffect(() => {
        setDisb(user.disablePrivateDiscussion)
        setAutom(user.automaticallyFollowRepliedDiscussion)
    }, [])


    const changeSetting = async (setting) => {

        // alert(setting)
        if(setting == 'disablePrivateDiscussion'){
            setDisb(!disablePrivateDiscussion)
        }else if(setting == 'automaticallyFollowRepliedDiscussion'){
            setAutom(!automaticallyFollowRepliedDiscussion)
        }

        const { data } = await axios.post('/update_setting', {setting})

    }

    return (
        <div>
            <Text fontWeight='bold' color='gray.800' fontSize={'18px'}>General Settings</Text>
            <hr />
            <Spacer h='5' />

            <Box>
                <FormControl display='flex' alignItems='center' gap={3}>
                    <Switch isChecked={disablePrivateDiscussion} onChange={() => changeSetting('disablePrivateDiscussion')} id='email-alerts' />
                    <FormLabel htmlFor='email-alerts' mb='0'>
                        Disable private discussions
                    </FormLabel>
                </FormControl>

                <Spacer h={3} />

                <FormControl display='flex' alignItems='center' gap={3}>
                    <Switch isChecked={automaticallyFollowRepliedDiscussion} onChange={() => changeSetting('automaticallyFollowRepliedDiscussion')} id='auto-follow' />
                    <FormLabel htmlFor='auto-follow' mb='0'>
                        Automatically follow discussions that i reply to
                    </FormLabel>
                </FormControl>
            </Box>

        </div>
    )
}
