import React from 'react'
import { Center } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'

export default function ContentLoader() {
    return (
        <Center h='calc(100vh - 400px)' w='full'>
            <Spinner
                size='xl'
                thickness='4px'
                emptyColor='#ede7e0'
                color='#e6caaf'
            />
        </Center>
    )
}
