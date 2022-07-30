import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, useDisclosure, Input, HStack, InputGroup, InputRightElement, Box, Menu, MenuButton, IconButton, MenuList, Text, MenuItem, Flex, Avatar, Divider } from '@chakra-ui/react';
import { Center } from '@mantine/core';
import { useRef } from 'react';
import { FiSearch } from 'react-icons/fi'
import { BellRinging, UserCircle } from 'tabler-icons-react';
import authUser from '../../Hooks/authUser';
import SearchModal from '../Common/SearchModal';
import NextLink from 'next/link'
import { RiChatPrivateLine, RiLogoutCircleRLine, RiSettings4Line, RiHistoryFill } from 'react-icons/ri';
import moment from 'moment';

const MobileMenuSidebar = ({ notifications }) => {

    const user = authUser()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()

    return (
        <>
            <Button ref={btnRef}
                variant='solid'
                color='#604a38'
                varient='outlined'
                border='0px solid'
                borderColor='#604a38'
                bg='transparent'
                _hover={{
                    bg: 'transparent',
                    color: 'link.hover',
                    textDecoration: 'none'
                }}
                _focus={{
                    bg: 'transparent',
                    color: 'link.hover',
                    textDecoration: 'none'
                }}
                onClick={onOpen}>
                Menu
            </Button>

            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader bg='#ede7e0'>Menu</DrawerHeader>

                    <DrawerBody>

                        <Box maxW='full'>
                            <SearchModal mobileMenu={true} />
                        </Box>

                    </DrawerBody>

                    <DrawerFooter w='full'>
                        {user.data?.id
                            ? <Flex w='full' gap={5} alignItems='center' justifyContent='flex-start'>

                                <Box position='relative'>
                                    <Menu>
                                        <MenuButton
                                            as={IconButton}
                                            rounded='full'
                                            icon={<BellRinging size={28} />}
                                            _hover={{
                                                bg: 'white'
                                            }}
                                            _active={{
                                                bg: 'white'
                                            }}
                                            variant='ghost'
                                        />
                                        <MenuList w={350} pt='0px' shadow='md' border='2px solid'>

                                            <Box p={3} mt='-1px' bg='#fcc31e' roundedTopLeft='md' roundedTopEnd='md'>
                                                <Text>Unread Notifications ({notifications?.length})</Text>
                                            </Box>

                                            <Box w='full' maxH='200px' overflowY='auto'>

                                                {!notifications?.length
                                                    ? <Center w='full' h='100px'>
                                                        <Text>No unread notifications</Text>
                                                    </Center>
                                                    : <>
                                                        {notifications?.map((notify, index) => {
                                                            return <MenuItem onClick={() => handleNotificationClick(notify)} key={index} icon={<RiHistoryFill size={20} />}>
                                                                <Box w='full' py={1}>
                                                                    <Text as='span' fontSize='13px' fontWeight='thin' fontFamily='sans-serif'>
                                                                        {notify.senderName && <Text as='span' fontWeight='bold'>{notify.senderName} </Text>} {notify.text}
                                                                    </Text>
                                                                    <Flex justify='flex-start'>
                                                                        <Text fontSize='11px' color='gray.400'>{moment(notify.createdAt).calendar()}</Text>
                                                                    </Flex>
                                                                </Box>
                                                            </MenuItem>
                                                        })}

                                                    </>}

                                            </Box>

                                        </MenuList>
                                    </Menu>

                                    {notifications?.length > 0 && <Center position='absolute' top='0px' right='0px' h='20px' w='20px' rounded='full' bg='#fcc31e' shadow='lg' border='1px solid'>
                                        <Text fontSize='12px' color='black'>{notifications.length}</Text>
                                    </Center>}

                                </Box>

                                <Menu matchWidth={true}>
                                    <Box
                                        as={MenuButton}
                                        maxW='300px'
                                        pr={3}
                                        py={2}
                                        pl={2}
                                        bg='transparent'
                                        // shadow='xs'
                                        _hover={{ bg: 'white', shadow: 'xs' }}
                                        _active={{ bg: 'white', shadow: 'xs' }}
                                        rounded='full'
                                    // leftIcon={<Avatar size='sm' src='' name='Test USer' />}
                                    // rightIcon={<ArrowDown />}
                                    >
                                        <Flex gap={1} alignItems='center'>
                                            <Avatar size='sm' src='' name={user.data.name} />
                                            <Text fontWeight='bold' fontSize='14px' wordBreak='keep-all'>{user.data.name}</Text>
                                            {/* <IoIosArrowDown /> */}
                                        </Flex>
                                    </Box>

                                    <MenuList rounded='none'>
                                        <NextLink href='/profile'>
                                            <MenuItem py={3} icon={<UserCircle />}>Profile</MenuItem>
                                        </NextLink>
                                        <NextLink href='/profile/private_discussions'>
                                            <MenuItem py={3} icon={<RiChatPrivateLine fontSize='24px' />}>Private Discussions</MenuItem>
                                        </NextLink>
                                        <NextLink href='/profile/settings'>
                                            <MenuItem py={3} icon={<RiSettings4Line fontSize='24px' />}>Settings</MenuItem>
                                        </NextLink>
                                        <Divider h={5} />
                                        <MenuItem py={3} icon={<RiLogoutCircleRLine fontSize='24px' />} onClick={() => logoutMe()}>Logout</MenuItem>
                                    </MenuList>
                                </Menu>


                            </Flex>

                            : <HStack gap={2}>
                                <Button
                                    as='a'
                                    varient='solid'
                                    color='white'
                                    // border='2px solid'
                                    // borderColor='#604a38'
                                    bg='#a52a2a'
                                    _hover={{
                                        color: 'whiteAlpha.900',
                                        textDecoration: 'none'
                                    }}
                                    href='/login'
                                    minW={100}
                                >
                                    Login
                                </Button>
                                <Button
                                    varient='outlined'
                                    color='#604a38'
                                    border='2px solid'
                                    borderColor='#604a38'
                                    bg='transparent'
                                    _hover={{
                                        color: 'link.hover',
                                        textDecoration: 'none'
                                    }}
                                >Register
                                </Button>
                            </HStack>
                        }
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default MobileMenuSidebar