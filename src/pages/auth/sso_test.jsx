import { Center, Text } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import BigSpinner from '../../Components/Common/BigSpinner'
import authUser from '../../Hooks/authUser'
import Cookies from 'js-cookie'

export default function sso_test() {

    const router = useRouter()
    const [error, setError] = useState(false)

    const user = authUser()

    // const [token, setToken] = useState(null)

    useEffect(() => {

        async function verifySSOToken() {
            const res = await axios.post(`/sso_auth_test/user@gmail.com`)


            console.log('Redirector: ', res.data)

            if (res.data.status == 'success') {

                Cookies.set('_token', res.data.token)

                return window.location.href = '/'

                // window.location.href = router.query.surl
            } else {
                setError(true)
            }

        }

        // if (router.query?.email) {
            verifySSOToken()
        // }

    }, [])


    if(user.data?.id){
        return (
            <Center w='full' h='100vh'>
                <Text>You are already authenticated</Text>
            </Center>
        )
    }

    if (error) {
        return (
            <Center w='full' h='100vh'>
                <Text>Authentication failed with bad token</Text>
            </Center>
        )
    }


    return (
        <Center w='full' h='100vh'>
            <BigSpinner />
        </Center>
    )
}
