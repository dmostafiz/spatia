import { Text, Box, Container, Flex, Avatar, SimpleGrid, Icon, Spacer, Input, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { FiWatch } from 'react-icons/fi';
import { Bible, UserCheck, BoxMultiple } from 'tabler-icons-react';

export default function UserHead({user}) {
  return (
    <Box as='div' w='full' p={3} mb={4} bg='#f6e3d1' rounded='sm' shadow>
    <Box p={4} bg='#fffefd' rounded='sm'>

        <Flex alignItems={{ base: 'flex-start', lg: 'flex-start' }} gap={5} direction={{ base: 'column', lg: 'row' }}>

            <Box>
                <Avatar size='2xl' src={user?.avatar} name={user?.name} />
            </Box>

            <Box w='full' as='div' pt={{base:0, lg:3}}>
                <Text as='h1' fontFamily='revert' fontSize={{ base: '20px', sm: '24px', md: '40px' }} fontWeight='bold' lineHeight='1' color='#000000'>
                    {user?.name}
                </Text>

                <Spacer h={3} />
                <SimpleGrid w='full' columns={{ base: 2, sm: 2, md: 5, lg: 7 }} fontSize='13px' fontFamily='sans-serif' fontWeight='normal' letterSpacing={1}>
                    <Flex alignItems='center' gap={2}>
                        <Icon fontSize={18} as={FiWatch} />
                        <Text>12 months ago</Text>
                    </Flex>
                    <Flex alignItems='center' gap={2}>
                        {/* <Icon fontSize={18} as={FiWatch}/> */}
                        <Text>Joined Nov, 2021</Text>
                    </Flex>
                    <Flex alignItems='center' gap={2}>
                        <Icon fontSize={18} as={UserCheck} />
                        <Text>Status-Verified</Text>
                    </Flex>
                    <Flex alignItems='center' gap={2}>
                        <Icon fontSize={18} as={BoxMultiple} />
                        <Text>888 Points</Text>
                    </Flex>
                </SimpleGrid>
                <Spacer h={3} />

                {/* <Input placeholder='Write something about your self....' border={0} _focus={{ border: 'none', ring: 'none' }} px={1} /> */}
                <Box p={3}>
                    <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam quod accusantium delectus, dolore, nostrum accusamus quo ex sint similique, eum cupiditate temporibus ab pariatur voluptatibus laborum consectetur? Sint, illo ab?</Text>
                </Box>
                <Spacer h={3} />

                <Button rounded='full' bg='#ede7e0'>Follow</Button>

            </Box>
        </Flex>

    </Box>
</Box>
  )
}
