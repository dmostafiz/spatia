import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

export default function LoginWindowButton(props) {


    const router = useRouter()

    console.log('Login router', router)

    const openInNewTab = (url) => {
        const newWindow = window.open(`${url}?surl=${router.asPath}`, '_self')
        if (newWindow) newWindow.opener = null
    }

    return (
        <>
            <Button
                {...props}
                onClick={() => openInNewTab(process.env.SSO_ENDPOINT)}
            >
                {props.innerText}
            </Button>
        </>
    )
}
