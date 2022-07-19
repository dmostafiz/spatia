import '../../styles/globals.css'
// import 'preline'
import { ChakraProvider } from '@chakra-ui/react'
import appTheme from '../../Helpers/_theme'
import axios from 'axios'
import useToken from './../Hooks/useToken';
// import { useEffect } from 'react';
import NextNProgress from "nextjs-progressbar";

import { MantineProvider } from '@mantine/core';

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {


  // useEffect(() => {

  //   console.log('window.location.hostname ########', window.location.hostname)
  //   console.log('Environment ########', process.env.ENVIRONMENT)

  // }, [])

  // axios.defaults.baseURL = process.env.ENVIRONMENT == 'development' ? 'http://localhost:3000/api' : 'https://spacom.herokuapp.com/api'
  // axios.defaults.baseURL = 'http://localhost:3000/api'
  axios.defaults.baseURL = 'https://spacom.herokuapp.com/api'
  axios.defaults.headers.common['Authorization'] = useToken();
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  return <MantineProvider
    withGlobalStyles
    withNormalizeCSS
    theme={{
      /** Put your mantine theme override here */
      colorScheme: 'light',
      fontFamily: 'Josefin Sans, sans-serif',
      headings: { fontFamily: 'Josefin Sans, sans-serif', },
      body: { fontFamily: 'Josefin Sans, sans-serif', },
    }}
  >
    <ChakraProvider theme={appTheme}>
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
      <QueryClientProvider client={queryClient}>

        <Component {...pageProps} />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </ChakraProvider>
  </MantineProvider>
}

export default MyApp
