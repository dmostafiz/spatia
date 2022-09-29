import React, { useEffect, useState } from 'react'
import { Link, HStack, Icon, Text, SimpleGrid, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import dynamic from 'next/dynamic'
import getCategories from '../../../Hooks/getCategories';
import { BsTagFill, BsChatRightTextFill, BsStarFill } from 'react-icons/bs'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { useRouter } from 'next/router'
import authUser from '../../../Hooks/authUser';

const StartDiscussionModal = dynamic(() => import('../../Common/StartDiscussionModal'), {
    ssr: false
})

const StartPrivateDiscussionModal = dynamic(() => import('../../Common/StartPrivateDiscussionModal'), {
    ssr: false
})

export default function CategoryLeftSidebar({ mode='desktop', currentCategory, privateDiscussion = false, closeDrawer }) {

    const user = authUser()

    const router = useRouter()

    const categories = getCategories()
    const [loading, setLoading] = useState(true)

    // console.log('router ', router)

    useEffect(() => {

        if (categories.length) {
            setLoading(false)
        }

    }, [categories])

    return (

        <VStack alignItems='flex-start' gap={5}>

            {privateDiscussion ? <StartPrivateDiscussionModal closeDrawer={closeDrawer} mode={mode} /> : <StartDiscussionModal closeDrawer={closeDrawer} mode={mode}/>}

            <SimpleGrid columns={{ base: 1, sm: 1, md: 1, lg: 1 }} gap={{ base: 4, lg: 4 }} >

                <NextLink href={`/all_discussions`}>
                    <Link href={`/all_discussions`}>
                        <HStack alignItems='flex-start' bg={router.pathname == "/all_discussions" ? '#ede7e0' : 'none'} p={router.pathname == "/all_discussions" ? 1 : 0}>
                            <Icon fontSize={22} as={BsChatRightTextFill} />
                            <Text fontWeight={{ base: 'normal', lg: '700' }}>All Discussions</Text>
                        </HStack>
                    </Link>
                </NextLink>

                {user.data?.id && <>

                    <NextLink href='/private_discussion'>
                        <Link href='/private_discussion'>
                            <HStack alignItems='flex-start' bg={router.pathname == "/private_discussion" ? '#ede7e0' : 'none'} p={router.pathname == "/private_discussion" ? 1 : 0}>
                                <Icon fontSize={26} as={HiOutlineUserCircle} />
                                <Text fontWeight={{ base: 'normal', lg: '700' }}>Private Discussion</Text>
                            </HStack>
                        </Link>
                    </NextLink>

                    <NextLink href='/following'>
                        <Link href='/following'>
                            <HStack alignItems='flex-start' bg={router.pathname == "/following" ? '#ede7e0' : 'none'} p={router.pathname == "/following" ? 1 : 0}>
                                <Icon fontSize={22} as={BsStarFill} />
                                <Text fontWeight={{ base: 'normal', lg: '700' }}>Following</Text>
                            </HStack>
                        </Link>
                    </NextLink>
                
                </>}

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
