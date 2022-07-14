import React, { useEffect, useLayoutEffect, useState } from 'react'
import Cookies from 'js-cookie'
import {useRouter } from 'next/router'

export default function useClientAuth() {
  
    const router = useRouter()

    const [authUser, setAuthUser] = useState(null)

    useLayoutEffect(() => {

        const cookieToken = Cookies.get('_token')
        const userCookie = Cookies.get('user')

        // if(!cookieToken) return router.push('/test')
        // if(!userCookie) return router.push('/test')

        // const user = userCookie && JSON.parse(userCookie)

        // if(!user.id) return router.push('/test')

        console.log('User Cookie ************* ', userCookie)

        setAuthUser(cookieToken)

    }, [])


  return authUser
}
