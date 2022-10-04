import React from 'react'
import { GridItem, Box, Icon, HStack, Text, VStack, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import moment from 'moment';

export default function DiscussionItem({ item }) {
    return (
        <>
            <VStack bg='#f4edde' justify='space-between'>
                <Box w='100%' p={6}>
                    <NextLink href={`/category/${item.slug}`}>
                        <Link href={`/category/${item.slug}`}>
                            <HStack gap={2}>
                                <Icon fontSize={52} color='#43464b' as={item.icon} />
                                <Text
                                    fontSize={28}
                                    color='#43464b'
                                    fontWeight='extrabold'
                                    lineHeight={1}
                                >
                                    {item.title}
                                </Text>
                            </HStack>
                        </Link>
                    </NextLink>
                    <Box py={5}>
                        <Text
                            fontSize={16}
                            color='#565854'
                            fontWeight='semibold'
                            fontFamily={`'Montserrat', sans-serif`}
                        >
                            {item.description}
                        </Text>
                    </Box>

                    {item.subCategories?.length > 0 && <Box>

                        {item.subCategories.map((subCat, index) => {

                            return <>
                                <NextLink key={index} href={`/subcategory/${subCat.id}`}>
                                    <Link href={`/subcategory/${subCat.id}`}>
                                        <Text as='span' textDecoration='underline' fontSize={13} fontWeight='semibold' fontFamily='sans-serif'>{subCat.name}</Text>
                                    </Link>
                                </NextLink>&nbsp;&nbsp;
                            </>

                        })}

                    </Box>}

                </Box>

                <Box w='100%' py={2} px={6} bg='#604a38'>
                    <Box>
                        <Text
                            color='#c8783f'
                            fontSize='14px'
                            fontWeight='semibold'
                            textTransform='uppercase'
                            fontFamily={`'Assistant', sans-serif`}
                            letterSpacing={2}
                        >
                         {item.discussions?.[0]?.createdAt ? 'Latest Post |  ' +  moment(item.discussions?.[0]?.createdAt).calendar() : 'This category is empty'}
                        </Text>
                        {item.discussions?.[0]?.title ? <NextLink href={`/discussion/${item.discussions?.[0]?.id}`}>
                            <Link href={`/discussion/${item.discussions?.[0]?.id}`}>
                                <Text
                                    color='whiteAlpha.900'
                                    fontFamily={`'Montserrat', sans-serif`}
                                    fontSize='12px'
                                >
                                    {item.discussions?.[0]?.title}
                                </Text>
                            </Link>
                        </NextLink> : <Text
                            color='whiteAlpha.900'
                            fontFamily={`'Montserrat', sans-serif`}
                            fontSize='12px'
                        >
                            No discussions yet
                        </Text>}

                    </Box>
                </Box>
            </VStack>
        </>
    )
}
