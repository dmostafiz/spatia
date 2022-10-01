import React, { useState } from "react"
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, MenuItem, useDisclosure, useToast } from "@chakra-ui/react"
import { X } from "tabler-icons-react"
import axios from "axios"
import { useRouter } from "next/router"

export default function DeleteConfirmation({ title = "Delete Item!", deleteUrl, deleteId }) {

    const router = useRouter()

    const cancelRef = React.useRef()

    const { isOpen, onOpen, onClose } = useDisclosure()

    const toast = useToast()

    const [loading, setLoading] = useState(false)

    const deleteItem = async () => {

        setLoading(true)

        const { data } = await axios.post(deleteUrl, { id: deleteId })

        if (data.status == 'success') {

            toast({
                title: 'Discussions deleted.',
                description: data.msg,
                status: 'success',
                duration: 9000,
                isClosable: true,
            })

            return router.push('/')

        }


        if (data.status == 'error') {

            setLoading(false)

            onClose()

            return toast({
                title: 'Error!',
                description: data.msg,
                status: 'error',
                duration: 9000,
                isClosable: true,
            })

        }

    }

    return (
        <>
            <MenuItem onClick={onOpen} icon={<X />}>
                Delete
            </MenuItem>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            {title}
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button isLoading={loading} loadingText={'Deleting...'} colorScheme='red' onClick={deleteItem} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}