import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query';
import Cookies from "js-cookie";

export default function useMentions(qData) {

    // console.log('################# ', qData)

    const [users, setUsers] = useState([])

    const members = useQuery('mentionUsers', async () => {
        const res = await axios.get('/all_members')
        return res.data.users
    })


    const [mentionedUsers, setMentions] = useState([])

    useMemo(() => {

        const ms = Cookies.get('mentions') ? JSON.parse(Cookies.get('mentions')) : []

        console.log('Mentioned Users array', ms)
    }, [mentionedUsers])


    useMemo(() => {

        const mentionedUsers = members.data?.map(usr => {
            return { id: usr.id, value: usr.username, link: `/user/${usr.id}` }
        })

        // console.log('Mentioned Users: ', mentionedUsers)

        setUsers(mentionedUsers)

    }, [members.data]);


    const mentions = useMemo(

        () => ({

            allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,

            mentionDenotationChars: ['@'],

            linkTarget: '_blank',

            source: (searchTerm, renderList, mentionChar) => {

                const list = mentionChar === '@' ? users : [];

                // console.log('Mention list', list)

                const includesSearchTerm = list.filter((item) =>

                    item?.value?.toLowerCase()?.includes(searchTerm?.toLowerCase())

                );

                renderList(includesSearchTerm);


            },

            onSelect: (item, insertItem) => {

                const myMentions = Cookies.get('mentions') ? JSON.parse(Cookies.get('mentions')) : []
               
                const mensionItem = item.id
                const mensionLink = `<a href='/${item.id}'>${item.value}</a>`
                myMentions.push(item.id)
                
                Cookies.set('mentions', JSON.stringify(myMentions))

                insertItem(item)
            },



        }),

        [users]

    )

    return mentions
}
