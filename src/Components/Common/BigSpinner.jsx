import React from 'react'
import { Center, Spinner } from '@chakra-ui/react';

export default function BigSpinner() {
  return (
    <Center w='full' height='300px'>
        <Spinner size='xl' />
    </Center>
  )
}
