import '../../styles/globals.css'
// import 'preline'
import { ChakraProvider } from '@chakra-ui/react'
import appTheme from '../../Helpers/_theme'
import axios from 'axios'
import useToken from './../Hooks/useToken';
// import { useEffect } from 'react';
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {


  // useEffect(() => {

  //   console.log('window.location.hostname ########', window.location.hostname)
  //   console.log('Environment ########', process.env.ENVIRONMENT)

  // }, [])

  axios.defaults.baseURL = process.env.ENVIRONMENT == 'development' ? 'http://localhost:3000/api' : 'https://spacom.herokuapp.com/api'
  axios.defaults.headers.common['Authorization'] = useToken();
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  return <ChakraProvider theme={appTheme}>
    <NextNProgress
      color="#604a38"
      startPosition={0.3}
      stopDelayMs={200}
      height={4}
      showOnShallow={true}
      options={{
        showSpinner: false
      }}
    />
    <Component {...pageProps} />
  </ChakraProvider>
}

export default MyApp
