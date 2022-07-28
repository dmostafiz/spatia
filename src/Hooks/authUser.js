import axios from 'axios'
import Cookies from 'js-cookie'
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import useSWR from 'swr';

export default function authUser() {

    const _token = Cookies.get('_token')

    // const [user, setUser] = useState(null)

    // useEffect(() => {

    // async function getUser() {


    const response = useQuery('authorize', async () => {
        const res = await axios.post(`/authorize`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${_token}`
            }
        })

        return res.data
    }, {
        refetchOnWindowFocus: true
    } )

    // console.log('Authorization: ', response.data)

    // setUser(response.data)

    

    // return response.data
    // }

    // const usr = useMemo(() => {
    //     // setUser(response.data)
    //     return response.data
    // }, [response])



    // if (_token) {

    //     getUser()
    // }


    // return () => {
    //     getUser()
    //     };

    // }, []);



    return response
}