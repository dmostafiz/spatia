import React from 'react'
import { VStack } from '@chakra-ui/react';
import DiscussionThread from '../Discussion/DiscussionThread';

export default function CategoryContents() {

    return (

        <VStack gap={3} as='section' w='full' pt={3}>

           <DiscussionThread />

           <DiscussionThread />

           <DiscussionThread />

           <DiscussionThread />

           <DiscussionThread />

           <DiscussionThread />

           <DiscussionThread />

           <DiscussionThread />

           <DiscussionThread />

           <DiscussionThread />


        </VStack>
    )
}