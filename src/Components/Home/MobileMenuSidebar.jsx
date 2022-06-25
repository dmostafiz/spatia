import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, useDisclosure, Input, HStack, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useRef } from 'react';
import { FiSearch } from 'react-icons/fi'

const MobileMenuSidebar = () => {

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
                        <InputGroup>
                            <Input
                                rounded='full'
                                // minW={300}
                                py={6} bg='white'
                                border='1px solid #7e8b9f'
                                _focus={{ ring: 'none', border: '1px solid  #7e8b9f', outline: 'none' }}
                                placeholder='Search the community'
                                fontFamily={`'Assistant', sans-serif`}
                            />
                            <InputRightElement py={6} pr={3} children={<FiSearch color='green.500' fontSize={20} />} />
                        </InputGroup>

                        



                    </DrawerBody>

                    <DrawerFooter>
                        <HStack gap={2}>
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
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default MobileMenuSidebar