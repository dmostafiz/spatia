import React, { useEffect, useState } from 'react'
import { Box, SimpleGrid, Spinner } from '@chakra-ui/react';
import demoItems from './demoItems'
import DiscussionItem from './DiscussionItem';
import getCategories from '../../../Hooks/getCategories';
import BigSpinner from './../../Common/BigSpinner';

export default function DiscussionItems() {

    const categories = getCategories()
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        if (categories.length) {
            setLoading(false)
        }

    }, [categories])

    return (
        <Box as='section'>

            {loading ?
                <BigSpinner />
                : <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
                    {categories.map((item, index) => {
                        return item.discussions.length ? <DiscussionItem item={item} key={index} /> : ''
                    })}
                </SimpleGrid>
            }

        </Box>
    )
}
