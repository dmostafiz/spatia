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

        <>
            {
                discussions.map((discussion, index) => {
                    return <DiscussionThread key={index} discussion={discussion} />
                })
            }

        </>
    )
}
