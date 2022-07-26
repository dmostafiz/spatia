import React from 'react'
import { Box, Button, Flex, HStack, Icon, Link, Menu, MenuButton, MenuItem, MenuList, Stack, Text } from '@chakra-ui/react'
import { BsTagFill, BsChatRightTextFill, BsStarFill } from 'react-icons/bs'
import { HiOutlineUserCircle } from 'react-icons/hi'
import NextLink from 'next/link'
import { useRouter } from 'next/router';
import { BiDownArrow } from 'react-icons/bi'
import { ArrowDown } from 'tabler-icons-react'

export default function CategoryContentsTopbar({ sortBy, setSortBy }) {

    const router = useRouter()

    return (
        <Box fontWeight='bold' fontFamily='heading'>

            <Stack direction='row' gap={1} alignItems={{ sm: 'start', lg: 'center' }} >

                <Menu>
                    <MenuButton size='xs' rounded='full' bg='#ede7e0' _hover={{ bg: '#ede7e0' }} _active={{ bg: '#ede7e0' }} as={Button} rightIcon={<ArrowDown />}>
                      Sort by {sortBy}
                    </MenuButton>
                    <MenuList>
                        <MenuItem bg={sortBy == 'Newest' && '#f4edde'} onClick={() => { setSortBy('Newest') }}>Newest</MenuItem>
                        <MenuItem bg={sortBy == 'Oldest' && '#f4edde'} onClick={() => { setSortBy('Oldest') }}>Oldest</MenuItem>
                        <MenuItem bg={sortBy == 'Most Viewed' && '#f4edde'} onClick={() => { setSortBy('Most Viewed') }}>Most Viewed</MenuItem>
                        <MenuItem bg={sortBy == 'Most Replied' && '#f4edde'} onClick={() => { setSortBy('Most Replied') }}>Most Replied</MenuItem>
                    </MenuList>
                </Menu>


                {/* <NextLink href='/tags'>
                    <Link href='/tags' alignItems='flex-start'>
                        <HStack alignItems='flex-start'>
                            <Icon fontSize={22} as={BsTagFill} />
                            <Text>Tags</Text>
                        </HStack>
                    </Link>
                </NextLink> */}

            </Stack>
        </Box>
    )
}
