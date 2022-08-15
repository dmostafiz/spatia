import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function LoginWindowButton(props) {


    const router = useRouter()

    
    const openInNewTab = (url) => {
        
        const hostName = window.location.hostname == 'localhost' ? `${window.location.hostname}:3000` : window.location.hostname
  
        const newWindow = window.open(`${url}?hostdomain=//${hostName}&surl=${router.asPath}`, '_self')
    
        if (newWindow) newWindow.opener = null
    }

    return (
        <>
            <Button
                {...props}
                onClick={() => openInNewTab(process.env.SSO_ENDPOINT || 'http://localhost:8080/api/sso_token')}
            >
                {props.innerText}
            </Button>
        </>
    )
}
