import React from 'react'
import { Box, Link, Stack, HStack, Icon, Text, SimpleGrid, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { BsTagFill, BsChatRightTextFill, BsStarFill } from 'react-icons/bs'
import { HiOutlineUserCircle } from 'react-icons/hi'
import demoItems from './demoItems';


export default function CategoryLeftSidebar({currentCategory}) {

    return (

        <VStack alignItems='flex-start' gap={5}>
            <NextLink href='/start_discussion'>
                <Link href='/start_discussion'>
                    <Box px={3} py={1} bg='#e6caaf' maxW={200} textAlign='center'>
                        Start Discussion
                    </Box>
                </Link>
            </NextLink>
            <SimpleGrid columns={{ base: 2, sm:2, md: 5, lg: 1 }} gap={{ base: 3, lg: 6 }} >

                {demoItems.map((item, index) => {
                    return <NextLink key={index} href={`/category/${item.slug}`}>
                        <Link href={`/category/${item.slug}`}>
                            <HStack alignItems='flex-start' bg={currentCategory.slug == item.slug ? '#ede7e0' : 'none'} p={currentCategory.slug == item.slug ? 1 : 0}>
                                <Icon fontSize={{ base: 22, lg: 28 }} as={item.icon} />
                                <Text fontWeight={{ base: 'normal', lg: '700' }}>{item.title}</Text>
                            </HStack>
                        </Link>
                    </NextLink>

                })}




            </SimpleGrid>
        </VStack>
    )
}
