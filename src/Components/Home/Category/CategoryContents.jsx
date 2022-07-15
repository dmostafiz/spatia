import React, { useEffect, useRef, useState } from 'react'
import { Center, Text, VStack } from '@chakra-ui/react';
import DiscussionThread from '../Discussion/DiscussionThread';
import dynamic from 'next/dynamic'
// import StartDiscussionModal from '../../Common/StartDiscussionModal';

const StartDiscussionModal = dynamic(() => import('../../Common/StartDiscussionModal'), {
    ssr: false
})

export default function CategoryContents({ discussions }) {
    const listInnerRef = useRef();
    // console.log('All category discussions: ', discussions)
    const handleScroll = (e) => {


        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

        if (bottom) {
            // TO SOMETHING HERE
            console.log('Reached bottom')
        }

    }

    return (

        <VStack gap={3} as='section' w='full' pt={3}>


            {discussions.length

                ? discussions.map((discussion, index) => {
                    return <DiscussionThread key={index} discussion={discussion} />
                })

                : <Center w='full' height='300px'>
                    <VStack>
                        <Text fontSize='22px'>No discussions found in this category.</Text>
                        <StartDiscussionModal />
                    </VStack>
                </Center>
            }

        </VStack>
    )
}
