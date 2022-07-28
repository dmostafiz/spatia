import { Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'

export default function LoginWindowButton(props) {


    const router = useRouter()

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', "toolbar=yes,scrollbars=yes,resizable=yes,top=200,left=500,width=400,height=400")
        // if (newWindow) newWindow.opener = null
        // newWindow.opener.location.reload(true)
        // window.focus()
        // window.newWindow = newWindow

        newWindow.opener.triggerCloseOpener = () => {
            console.log('Opener is closed triggerCloseOpener')
            newWindow.opener.close()
            router.reload()
        }

        console.log('newWindow.opener ', newWindow.opener)

        if(newWindow.closed){
            alert('Awesome')
        }
        console.log('New window', newWindow)
    }

    return (
        <>
            <Button
                {...props}
                onClick={() => openInNewTab('http://localhost:8080/sso')}
            >
                {props.innerText}
            </Button>
        </>
    )
}
