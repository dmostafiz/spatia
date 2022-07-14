import '../../styles/globals.css'
// import 'preline'
import { ChakraProvider } from '@chakra-ui/react'
import appTheme from '../../Helpers/_theme'
import axios from 'axios'
import useToken from './../Hooks/useToken';
import { useEffect } from 'react';


function MyApp({ Component, pageProps }) {


  useEffect(() => {

    console.log('window.location.hostname ########', window.location.hostname)
    console.log('Environment ########', process.env.ENVIRONMENT)

  }, [])

  axios.defaults.baseURL = process.env.ENVIRONMENT == 'development' ? 'http://localhost:3000/api' : 'https://dashboard.heroku.com/api'
  axios.defaults.headers.common['Authorization'] = useToken();
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

  return <ChakraProvider theme={appTheme}>
    <Component {...pageProps} />
  </ChakraProvider>
}

export default MyApp
