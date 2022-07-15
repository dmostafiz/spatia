import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { GrAnnounce } from 'react-icons/gr'
// import {VsCommentDiscussion} from 'react-icons/vs'
import { RiChatHeartLine } from 'react-icons/ri'
import { GiSecretBook } from 'react-icons/gi'
import { HiOutlineDocumentText, HiOutlineSupport, HiOutlineLightBulb } from 'react-icons/hi'
import { BiNetworkChart } from 'react-icons/bi'
import { SiMusicbrainz } from 'react-icons/si'
import { TbMessages } from 'react-icons/tb'
import useSWR from 'swr'
import swrFetcher from './swrFetcher'

export default function getCategories() {

    const [categories, seCategories] = useState([])

    const {data, error} = useSWR('/category/get', swrFetcher)

    // console.log('SWR category data: ', data)
    // console.log('SWR category error: ', error)


    const verifiedCategories = []
            
    data?.map(cat => {
        
        const Icon = cat.icon == 'GrAnnounce' ? GrAnnounce
        : cat.icon == 'RiChatHeartLine' ? RiChatHeartLine
        : cat.icon == 'GiSecretBook' ? GiSecretBook
        : cat.icon == 'HiOutlineDocumentText' ? HiOutlineDocumentText
        : cat.icon == 'HiOutlineSupport' ? HiOutlineSupport
        : cat.icon == 'HiOutlineLightBulb' ? HiOutlineLightBulb
        : cat.icon == 'BiNetworkChart' ? BiNetworkChart
        : cat.icon == 'SiMusicbrainz' ? SiMusicbrainz
        : cat.icon == 'TbMessages' && TbMessages
        
        verifiedCategories.push({
            id: cat.id,
            icon: Icon,
            slug: cat.slug,
            title: cat.title,
            description: cat.description,
            discussions: cat.discussions,
            createdAt: cat.createdAt
        })
        
    })
    
    // console.log('Category Response: ', verifiedCategories)

    useEffect(() => {

        // async function getDiscussionCategories() {





            // const res = await axios.get('/category/get')


            seCategories(verifiedCategories)
        // }

        // getDiscussionCategories()

    }, [data])

    return categories
}
