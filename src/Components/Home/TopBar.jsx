import { Box, Button, HStack, Input, InputGroup, InputLeftElement, InputRightElement, Link, Show } from '@chakra-ui/react'
import React from 'react'
import NextLink from 'next/link'
import MainLogo from '../Common/MainLogo'
import { Container } from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'
import { useMediaQuery } from '@chakra-ui/react'
import MobileMenuSidebar from './MobileMenuSidebar'

export default function TopBar() {
  return (
    <Box as='nav' bg='#ede7e0' color='#000000' fontSize={18} fontWeight='semibold'>

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

            <Show above='lg'>
              <HStack gap={2} breakpoint={['xl']}>
                <NextLink href='/'>
                  <Link _hover={{
                    color: 'link.hover',
                    textDecoration: 'none'
                  }}>
                    Home
                  </Link>
                </NextLink>

                <NextLink href='/test'>
                  <Link _hover={{
                    color: 'link.hover',
                    textDecoration: 'none'
                  }}>
                    Test
                  </Link>
                </NextLink>
              </HStack>
            </Show>

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


            <Show above='md'>
              <NextLink href='/login'>
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
              </NextLink>

              <NextLink href='/register'>
                <Button
                  as='a'
                  varient='outlined'
                  color='#604a38'
                  border='2px solid'
                  borderColor='#604a38'
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
            </Show>

            <Show below='md'>

              <MobileMenuSidebar />

            </Show>


          </HStack>

        </HStack>

      </Container>

    </Box>
  )
}
