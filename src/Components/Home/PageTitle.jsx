import React from 'react'
import { Box, Text } from '@chakra-ui/react';

export default function PageTitle({ title = 'Page Title', subtitle, navigation = '' }) {
    return (

        <Box as='div' pb={8}>
            <Text
                as='h1'
                fontSize={50}
                fontWeight='black'
                color='#000000'
                fontFamily={`'Montserrat', sans-serif`}
                letterSpacing={3}
            >
                {title}
            </Text>

            {subtitle && <Text
                as='h4'
                fontSize={19}
                fontWeight='black'
                color='#000000'
                fontFamily={`'Montserrat', sans-serif`}
                letterSpacing={2}
            >
                {subtitle}
            </Text>}

            {navigation && <Box pt={subtitle ? 10 : 2}>
                {navigation}
            </Box>}

        </Box>
    )
}
