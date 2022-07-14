import { useToast } from '@chakra-ui/react'
import React from 'react'

export default function ToastAlert(title, description, type) {

    const toast = useToast()

    return toast({
        title: title,
        description: description,
        status: type,
        duration: 2000,
        isClosable: true,
    })
}
