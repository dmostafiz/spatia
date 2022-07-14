import React from 'react'
import Cookies from 'js-cookie';

export default function useToken() {

    const cookies = Cookies.get('_token')

    return `Bearer ${cookies}`
}
