import { Flex, Spacer, Switch, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'

export default function NotificationSettings({getUserInfo, user }) {


    const [webNotifications, setWeb] = useState([])
    const [emailNotifications, setEmail] = useState([])


    const [nt,setNt] = useState(null)

    useEffect(() => {
        setWeb(user.webNotification)
        setEmail(user.emailNotification)
    }, [])

    const handleNotificationSetting = async (type, notification) => {


        const { data } = await axios.post('/update_notification_setting', { type, notification })

        // getUserInfo()

        if(data.status == 'success'){
            setWeb(data.user.webNotification)
            setEmail(data.user.emailNotification)
        }

    }

    return (
        <div>
            <Text fontWeight='bold' color='gray.800' fontSize={'18px'}>Notifications</Text>
            <hr />
            <Spacer h='5' />

            <TableContainer>
                <Table size='sm' variant='striped' colorScheme='gray'>
                    <Thead>
                        <Tr>
                            <Th></Th>
                            <Th isNumeric>Web</Th>
                            {/* <Th isNumeric>Email</Th> */}
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>Someone replies to on of my posts</Td>
                            <Td isNumeric>
                                <Switch
                                    isChecked={webNotifications.includes('Someone replies to on of my posts')}
                                    onChange={() => handleNotificationSetting('web', 'Someone replies to on of my posts')}
                                    size='sm' />
                            </Td>
                            {/* <Td isNumeric>
                                <Switch
                                    isChecked={emailNotifications.includes('Someone replies to on of my posts')}
                                    onChange={() => handleNotificationSetting('email', 'Someone replies to on of my posts')}
                                    size='sm' />
                            </Td> */}
                        </Tr>
                        <Tr>
                            <Td>Someone mention me in a post</Td>
                            <Td isNumeric>
                                <Switch
                                    isChecked={webNotifications.includes('Someone mention me in a post')}
                                    onChange={() => handleNotificationSetting('web', 'Someone mention me in a post')}
                                    size='sm' />
                            </Td>
                            {/* <Td isNumeric>
                                <Switch
                                    isChecked={emailNotifications.includes('Someone mention me in a post')}
                                    onChange={() => handleNotificationSetting('email', 'Someone mention me in a post')}
                                    size='sm' />
                            </Td> */}
                        </Tr>
                        <Tr>
                            <Td>Someone replies in a post i am following</Td>
                            <Td isNumeric>
                                <Switch
                                    isChecked={webNotifications.includes('Someone replies in a post i am following')}
                                    onChange={() => handleNotificationSetting('web', 'Someone replies in a post i am following')}
                                    size='sm' />
                            </Td>
                            {/* <Td isNumeric>
                                <Switch
                                    isChecked={emailNotifications.includes('Someone replies in a post i am following')}
                                    onChange={() => handleNotificationSetting('email', 'Someone replies in a post i am following')}
                                    size='sm' />
                            </Td> */}
                        </Tr>

                        <Tr>
                            <Td>When someone sets my post as a best answer</Td>
                            <Td isNumeric>
                                <Switch
                                    isChecked={webNotifications.includes('When someone sets my post as a best answer')}
                                    onChange={() => handleNotificationSetting('web', 'When someone sets my post as a best answer')}
                                    size='sm' />
                            </Td>
                            {/* <Td isNumeric>
                                <Switch
                                    isChecked={emailNotifications.includes('When someone sets my post as a best answer')}
                                    onChange={() => handleNotificationSetting('email', 'When someone sets my post as a best answer')}
                                    size='sm' />
                            </Td> */}
                        </Tr>

                        <Tr>
                            <Td>When a best answer is set in a discussion i participated in </Td>
                            <Td isNumeric>
                                <Switch
                                    isChecked={webNotifications.includes('When a best answer is set in a discussion i participated in')}
                                    onChange={() => handleNotificationSetting('web', 'When a best answer is set in a discussion i participated in')}
                                    size='sm' />
                            </Td>
                            {/* <Td isNumeric>
                                <Switch
                                    isChecked={emailNotifications.includes('When a best answer is set in a discussion i participated in')}
                                    onChange={() => handleNotificationSetting('email', 'When a best answer is set in a discussion i participated in')}
                                    size='sm' />
                            </Td> */}
                        </Tr>

                        <Tr>
                            <Td>Someone includes me in a new private discussion </Td>
                            <Td isNumeric>
                                <Switch
                                    isChecked={webNotifications.includes('Someone includes me in a new private discussion')}
                                    onChange={() => handleNotificationSetting('web', 'Someone includes me in a new private discussion')}
                                    size='sm' />
                            </Td>
                            {/* <Td isNumeric>
                                <Switch
                                    isChecked={emailNotifications.includes('Someone includes me in a new private discussion')}
                                    onChange={() => handleNotificationSetting('email', 'Someone includes me in a new private discussion')}
                                    size='sm' />
                            </Td> */}
                        </Tr>

                        <Tr>
                            <Td>Someone posts in a private discussion i am recipient of </Td>
                            <Td isNumeric>
                                <Switch
                                    isChecked={webNotifications.includes('Someone posts in a private discussion i am recipient of')}
                                    onChange={() => handleNotificationSetting('web', 'Someone posts in a private discussion i am recipient of')}
                                    size='sm' />
                            </Td>
                            {/* <Td isNumeric>
                                <Switch
                                    isChecked={emailNotifications.includes('Someone posts in a private discussion i am recipient of')}
                                    onChange={() => handleNotificationSetting('email', 'Someone posts in a private discussion i am recipient of')}
                                    size='sm' />
                            </Td> */}
                        </Tr>

                        <Tr>
                            <Td>Someone add me to a existing private discussion </Td>
                            <Td isNumeric>
                                <Switch
                                    isChecked={webNotifications.includes('Someone add me to a existing private discussion')}
                                    onChange={() => handleNotificationSetting('web', 'Someone add me to a existing private discussion')}
                                    size='sm' />
                            </Td>
                            {/* <Td isNumeric>
                                <Switch
                                    isChecked={emailNotifications.includes('Someone add me to a existing private discussion')}
                                    onChange={() => handleNotificationSetting('email', 'Someone add me to a existing private discussion')}
                                    size='sm' />
                            </Td> */}
                        </Tr>


                        <Tr>
                            <Td>Someone reacts to one of my posts </Td>
                            <Td isNumeric>
                                <Switch
                                    isChecked={webNotifications.includes('Someone reacts to one of my posts')}
                                    onChange={() => handleNotificationSetting('web', 'Someone reacts to one of my posts')}
                                    size='sm' />
                            </Td>
                            {/* <Td isNumeric>
                                <Switch
                                    isChecked={emailNotifications.includes('Someone reacts to one of my posts')}
                                    onChange={() => handleNotificationSetting('email', 'Someone reacts to one of my posts')}
                                    size='sm' />
                            </Td> */}
                        </Tr>

                        <Tr>
                            <Td>Someone create a discussion in a tag i am following</Td>
                            <Td isNumeric>
                                <Switch
                                    isChecked={webNotifications.includes('Someone create a discussion in a tag i am following')}
                                    onChange={() => handleNotificationSetting('web', 'Someone create a discussion in a tag i am following')}
                                    size='sm' />
                            </Td>
                            {/* <Td isNumeric>
                                <Switch
                                    isChecked={emailNotifications.includes('Someone create a discussion in a tag i am following')}
                                    onChange={() => handleNotificationSetting('email', 'Someone create a discussion in a tag i am following')}
                                    size='sm' />
                            </Td> */}
                        </Tr>

                        <Tr>
                            <Td>Someone posts in a tag i am following</Td>
                            <Td isNumeric>
                                <Switch
                                    isChecked={webNotifications.includes('Someone posts in a tag i am following')}
                                    onChange={() => handleNotificationSetting('web', 'Someone posts in a tag i am following')}
                                    size='sm' />
                            </Td>
                            {/* <Td isNumeric>
                                <Switch
                                    isChecked={emailNotifications.includes('Someone posts in a tag i am following')}
                                    onChange={() => handleNotificationSetting('email', 'Someone posts in a tag i am following')}
                                    size='sm' />
                            </Td> */}
                        </Tr>
                    </Tbody>

                </Table>
            </TableContainer>

        </div>
    )
}
