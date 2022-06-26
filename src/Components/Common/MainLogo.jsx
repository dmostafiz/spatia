import React from 'react'
import { Box, Center, Image } from '@chakra-ui/react'

export default function MainLogo() {
  return (
    <Center as='div' content='center' height={['50px','70px','80px','90px']} maxW={['300px']}>
      <Image maxW={'100%'} src='/img/logo.png' alt='Spatial Community' />
    </Center>
  )
}
