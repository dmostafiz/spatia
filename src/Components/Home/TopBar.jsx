import { Avatar, Box, Button, HStack, Input, InputGroup, InputLeftElement, InputRightElement, Link, Show } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import NextLink from 'next/link'
import MainLogo from '../Common/MainLogo'
import { Container } from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'
import MobileMenuSidebar from './MobileMenuSidebar'
import authUser from '../../Hooks/authUser'
import { Menu, MenuButton, MenuList, MenuItem, Flex, Text } from '@chakra-ui/react'

import { ArrowDown, UserCheck, UserCircle } from 'tabler-icons-react'
import { RiChatPrivateLine, RiSettings4Line, RiLogoutCircleRLine } from 'react-icons/ri'
import { Divider } from '@mantine/core'
import logoutMe from '../../Hooks/logoutMe'

export default function TopBar() {

  const user = authUser()

  // useMemo(() => {
  // console.log('Authenticated user done ', user)

  // }, [authUser])


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
                    <Avatar size='sm' src='' name='Test USer' />

                    <Text flex={1} fontWeight='bold' fontSize='14px' wordBreak='keep-all'>{user.data.name}</Text>

                    {/* <IoIosArrowDown /> */}
                  </Flex>

                </Box>

                <MenuList rounded='none'>
                  <NextLink href='/profile'>
                    <MenuItem py={3} icon={<UserCircle />}>Profile</MenuItem>
                  </NextLink>
                  <MenuItem py={3} icon={<RiChatPrivateLine fontSize='24px' />}>Private Discussions</MenuItem>
                  <MenuItem py={3} icon={<RiSettings4Line fontSize='24px' />}>Settings</MenuItem>
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
