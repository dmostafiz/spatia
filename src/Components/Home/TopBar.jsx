import { Avatar, Box, Button, Center, HStack, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Link, Show } from '@chakra-ui/react'
import React, { useEffect, useMemo, useState } from 'react'
import NextLink from 'next/link'
import MainLogo from '../Common/MainLogo'
import { Container } from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'
import MobileMenuSidebar from './MobileMenuSidebar'
import authUser from '../../Hooks/authUser'
import { Menu, MenuButton, MenuList, MenuItem, Flex, Text } from '@chakra-ui/react'

import { ArrowDown, BellRinging, Notification, UserCheck, UserCircle } from 'tabler-icons-react'
import { RiChatPrivateLine, RiSettings4Line, RiLogoutCircleRLine, RiHistoryFill } from 'react-icons/ri'
import { Divider } from '@mantine/core'
import logoutMe from '../../Hooks/logoutMe'
import axios from 'axios'
import { useRouter } from 'next/router'
import moment from 'moment'

export default function TopBar() {

  const router = useRouter()

  const user = authUser()

  // useMemo(() => {
  // console.log('Authenticated user done ', user)
  const [notifications, setNotifications] = useState([])

  // }, [authUser])
  useEffect(() => {

    async function getUnreadNotifications() {
      const res = await axios.get('/user/notifications/unread')
      console.log('Notifications got ', res.data)
      setNotifications(res.data)
    }

    if (user.data?.id) {
      getUnreadNotifications()
    }
  }, [user.data?.id, router])

  const handleNotificationClick = (notify) => {

    async function makeNotificationAsRead() {
      const res = await axios.post('/user/notification/make_read', { notifyId: notify.id })
    }

    makeNotificationAsRead()

    if (notify.link) {
      router.push(notify.link)
    } else {
      alert(notify.text)
    }
  }


  return (
    <Box
      as='nav'
      position="fixed"
      w="100%" shadow='md'
      bg='#ede7e0'
      color='#000000'
      fontSize={18}
      fontWeight='semibold'
      zIndex={999}
    >

      <Container maxW='container.xl' >

        <HStack justify='space-between'>

          <HStack gap={6} justify='space-between'>
            <NextLink href='/'>
              <Link _hover={{
                color: 'link.hover',
                textDecoration: 'none'
              }}>
                <Box>
                  <MainLogo />
                </Box>
              </Link>
            </NextLink>

          </HStack>

          <HStack gap={2}>
            <Show above='lg'>
              <InputGroup mr={20}>
                <Input
                  rounded='full'
                  minW={300}
                  pr={50} pl={25} py={6} bg='white'
                  border='0px solid #7e8b9f'
                  _focus={{ ring: 0, border: '0px soild', outline: 0 }}
                  placeholder='Search the community'
                  fontFamily={`'Assistant', sans-serif`}
                />
                <InputRightElement py={6} pr={3} >
                  <FiSearch color='green.500' fontSize={20} />
                </InputRightElement>
              </InputGroup>
            </Show>

            {(!user.isLoading && !user.data) && <Show above='md'>
              <NextLink href='/login'>
                <Button
                  as='a'
                  varient='solid'
                  color='white'
                  rounded='full'
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
              </NextLink>

              <NextLink href='/register'>
                <Button
                  as='a'
                  varient='outlined'
                  color='#604a38'
                  border='2px solid'
                  borderColor='#604a38'
                  rounded='full'
                  bg='transparent'
                  _hover={{
                    color: 'link.hover',
                    textDecoration: 'none'
                  }}
                  href='/login'
                  minW={140}
                >
                  Register Now
                </Button>
              </NextLink>
            </Show>}

            {user.data && <Show above='md'>

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
                              <Box w='full' py={2}>
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
                  w='full'
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
                    <Text flex={1} fontWeight='bold' fontSize='14px' wordBreak='keep-all'>{user.data.name}</Text>
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

            </Show>}


            <Show below='md'>

              <MobileMenuSidebar />

            </Show>


          </HStack>

        </HStack>

      </Container>

    </Box>
  )
}
