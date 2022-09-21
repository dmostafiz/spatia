import { Flex, Spacer, Switch, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'

export default function NotificationSettings() {
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
                            <Th isNumeric>Email</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>Someone replies to on of my posts</Td>
                            <Td isNumeric>
                                <Switch size='sm' />
                            </Td>
                            <Td isNumeric>
                                <Switch size='sm' />
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>Someone mention me in a post</Td>
                            <Td isNumeric>
                                <Switch size='sm' />
                            </Td>
                            <Td isNumeric>
                                <Switch size='sm' />
                            </Td>
                        </Tr>
                        <Tr>
                            <Td>Someone replies in a post i am following</Td>
                            <Td isNumeric>
                                <Switch size='sm' />
                            </Td>
                            <Td isNumeric>
                                <Switch size='sm' />
                            </Td>
                        </Tr>

                        <Tr>
                            <Td>When someone sets my post as a best answer</Td>
                            <Td isNumeric>
                                <Switch size='sm' />
                            </Td>
                            <Td isNumeric>
                                <Switch size='sm' />
                            </Td>
                        </Tr>

                        <Tr>
                            <Td>When a best answer is set in a discussion i participated in </Td>
                            <Td isNumeric>
                                <Switch size='sm' />
                            </Td>
                            <Td isNumeric>
                                <Switch size='sm' />
                            </Td>
                        </Tr>

                        <Tr>
                            <Td>Someone includes me in a new private discussion </Td>
                            <Td isNumeric>
                                <Switch size='sm' />
                            </Td>
                            <Td isNumeric>
                                <Switch size='sm' />
                            </Td>
                        </Tr>

                        <Tr>
                            <Td>Someone posts in a private discussion i am recipient of </Td>
                            <Td isNumeric>
                                <Switch size='sm' />
                            </Td>
                            <Td isNumeric>
                                <Switch size='sm' />
                            </Td>
                        </Tr>

                        <Tr>
                            <Td>Someone add me to a existing private discussion </Td>
                            <Td isNumeric>
                                <Switch size='sm' />
                            </Td>
                            <Td isNumeric>
                                <Switch size='sm' />
                            </Td>
                        </Tr>


                        <Tr>
                            <Td>Someone reacts to one of my posts </Td>
                            <Td isNumeric>
                                <Switch size='sm' />
                            </Td>
                            <Td isNumeric>
                                <Switch size='sm' />
                            </Td>
                        </Tr>

                        <Tr>
                            <Td>Someone create a discussion in a tag i am following</Td>
                            <Td isNumeric>
                                <Switch size='sm' />
                            </Td>
                            <Td isNumeric>
                                <Switch size='sm' />
                            </Td>
                        </Tr>

                        <Tr>
                            <Td>Someone posts in a tag i am following</Td>
                            <Td isNumeric>
                                <Switch size='sm' />
                            </Td>
                            <Td isNumeric>
                                <Switch size='sm' />
                            </Td>
                        </Tr>
                    </Tbody>

                </Table>
            </TableContainer>

        </div>
    )
}
