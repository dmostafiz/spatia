import { Center } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import BigSpinner from '../../Components/Common/BigSpinner'

export default function sso() {

    const router = useRouter()

    // const [token, setToken] = useState(null)

    useEffect(() => {

        async function verifySSOToken() {
            const res = await axios.post(`/sso_auth?token=${router.query.token}`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${router.query.token}`
                }
            })

            if(res.data){

                window.opener.triggerCloseOpener()
                window.close()
                
            }

            // window.newWindow.close()

        }

        if (router.query?.token) {
            verifySSOToken()
        }

    }, [router])


    return (
        <Center w='full' h='100vh'>
            <BigSpinner />
        </Center>
    )
}
