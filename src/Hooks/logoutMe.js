import Cookies from 'js-cookie'
import Router from 'next/router'
import React from 'react'

export default function logoutMe() {
    // const router = useRouter()
    Cookies.remove('_token')

    // return window.location = '/'
    return Router.reload()
}
