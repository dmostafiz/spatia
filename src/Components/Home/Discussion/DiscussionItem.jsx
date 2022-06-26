import React from 'react'
import { GridItem, Box, Icon, HStack, Text, VStack } from '@chakra-ui/react';

export default function DiscussionItem({ item }) {
    return (
        <VStack bg='#f4edde' justify='space-between'>
            <Box w='100%' p={6}>
                <HStack gap={3}>
                    <Icon fontSize={48} color='#43464b' as={item.icon} />
                    <Text
                        fontSize={28}
                        color='#43464b'
                        fontWeight='black'
                    >
                        {item.title}
                    </Text>
                </HStack>
                <Box py={5}>
                    <Text
                        fontSize={18}
                        color='#565854'
                        fontWeight='semibold'
                        fontFamily={`'Montserrat', sans-serif`}
                    >
                        {item.description}
                    </Text>
                </Box>
            </Box>
            <Box w='100%' py={2} px={6} bg='#604a38'>
                <Box>
                    <Text
                        color='#c8783f'
                        fontSize={16}
                        fontWeight='semibold'
                        textTransform='uppercase'
                        fontFamily={`'Assistant', sans-serif`}
                        letterSpacing={2}
                    >
                        Lated Post | {item.post.createdAt}
                    </Text>
                    <Text
                        color='whiteAlpha.800'
                        fontFamily={`'Assistant', sans-serif`}
                    >
                        {item.title}
                    </Text>
                </Box>
            </Box>
        </VStack>
    )
}
