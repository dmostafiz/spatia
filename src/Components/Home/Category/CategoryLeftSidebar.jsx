import React, { useEffect, useState } from 'react'
import { Link, HStack, Icon, Text, SimpleGrid, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import dynamic from 'next/dynamic'
import getCategories from '../../../Hooks/getCategories';

const StartDiscussionModal = dynamic(() => import('../../Common/StartDiscussionModal'), {
    ssr: false
})

export default function CategoryLeftSidebar({currentCategory}) {

    const categories = getCategories()
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        if (categories.length) {
            setLoading(false)
        }

    }, [categories])

    return (

        <VStack alignItems='flex-start' gap={5}>

            <StartDiscussionModal />

            <SimpleGrid columns={{ base: 2, sm:2, md: 5, lg: 1 }} gap={{ base: 3, lg: 6 }} >

                {categories.map((item, index) => {
                    return <NextLink key={index} href={`/category/${item.slug}`}>
                        <Link href={`/category/${item.slug}`}>
                            <HStack alignItems='flex-start' bg={currentCategory?.slug == item.slug ? '#ede7e0' : 'none'} p={currentCategory?.slug == item.slug ? 1 : 0}>
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
