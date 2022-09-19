import { Center, Text } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import BigSpinner from '../../Components/Common/BigSpinner'
import authUser from '../../Hooks/authUser'

export default function sso() {

    const router = useRouter()
    const [error, setError] = useState(false)
    const user = authUser()

    // const [token, setToken] = useState(null)

    useEffect(() => {

        async function verifySSOToken() {
            const res = await axios.post(`/sso_auth`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${router.query.token}`
                }
            })

            if (res.data.status == 'success') {

                router.push(`/${router.query.surl}`)
                // window.location.href = router.query.surl
            } else {
                setError(true)
            }

        }

        if (router.query?.token) {
            verifySSOToken()
        }

    }, [router])


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

    if (!router.query.token || !router.query.surl) {
        return (
            <Center w='full' h='100vh'>
                {(!router.query)
                    ? <BigSpinner />
                    : <Text>Oopps! Bad Request</Text>}
            </Center>
        )
    }


    return (
        <Center w='full' h='100vh'>
            <BigSpinner />
        </Center>
    )
}
