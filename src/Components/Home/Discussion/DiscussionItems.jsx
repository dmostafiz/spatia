import React from 'react'
import { Box, GridItem, SimpleGrid } from '@chakra-ui/react';
import demoItems from './demoItems'
import DiscussionItem from './DiscussionItem';

export default function DiscussionItems() {

    return (
        <Box as='section'>
            <SimpleGrid columns={{base: 1, md:2, lg:3}} gap={6}>
                {demoItems.map((item, index) => {
                    return <DiscussionItem item={item} key={index}/>
                })}
            </SimpleGrid>

        </Box>
    )
}
