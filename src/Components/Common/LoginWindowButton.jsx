import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function LoginWindowButton(props) {


    const router = useRouter()

    
    const openInNewTab = (url) => {
        
        // const hostName = window.location.hostname == 'localhost' ? `${window.location.hostname}:3000` : window.location.hostname
  
        const newWindow = window.open(`${url}?serviceURL=http://spacom.herokuapp.com${router.asPath}`, '_self')
    
        if (newWindow) newWindow.opener = null
    }

    return (
        <>
            <Button
                {...props}
                onClick={() => openInNewTab(process.env.SSO_ENDPOINT || 'http://devspatialcollective.herokuapp.com/login')}
            >
                {props.innerText}
                
            </Button>
        </>
    )
}
